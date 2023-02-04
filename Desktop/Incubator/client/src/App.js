
   
import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/common/Form';
import Home from './components/Home';
//import Search from "./components/Search";
//import Add from "./components/Add";
//import Tasks from "./components/Tasks";
//import Complete from "./components/Complete";
//import Submit from "./components/Submit";
import { app } from './fire';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';

import {
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleAction = (id) => {
        const authentication = getAuth();
        if (id === 1) {
            signInWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    navigate('/home')
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                    sessionStorage.setItem('Email', email)
                })
                .catch((error) => {
                    console.log(error.code)
                    if (error.code === 'auth/wrong-password') {
                        toast.error('Please check the Password');
                    }
                    if (error.code === 'auth/user-not-found') {
                        toast.error('Please check the Email');
                    }
                })
        }
        if (id === 2) {
            createUserWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    navigate('/home')
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                    sessionStorage.setItem('Email', email)
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        toast.error('Email Already in Use');
                    }
                })
        }
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        let emailToken = sessionStorage.getItem('Email')
        if (authToken) {
            navigate('/home')
        }
    }, [])

    return (
        <div className="App">
            <>
                <ToastContainer />
                <Routes>
                    <Route
                        path='/login'
                        element={
                            <Form
                                title="Login"
                                setEmail={setEmail}
                                setPassword={setPassword}
                                handleAction={() => handleAction(1)}
                            />}
                    />
                    <Route
                        path='/register'
                        element={
                            <Form
                                title="Register"
                                setEmail={setEmail}
                                setPassword={setPassword}
                                handleAction={() => handleAction(2)}
                            />}
                    />

                   <Route
                        path='/home'
                        element={
                            <Home />}
                    />
           /*          <Route path='/submit'
                        element={
                            <Submit />} />
                    <Route path= '/add'
                            element = {
                            <Add />} />
                    <Route path='/tasks'
                        element={
                            <Tasks />} />
                    <Route path='/complete'
                        element={
                            <Complete />} />
                    <Route path='/search'
                        element={
                            <Search />} /> */
                </Routes>
            </>
        </div>
    );
}

export default App;
