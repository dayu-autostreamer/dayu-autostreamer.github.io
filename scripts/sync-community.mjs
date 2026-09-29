import {readFile, writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';

const siteRoot = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = process.argv[2];
assert(sourceRoot, 'Usage: npm run community:sync -- /path/to/dayu [--check]');
const source = resolve(sourceRoot);
const files = ['GOVERNANCE.md', 'MAINTAINERS.md', 'CONTRIBUTING.md', 'SUPPORT.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md'];
const contents = Object.fromEntries(await Promise.all(files.map(async path => [
    path, await readFile(resolve(source, path), 'utf8'),
])));
const changed = execFileSync('git', ['status', '--porcelain', '--', ...files], {cwd: source, encoding: 'utf8'});
assert(!changed.trim(), 'Commit the source community files before recording a reproducible snapshot.');
const commit = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: source, encoding: 'utf8'}).trim();
const roster = contents['MAINTAINERS.md'];
assert(!/^## Committers/m.test(roster), 'The source role model changed; review the website presentation.');
const origin = contents['GOVERNANCE.md'].match(
    /^Dayu was founded by \[([^\]]+)\]\(([^)]+)\) at \[([^\]]+)\]\(([^)]+)\)\./m,
);
assert(origin, 'Review the founding attribution before synchronizing.');

function rows(heading) {
    const section = roster.split('## ' + heading + '\n')[1]?.split('\n## ')[0];
    assert(section, 'Missing roster section: ' + heading);
    const table = section.split('\n').filter(line => line.startsWith('|'));
    assert(table.length >= 2, 'Missing roster table: ' + heading);
    return table.slice(2).map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));
}

const people = new Map();
function person(row, tsc = false) {
    const [name] = row;
    const github = row[tsc ? 2 : 1].match(/https:\/\/github\.com\/([^\s)]+)/)?.[1] ?? null;
    const affiliation = row[tsc ? 3 : 2];
    assert(name && affiliation, 'Incomplete person: ' + name);
    const id = (github ?? name.replaceAll(' ', '-')).toLowerCase();
    const value = {id, name, github, affiliation};
    if (people.has(id)) assert.deepEqual(people.get(id), value, 'Conflicting identity: ' + id);
    people.set(id, value);
    return id;
}
const tsc = rows('Technical Steering Committee').map(row => ({id: person(row, true), office: row[1]}));
const maintainers = rows('Maintainers').map(row => person(row));
const contributors = rows('Contributors').map(row => person(row));
const snapshot = {
    source: {
        repository: 'dayu-autostreamer/dayu',
        commit,
        files: Object.fromEntries(files.map(path => [
            path, createHash('sha256').update(contents[path]).digest('hex'),
        ])),
    },
    origin: {
        laboratory: {name: origin[1], url: origin[2]},
        institution: {name: origin[3], url: origin[4]},
    },
    people: [...people.values()],
    tsc,
    maintainers,
    contributors,
};
const target = resolve(siteRoot, 'src/data/community.json');
if (process.argv.includes('--check')) {
    assert.deepEqual(JSON.parse(await readFile(target, 'utf8')), snapshot, 'Community snapshot differs from source.');
    console.log('Community snapshot matches the source roster, origin, and policy files.');
} else {
    await writeFile(target, JSON.stringify(snapshot, null, 2) + '\n');
    console.log('Synchronized community data. Review both language summaries when source policies change.');
}
