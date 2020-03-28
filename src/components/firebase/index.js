import React, { createContext, useEffect, useState } from 'react';
import * as app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "arca-aeb1a.firebaseapp.com",
    databaseURL: "https://arca-aeb1a.firebaseio.com",
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}
export const firebaseApp = app.initializeApp(config);
export const AuthContext = createContext('');
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(setCurrentUser);
    }, [])

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};