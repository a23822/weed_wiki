import { createContext, useState, useEffect } from 'react';

export const UIContext = createContext({
    ui_state : {currentScrollValue : 0,
            tempScrollValue: 0,
            tempCardFlickingIndex: 0,
        },
    ui_actions: {
        setCurrentScrollValue: () => {},
        setTempScrollValue: () => {},
        setTempCardFlickingIndex: () => {},
    }
});
export const UIProvider = ({ children }) => {
    const [currentScrollValue, setCurrentScrollValue] = useState(0);
    const [tempScrollValue, setTempScrollValue] = useState(0);
    const [tempCardFlickingIndex, setTempCardFlickingIndex] = useState(1);

    const value = {
        ui_state: { currentScrollValue, tempScrollValue, tempCardFlickingIndex },
        ui_actions: { setCurrentScrollValue, setTempScrollValue, setTempCardFlickingIndex }
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setCurrentScrollValue(window.pageYOffset);
        })
    }, [])

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    )
}