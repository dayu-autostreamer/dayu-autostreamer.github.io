import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = path => readFile(resolve(root, path), 'utf8');
const data = JSON.parse(await read('src/data/community.json'));
assert.match(data.source.commit, /^[a-f0-9]{40}$/);
for (const hash of Object.values(data.source.files)) assert.match(hash, /^[a-f0-9]{64}$/);
for (const origin of Object.values(data.origin)) {
    assert(origin.name);
    assert.equal(new URL(origin.url).protocol, 'https:');
}

const ids = new Set();
for (const person of data.people) {
    assert(person.id && person.name && person.affiliation, 'Incomplete member entry');
    assert(!ids.has(person.id), 'Duplicate member: ' + person.id);
    assert(person.github === null || /^[a-z\d-]+$/i.test(person.github), 'Invalid GitHub account');
    ids.add(person.id);
}
for (const [group, members] of Object.entries({
    tsc: data.tsc.map(member => member.id),
    maintainers: data.maintainers,
    contributors: data.contributors,
})) {
    assert(members.length > 0, 'Empty roster: ' + group);
    assert.equal(new Set(members).size, members.length, 'Duplicate role: ' + group);
    for (const id of members) assert(ids.has(id), 'Unknown member in ' + group + ': ' + id);
}
for (const member of data.tsc) {
    assert(['Chair', 'Vice Chair', 'Member'].includes(member.office), 'Unknown TSC office');
}

const directories = ['community', 'i18n/zh/docusaurus-plugin-content-docs-community/current'];
const files = await Promise.all(directories.map(async directory =>
    (await readdir(resolve(root, directory))).filter(file => /\.mdx?$/.test(file)).sort()));
assert.deepEqual(files[0], files[1], 'Community translations must cover the same pages');
const slugs = new Set();
for (const file of files[0]) {
    const [en, zh] = await Promise.all(directories.map(directory => read(directory + '/' + file)));
    const slug = source => source.match(/^slug: (.+)$/m)?.[1];
    assert(slug(en), 'Missing stable route: ' + file);
    assert.equal(slug(en), slug(zh), 'Translated route differs: ' + file);
    assert(!slugs.has(slug(en)), 'Duplicate route: ' + slug(en));
    slugs.add(slug(en));
    const anchors = source => [...source.matchAll(/\{#([^}]+)\}/g)].map(match => match[1]).sort();
    assert.deepEqual(anchors(en), anchors(zh), 'Translated heading anchors differ: ' + file);
    for (const source of [en, zh]) {
        assert(!/unmerged|not yet merged|awaiting (?:a )?merge|未合并|尚未合并|待合并/i.test(source),
            'Keep branch integration status out of community copy: ' + file);
    }
}
console.log('Community data, bilingual routes, and heading anchors are consistent.');
