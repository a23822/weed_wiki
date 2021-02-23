import React, { Fragment, useState } from 'react';

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

// icon
import { IoIosCloseCircleOutline, IoIosCloseCircle } from "react-icons/io";
import { RiInformationLine } from "react-icons/ri";

const cardDetail = (props) => {
    const cardIndex = props.detailprops.cardIndex;
    const cardInfoList = props.detailprops.cardInfoList;
    const info_detail = cardIndex>0?cardInfoList[cardIndex-1]:null;

    // layer on/off 유무
    const isShowDetail = props.detailprops.isShowDetail;
    const getIsShowDetail = props.detailprops.getIsShowDetail;

    // 닫기 버튼
    const onClickCloseBtn = () => {
        getIsShowDetail(false);
    }
    
    // 라벨 인포메이션 버튼
    const isPressedLabelInfoBtn = props.detailprops.isPressedLabelInfoBtn;
    const setIsPressedLabelInfoBtn = props.detailprops.setIsPressedLabelInfoBtn;
    const onClickLabelInfoBtn = (e) => {
        setIsPressedLabelInfoBtn(!isPressedLabelInfoBtn);
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
                                    <div className={styles.tag_group}>
                                        <button onClick={onClickLabelInfoBtn} className={`${styles.btn_label} type_${info_detail.rank.toLowerCase()}`} aria-pressed={isPressedLabelInfoBtn}>{info_detail.rank}<RiInformationLine className={styles.ico_info} aria-label="관련 정보 보기"/></button>
                                        <div className={styles.ly_sub}>
                                            예시입니다
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.thumb_area}>
                                    <div className={styles.thumb_wrap}>
                                        <i className={`spcard img_card${info_detail.id}`}></i>
                                    </div>
                                </div>
                                <div className={styles.info_area}>
                                    <div className={styles.info_group}>
                                        <h4 className={styles.title}>옵션</h4>
                                        <div className={styles.info}>
                                            <div className={styles.value}>첫 번째 7.5% ~ 11%</div>
                                            <div className={styles.option}>
                                                <em className={styles.label}>{info_detail.option1}</em>
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}>두 번째 7.5% ~ 11%</div>
                                            <div className={styles.option}>
                                                <em className={styles.label}>{info_detail.option2}</em>
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}>세 번째 5.1%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option3.map((item,index) => (
                                                        <em key={index} className={styles.label}>{item}</em>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}>네 번째 5.4%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option4.map((item,index) => (
                                                        <em key={index} className={styles.label}>{item}</em>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}>다섯번째 5.7%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option5.map((item,index) => (
                                                        <em key={index} className={styles.label}>{item}</em>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}>여섯번째 6%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option6.map((item,index) => (
                                                        <em key={index} className={styles.label}>{item}</em>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ): null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default cardDetail;