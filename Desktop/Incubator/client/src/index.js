import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Header from "./header";
import Footer from "./footer";
import {
    BrowserRouter as Router,
} from "react-router-dom";
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <><Header /><App /><Footer /><</>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
