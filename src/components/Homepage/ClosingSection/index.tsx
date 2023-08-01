import { useInView } from 'react-intersection-observer';

import HomeCTA from '../HomeCTA';
import styles from './index.module.scss';

const animShortUp = (duration: number, delay: number) => ({
    opacity: 0,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
});

export default function ClosingSection(): JSX.Element
{
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    return (
        <div className={`${styles.closing} padding-vert--xl`}>
            <div ref={ref}>
                {inView && (
                    <>
                        <h3 className="short-up-anim" style={animShortUp(0.3, 0.25)}>
                            提升传统的 HTML5 技术
                        </h3>
                        <h5 className="short-up-anim" style={animShortUp(0.3, 0.4)}>
                            无与伦比的性能，直观的 API，全球范围内被广泛使用和经过实战验证。
                        </h5>
                        <div className="buttonRow">
                            <HomeCTA
                                anim="short-up-anim"
                                style={animShortUp(0.3, 0.55)}
                                label="下载"
                                link="https://github.com/pixijs/pixijs/releases"
                            />
                            &nbsp;
                            <HomeCTA
                                anim="short-up-anim"
                                style={animShortUp(0.3, 0.7)}
                                label="开始使用"
                                link="/tutorial"
                                outline={true}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
