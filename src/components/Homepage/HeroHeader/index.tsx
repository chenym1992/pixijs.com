import clsx from 'clsx';

import HomeCTA from '../HomeCTA';
import styles from './index.module.scss';

export default function HeroHeader(): JSX.Element
{
    return (
        <header className={clsx('hero hero--dark', styles.heroBanner)}>
            <iframe className={styles.heroBackground} src="/header/index.html"></iframe>
            <div className="container">
                <img className={styles.heroLogo} src="/images/logo.svg" alt="" />
                <h1 className="hero__subtitle">HTML5创作引擎</h1>
                <h4 className="hero__subsubtitle">使用最快、最灵活的2D WebGL渲染器创建美丽的数字内容。</h4>
                <div className="buttonRow">
                    <HomeCTA label="下载" link="https://github.com/pixijs/pixijs/releases" />
                    &nbsp;
                    <HomeCTA label="开始使用" link="/tutorial" white={true} outline={true} />
                </div>
            </div>
        </header>
    );
}
