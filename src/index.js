import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';
import { AuthProvider } from './components/firebase/index';

ReactDOM.render(
    <AuthProvider>
        <Router>
            <App/>
        </Router>
    </AuthProvider>,
    document.getElementById('root')
);
