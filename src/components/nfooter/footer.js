import React from 'react';

// scss
import styles from './footer.module.scss';

const Footer = () => {
    return(
        <footer className={`footer_wrap`}>
            <div className={styles.inner}>
                푸터
            </div>
        </footer>
    )
}

export default Footer;