import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBackground)}>
            <div className="container">
                <ThemedImage
                    className={styles.heroLogo}
                    alt="Docusaurus themed image"
                    sources={{
                        light: require('@site/static/img/dayu-trans.png').default,
                        dark: require('@site/static/img/dayu-trans.png').default,
                    }}>
                </ThemedImage>
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <div className="margin-horiz--sm">
                        <Link
                            className="button button--secondary button--lg"
                            to="https://github.com/dayu-autostreamer/dayu/">
                            Github
                        </Link>
                    </div>
                    <div className="margin-horiz--sm">
                        <Link
                            className="button button--secondary button--lg"
                            to="https://github.com/dayu-autostreamer/dayu/releases/">
                            Download
                        </Link>
                    </div>
                    <div className="margin-horiz--sm">
                        <Link
                            className="button button--secondary button--lg"
                            to="/docs/introduction/why-dayu">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Infrastructure for Cloud-Edge Collaborative Stream Data Analysis`}
            description="Infrastructure for Cloud-Edge Collaborative Stream Data Analysis">
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
