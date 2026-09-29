import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import data from '@site/src/data/community.json';
import styles from './styles.module.css';

export default function FoundingCredit({showCommunityLink = false}) {
    const {i18n: {currentLocale}} = useDocusaurusContext();
    const zh = currentLocale === 'zh';
    return (
        <aside className={styles.credit} aria-label={zh ? '项目发起团队' : 'Project origins'}>
            <Link className={styles.logo} href={data.origin.institution.url}
                  aria-label={zh ? '南京大学官网' : 'Nanjing University website'}>
                <img src={useBaseUrl('/img/community/nanjing-university.jpg')}
                     alt={zh ? '南京大学' : 'Nanjing University'} width="440" height="140" />
            </Link>
            <div className={styles.text}>
                <p className={styles.origin}>
                    {zh ? <>由<Link href={data.origin.institution.url}>南京大学</Link>{' '}
                        <Link href={data.origin.laboratory.url}>Dislab</Link> 发起</>
                        : <>Founded by <Link href={data.origin.laboratory.url}>Dislab</Link> at{' '}
                            <Link href={data.origin.institution.url}>Nanjing University</Link></>}
                </p>
                <p className={styles.welcome}>{zh
                    ? '欢迎高校、企业及独立开发者参与贡献。'
                    : 'Contributions from academia, industry, and independent developers are welcome.'}</p>
                {showCommunityLink && <Link className={styles.join} to="/community/">
                    {zh ? '参与社区 →' : 'Join the community →'}
                </Link>}
            </div>
        </aside>
    );
}
