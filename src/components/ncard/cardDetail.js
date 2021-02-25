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
    
    // 라벨 인포메이션 버튼
    const isPressedLabelInfoBtn = props.detailprops.isPressedLabelInfoBtn;
    const setIsPressedLabelInfoBtn = props.detailprops.setIsPressedLabelInfoBtn;
    const onClickLabelInfoBtn = (e) => {
        setIsPressedLabelInfoBtn(!isPressedLabelInfoBtn);
    }

    // 닫기 버튼
    const onClickCloseBtn = () => {
        getIsShowDetail(!isShowDetail);
        setIsPressedLabelInfoBtn(false);
    }

    // 옵션목록 라벨로 변경
    const classifyOptionToLabel = (option) => {
        switch (option) {
            case "모공":
                return 'type_allAtk'
            case "물공":
                return 'type_pscAtk'
            case "에공":
                return 'type_engAtk'
            case "생명":
                return 'type_life'
            case '공속':
                return 'type_atkSpd'
            case '방무':
                return 'type_dpdPen'
            case '쿨감':
                return 'type_cooldn'
            case '이속':
                return 'type_movSpd'
            case '치율':
                return 'type_crtPer'
            case '치피':
                return 'type_crtDmgPer'
            case '모방':
                return 'type_allDpd'
            case '물방':
                return 'type_pscDpd'
            case '에방':
                return 'type_engDpd'
            case '회복':
                return 'type_regen'
            case '상감':
                return 'type_ccRdc'
            case '독저':
                return 'type_res'
            case '냉저':
                return 'type_res'
            case '화저':
                return 'type_res'
            case '전저':
                return 'type_res'
            case '정저':
                return 'type_res'
            case '회피':
                return 'type_dodge'
            default:
                return 'type_buff'
        }
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
                                            <strong className={styles.message}><RiInformationLine className={styles.ico_info}/>해당 태그들은 구할 수 있는 조건에 따라 임의로 나누었습니다.</strong>
                                            <div className={styles.sub_info}>
                                                <em className={`${styles.label} ${styles.type_normal}`}>Normal</em>
                                                <span className={styles.txt}>해당 카드들은 손쉽게 구할 수 있습니다.</span>
                                                <span className={styles.txt}>ex) 지원상점, 카드상자, 월드 보스 인베이젼</span>
                                            </div>
                                            <div className={styles.sub_info}>
                                                <em className={`${styles.label} ${styles.type_rare}`}>Rare</em>
                                                <span className={styles.txt}>해당 카드들은 손쉽게 구하기 어렵거나 과금을 통해 구할 수 있습니다.</span>
                                                <span className={styles.txt}>ex) 희귀한 확률로 협동 플레이 보상, 과금형 이벤트 카드상자, 카드깡</span>
                                            </div>
                                            <div className={styles.sub_info}>
                                                <em className={`${styles.label} ${styles.type_premium}`}>Premium</em>
                                                <span className={styles.txt}>해당 카드들은 과금, 특정 컨텐츠에서만 얻을 수 있습니다.</span>
                                                <span className={styles.txt}>ex) 월드보스상자, 카드깡, 레전더리 배틀 익스트림 보상</span>
                                            </div>
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
                                            <div className={styles.value}><span className={styles.txt_index}>첫번째</span> 7.5% ~ 10% , 11%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option1.map((item,index) => (
                                                        <em key={index} className={`${styles.label} ${classifyOptionToLabel(item)}`}>{item}</em>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}><span className={styles.txt_index}>두번째</span> 7.5% ~ 10% , 11%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option2.map((item,index) => (
                                                        <em key={index} className={`${styles.label} ${classifyOptionToLabel(item)}`}>{item}</em>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}><span className={styles.txt_index}>세번째</span> 5.1%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option3.map((item,index) => (
                                                        <em key={index} className={`${styles.label} ${classifyOptionToLabel(item)}`}>{item}</em>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}><span className={styles.txt_index}>네번째</span> 5.4%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option4.map((item,index) => (
                                                        <em key={index} className={`${styles.label} ${classifyOptionToLabel(item)}`}>{item}</em>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}><span className={styles.txt_index}>다섯번째</span> 5.7%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option5.map((item,index) => (
                                                        <em key={index} className={`${styles.label} ${classifyOptionToLabel(item)}`}>{item}</em>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.value}><span className={styles.txt_index}>여섯번째</span> 6%</div>
                                            <div className={styles.option}>
                                                {
                                                    info_detail.option6.map((item,index) => (
                                                        <em key={index} className={`${styles.label} ${classifyOptionToLabel(item)}`}>{item}</em>
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