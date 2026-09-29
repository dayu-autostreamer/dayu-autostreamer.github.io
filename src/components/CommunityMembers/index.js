import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import data from '@site/src/data/community.json';

export default function CommunityMembers({group}) {
    const {i18n: {currentLocale}} = useDocusaurusContext();
    const zh = currentLocale === 'zh';
    const members = group === 'tsc' ? data.tsc : data[group].map(id => ({id}));
    return (
        <table>
            <thead>
                <tr>
                    <th scope="col">{zh ? '姓名' : 'Name'}</th>
                    <th scope="col">{zh ? '所属机构' : 'Affiliation'}</th>
                    {group === 'tsc' && <th scope="col">{zh ? 'TSC 职务' : 'TSC office'}</th>}
                </tr>
            </thead>
            <tbody>
                {members.map(({id, office}) => {
                    const member = data.people.find(person => person.id === id);
                    const nju = member.affiliation === 'Nanjing University';
                    return (
                        <tr key={id}>
                            <td>{member.github
                                ? <Link href={'https://github.com/' + member.github}>{member.name}</Link>
                                : member.name}</td>
                            <td>{nju
                                ? <Link href={data.origin.institution.url}>{zh ? '南京大学' : member.affiliation}</Link>
                                : member.affiliation}</td>
                            {group === 'tsc' && <td>{zh
                                ? ({Chair: '主席', 'Vice Chair': '副主席', Member: '成员'}[office] ?? office)
                                : office}</td>}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
