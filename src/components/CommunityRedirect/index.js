import React from 'react';
import Head from '@docusaurus/Head';
import {Redirect, useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';

export default function CommunityRedirect({redirectData: {to, anchors = {}}}) {
    const {siteConfig} = useDocusaurusContext();
    const {search, hash} = useLocation();
    let anchor = hash.slice(1);
    try { anchor = decodeURIComponent(anchor); } catch { /* Preserve malformed fragments unchanged. */ }
    const fragment = Object.hasOwn(anchors, anchor) ? '#' + anchors[anchor] : hash;
    const destination = to + search + fragment;
    return (
        <>
            <Head>
                <title>Dayu Community</title>
                <link rel="canonical" href={siteConfig.url + to} />
                <meta name="robots" content="noindex, follow" />
            </Head>
            <Redirect to={destination} />
            <main className="container margin-vert--lg">
                <h1>Dayu Community</h1>
                <a href={destination}>
                    <Translate id="community.redirect">Continue to the community page</Translate>
                </a>
            </main>
        </>
    );
}
