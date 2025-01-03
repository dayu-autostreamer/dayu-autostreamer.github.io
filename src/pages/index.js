import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
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
              to="https://github.com/dayu-autostreamer/dayu">
              Download😎
            </Link>
          </div>
          <div className="margin-horiz--sm">
            <Link
              className="button button--secondary button--lg"
              to="/docs/introduction">
              Get Started💪
            </Link>
          </div>
        </div>
      </div>
    </header >
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      // title={`Hello from ${siteConfig.title}`}
      title={`Hello from Dayu`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
