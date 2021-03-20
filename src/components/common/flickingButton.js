import React, { useEffect, useContext } from 'react';

//scss
import styles from './flickingButton.module.scss';

// context
import { UIContext } from '../context/ui';

const FlickingButton = (props) => {
    const flickingInfo = props.flickinginfo;
    const height = props.height;
    const flag = props.flag;

    // UI Context
    const { ui_state , ui_actions } = useContext(UIContext);

    useEffect(() => {
        if (flickingInfo) {
            console.log(flickingInfo.getCurrentPanel());
        }
    }, [flickingInfo])


    const clickBtn = (dir) => {
        // 카드정보에서 눌렀을 때
        if (flag === 'cardInfo') {
            console.log();
            if (dir === `left`) {
                flickingInfo.moveTo(flickingInfo.getCurrentPanel().state.index-3, 300);
            } else {
                flickingInfo.moveTo(flickingInfo.getCurrentPanel().state.index+3, 300);
            }
        }
    }

    return (
        <div className={styles.flick_btn_area} style={{height: `${height}px`, marginTop: `-${height}px`}}>
            <button onClick={() => clickBtn('left')} type="button" className={`${styles.btn_move} ${styles.type_left}`}>이전</button>
            <button onClick={() => clickBtn('right')} type="button" className={`${styles.btn_move} ${styles.type_right}`}>이후</button>
        </div>
    )
}

export default FlickingButton;