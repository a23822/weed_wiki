import React, { Fragment } from 'react';
import Flicking from "@egjs/react-flicking";
import FlickingBtn from '../common/flickingButton';

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

const totalCardList = (props) => {
    //props
    const cardList = props.totalcardprops.cardListData;
    const getCardIndex = props.totalcardprops.getDetailCardIndex;
    const getIsShowDetail = props.totalcardprops.getIsShowDetail;
    const flickingRef = props.totalcardprops.flickingRef;
    const flickingInfo = props.totalcardprops.flickingInfo;

    const onClickCard = (index) => {
        getCardIndex(index);
        getIsShowDetail(true);
    }
    
    console.log(flickingInfo);

    const testBtn = () => {
        console.log(flickingInfo.getCurrentPanel());
        var temp = flickingInfo.getCurrentPanel();
        if (!temp) {
            flickingInfo.moveTo(1,300);
        } else {
            flickingInfo.next(300);
        }
    }

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
            <button type="button" onClick={() => testBtn()}>테스트버튼임</button>
            <FlickingBtn/>
        </Fragment>
    )
}


export default totalCardList;