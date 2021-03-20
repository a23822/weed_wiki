import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';
import { AuthProvider } from './components/firebase/index';
import { UIProvider } from './components/context/ui';

ReactDOM.render(
    <AuthProvider>
        <UIProvider>
            <Router>
                <App/>
            </Router>
        </UIProvider>
    </AuthProvider>,
    document.getElementById('root')
);
