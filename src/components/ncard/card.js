import React, { useState, useEffect, useContext, useCallback, Fragment } from 'react';
import { firebaseApp, AuthContext } from '../firebase/index';
import classNames from 'classnames';
import Flicking from "@egjs/react-flicking";
import '../../sprite/card/sp_card.scss';

const Card = () => {
    //로그인여부
    const { currentUser } = useContext(AuthContext);
    const cardArray = [];

    return(
        <Fragment>
            <div>카드</div>
            <Flicking className="flicking" bound={true}>
                {
                    cardArray.map(card => (
                        <div className="item_bx">
                            <div className="card_wrap">
                                <i className={classNames('spcard', 'img_card'+card.key)}></i>
                            </div>
                        </div>
                    ))
                }
                <div class="item_bx">
                    <div class="card_wrap">
                        <i class="spcard img_card1"></i>
                    </div>
                </div>
            </Flicking>
        </Fragment>
    )
}

export default Card;