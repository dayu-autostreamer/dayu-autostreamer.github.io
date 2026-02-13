import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();

    return (
        <header className={clsx('hero', styles.heroBackground)}>
            <div className={clsx('container', styles.heroInner)}>
                <ThemedImage
                    className={styles.heroLogo}
                    alt="Dayu logo"
                    sources={{
                        light: useBaseUrl('/img/dayu-logo-horizontal.svg'),
                        dark: useBaseUrl('/img/dayu-logo-horizontal-white.svg'),
                    }}
                />

                <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
                    <Translate>
                        Provide infrastructure for cloud-edge collaborative stream data analytics.
                    </Translate>
                </p>

                <div className={styles.buttons}>
                    <div className="margin-horiz--sm">
                        <Link
                            className="button button--secondary button--lg"
                            to="https://github.com/dayu-autostreamer/dayu">
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
                        <Link className="button button--secondary button--lg" to="/docs/">
                            <Translate>Get Started</Translate>
                        </Link>
                    </div>
                </div>
            </div>

            <ThemedImage
                className={styles.heroWave}
                alt=""
                aria-hidden="true"
                sources={{
                    light: useBaseUrl('/img/bg-wave-light.svg'),
                    dark: useBaseUrl('/img/bg-wave-dark.svg'),
                }}
            />
        </header>
    );
}

export default function Home() {
    return (
        <Layout
            title={`Infrastructure for Cloud-Edge Collaborative Stream Data Analytics`}
            description="Infrastructure for Cloud-Edge Collaborative Stream Data Analytics">
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
