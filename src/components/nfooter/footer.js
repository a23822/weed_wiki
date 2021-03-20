import React from 'react';

// scss
import styles from './footer.module.scss';

const Footer = () => {
    const yt_sub_link = 'https://www.youtube.com/channel/UCpLaFR9HWmcuSgGi9gSA2fQ?sub_confirmation=1';
    return(
        <footer className={`footer_wrap`}>
            <div className={styles.inner}>
                <div className={styles.banner_area}>
                    <a href={yt_sub_link} className={styles.yt_sub_link}><span className={styles.txt}><strong>잡초맨</strong> 유튜브 구독하러 가기</span></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;