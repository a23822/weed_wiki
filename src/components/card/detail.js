import React, { Fragment, useCallback, useEffect } from 'react';
import { firebaseApp } from '../firebase';

const Detail = ({viewCardIndex, presetIndex}) => {
    console.log(viewCardIndex);
    const linkDB = useCallback(() => {
        firebaseApp.auth().onAuthStateChanged(function(user) {
            if (user) {
                var cardsRef = firebaseApp.database().ref('cards/');
                cardsRef.once('value', function(snapshot){
                    snapshot.forEach(function(childSnapshot){
                        
                    });
                    console.log('asd');
                });
                console.log(`${viewCardIndex} 하고 ${presetIndex} 받음`);
                var presetRef = firebaseApp.database().ref('users/' + user.id + '/cardSet');
                // console.log(presetRef);
            }
        })
    })

    useEffect(() => {
        linkDB();
    },[linkDB])

    return(
        <Fragment>
            <div className="test_area">상세정보</div>
        </Fragment>
    )
}

export default Detail;