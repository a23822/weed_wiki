import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import Flicking from "@egjs/react-flicking";
import FlickingBtn from '../common/flickingButton';

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

// context
import { UIContext } from '../context/ui';

const TotalCardList = (props) => {
    //props
    const cardList = props.totalcardprops.cardListData;
    const getCardIndex = props.totalcardprops.getDetailCardIndex;
    const getIsShowDetail = props.totalcardprops.getIsShowDetail;

    // 스크롤
    const { ui_state , ui_actions } = useContext(UIContext);

    const onClickCard = (index) => {
        getCardIndex(index);
        getIsShowDetail(true);
        document.body.classList.add('no_scroll');
        ui_actions.setTempScrollValue(ui_state.currentScrollValue);
    }

    // 플리킹 관련
    const flickingRef = useRef();
    const [flickingInfo, setFlickingInfo] = useState(flickingRef.current);
    const [fHeight, setfHeight] = useState(0);

    useEffect(() => {
        if (flickingRef.current) {
            setFlickingInfo(flickingRef.current);
            var target = document.getElementsByClassName(flickingRef.current.props.className)[0];
            var fInnerHeight = parseInt(target.clientHeight);
            var margin = 2*parseInt(window.getComputedStyle(target).getPropertyValue('margin-bottom'));
            setfHeight(fInnerHeight + margin);
        }
    }, [flickingRef])

    useEffect(() => {
        if (flickingInfo){
            flickingInfo.moveTo(ui_state.tempCardFlickingIndex,300);
        }
    }, [flickingInfo])

    return (
        <Fragment>
            <Flicking ref={flickingRef} className={`flicking ${styles.item_list_wrap}`} gap={12} autoResize={true} anchor={"50%"} hanger={"50%"} circular={true}>
                {
                    cardList.map(card => (
                        card.display?
                        <div key={card.id} className={styles.item_bx}>
                            <button type="button" onClick={() => onClickCard(card.id)} className={styles.item} style={{backgroundColor:`${card.bgInfo.bgColor}`,color:`${card.bgInfo.fontColor}`}}>
                                <div className={styles.thumb_area}>
                                    <div className={styles.thumb_wrap}>
                                        <i className={`spcard img_card${card.id}`}></i>
                                    </div>
                                    <div className={styles.name}>{card.name}</div>
                                </div>
                            </button>
                        </div>
                        :
                        null
                    ))
                }
            </Flicking>
            <FlickingBtn flag={'cardInfo'} flickinginfo={flickingInfo} height={fHeight}/>
        </Fragment>
    )
}


export default TotalCardList;