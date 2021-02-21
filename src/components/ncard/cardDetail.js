import React, { Fragment } from 'react';

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

const cardDetail = (props) => {
    const cardIndex = props.cardindex;
    console.log(cardIndex);
    const cardInfoList = props.cardinfolist;
    console.log(cardInfoList);
    const info_detail = cardIndex>0?cardInfoList[cardIndex-1]:null;
    if (info_detail) {
        console.log(`지금 카드 정보: ${info_detail.name}`);
    }

    // layer on/off 유무
    const isShowDetail = props.isshowdetail;

    return (
        <Fragment>
            <div className={isShowDetail?'ly_info is_show':'ly_info'}>
                <div className={styles.detail_wrap}>
                    {
                        info_detail?(
                            <div>
                                <div>info_detail.name</div>
                                <div>info_detail.rank</div>
                                <div>info_detail.option1</div>
                                <div>info_detail.option2</div>
                                <div>info_detail.option3</div>
                                <div>info_detail.option4</div>
                                <div>info_detail.option4</div>
                                <div>info_detail.option5</div>
                            </div>
                        ): null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default cardDetail;