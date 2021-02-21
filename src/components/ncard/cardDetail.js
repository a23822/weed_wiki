import React, { Fragment } from 'react';

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

// icon
import { IoIosCloseCircleOutline, IoIosCloseCircle } from "react-icons/io";

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
    const getIsShowDetail = props.getisshowdetail;

    // 닫기 버튼
    const onClickCloseBtn = () => {
        getIsShowDetail(false);
    }

    return (
        <Fragment>
            <div className={isShowDetail?'ly_info is_show':'ly_info'}>
                <div className={styles.detail_wrap}>
                    {
                        info_detail?(
                            <div className={styles.detail_inner}>
                                <button onClick={() => onClickCloseBtn()} className={styles.btn_close}>
                                    <IoIosCloseCircleOutline className={`${styles.ico}`}/>
                                    <IoIosCloseCircle className={`${styles.ico} ${styles.type_hover}`}/>
                                </button>
                                <div className={styles.title_area}>
                                    <div className={styles.title}>
                                        <h3 className={styles.txt}>{info_detail.name}</h3>
                                    </div>
                                </div>
                                <div className={styles.thumb_area}>
                                    <div className={styles.thumb_wrap}>
                                        <i className={`spcard img_card${info_detail.id}`}></i>
                                    </div>
                                </div>
                                <div>{info_detail.rank}</div>
                                <div>{info_detail.option1}: 7.5% ~ 11%</div>
                                <div>{info_detail.option2}: 7.5% ~ 11%</div>
                                <div>{info_detail.option3}: 5.1%</div>
                                <div>{info_detail.option4}: 5.4%</div>
                                <div>{info_detail.option4}: 5.7%</div>
                                <div>{info_detail.option5}: 6%</div>
                            </div>
                        ): null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default cardDetail;