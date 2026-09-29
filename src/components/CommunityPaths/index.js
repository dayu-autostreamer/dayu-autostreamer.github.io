import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function CommunityPaths() {
    const {i18n: {currentLocale}} = useDocusaurusContext();
    const zh = currentLocale === 'zh';
    const paths = [
        ['contributing', zh ? '参与贡献' : 'Contribute',
            zh ? '从反馈、文档、测试或代码开始。' : 'Start with feedback, docs, tests, or code.'],
        ['committee', zh ? '认识维护团队' : 'Meet the team',
            zh ? '了解社区成员及其承担的职责。' : 'Find the people responsible for the project.'],
        ['support', zh ? '寻求帮助' : 'Get help',
            zh ? '找到使用咨询、问题反馈与合作入口。' : 'Find support, issue reporting, and collaboration contacts.'],
    ];
    return <div className={styles.paths}>
        {paths.map(([path, title, description]) => <Link className={styles.card}
            to={'/community/' + path} key={path}>
            <strong>{title}<span aria-hidden="true"> →</span></strong>
            <span>{description}</span>
        </Link>)}
    </div>;
}
