import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Translate, {translate} from '@docusaurus/Translate';

const FeatureList = [
    {
        title: <Translate>Stream Data Analysis</Translate>,
        Svg: require('../../static/img/dayu-stream.svg').default,
        description: (
            <Translate>
                Dayu focuses on ai-driven stream data analysis,
                natively supporting parallel multi-stream processing/monitoring/scheduling with heterogeneous user-defined applications.
            </Translate>
        ),
    },

    {
        title: <Translate>Distributed Cloud-Edge Collaboration</Translate>,
        Svg: require('../../static/img/dayu-cloud-edge.svg').default,
        description: (
            <Translate>
                Based on a container orchestration framework KubeEdge,
                dayu is applicable to distributed cloud-edge collaborative scenarios and can be scale to heterogeneous devices.


            </Translate>
        ),
    },

    {
        title: <Translate>Adaptive System Scheduling</Translate>,
        Svg: require('../../static/img/dayu-schedule.svg').default,
        description: (
            <Translate>
                Dayu can be extended to scheduling topics of different granularity with flexible structure.
                Adaptive scheduling algorithms thereby can be implemented on dayu for system support.

            </Translate>
        ),
    },
];

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} alt={title}/>
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
