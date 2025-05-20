import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import Translate, {translate} from '@docusaurus/Translate';

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
                <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
                    <Translate>
                        {/*{siteConfig.tagline}*/}
                        Provide infrastructure for cloud-edge collaborative stream data analysis.
                    </Translate>
                </p>
                <div className={styles.buttons}>
                    <div className="margin-horiz--sm">
                        <Link
                            className="button button--secondary button--lg"
                            to="https://github.com/dayu-autostreamer/dayu/">
                            <Translate>Github</Translate>
                        </Link>
                    </div>
                    <div className="margin-horiz--sm">
                        <Link
                            className="button button--secondary button--lg"
                            to="https://github.com/dayu-autostreamer/dayu/releases/">
                            <Translate>Download</Translate>
                        </Link>
                    </div>
                    <div className="margin-horiz--sm">
                        <Link
                            className="button button--secondary button--lg"
                            to="/docs/getting-started">
                            <Translate>Get Started</Translate>
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
