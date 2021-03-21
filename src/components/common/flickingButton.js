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
    const { ui_actions } = useContext(UIContext);

    useEffect(() => {
        if (flickingInfo) {
            console.log(flickingInfo.getCurrentPanel());
        }
    }, [flickingInfo])


    const temp = (idx, delay) => {
        console.log(idx);
        flickingInfo.moveTo(idx, delay);
        ui_actions.setTempCardFlickingIndex(idx);
    }

    const clickBtn = async(dir) => {
        // 카드정보에서 눌렀을 때
        console.log(flickingInfo.getAllPanels().length);
        let maxCardLength = flickingInfo.getAllPanels().length;
        let movIdx = 0;
        if (flag === 'cardInfo') {
            if (dir === `left`) {
                movIdx = (flickingInfo.getCurrentPanel().state.index-3);
                if (movIdx < 0) {
                    movIdx = maxCardLength+movIdx;
                }
            } else {
                movIdx = (flickingInfo.getCurrentPanel().state.index+3);
                if (movIdx >= maxCardLength) {
                    movIdx = movIdx%maxCardLength;
                }
            }
        }
        await temp(movIdx, 300);
    }

    return (
        <div className={styles.flick_btn_area} style={{height: `${height}px`, marginTop: `-${height}px`}}>
            <button onClick={() => clickBtn('left')} type="button" className={`${styles.btn_move} ${styles.type_left}`}>이전</button>
            <button onClick={() => clickBtn('right')} type="button" className={`${styles.btn_move} ${styles.type_right}`}>다음</button>
        </div>
    )
}

export default FlickingButton;