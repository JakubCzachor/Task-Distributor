import React, { useEffect, useState } from 'react'
import Modal from "./Modal"
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import "../App.css"
import "../fire.js"
import { app } from '../fire';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../fire";
import Header from "../header";
import AuthHeader from "../AuthHeader";
import Button from '@mui/material/Button';

function AddTask({ onClose, open }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duedate, setDueDate] = useState('')

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        sessionStorage.removeItem('Email');
        navigate('/login')
    }

    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        let emailToken = sessionStorage.getItem('Email')
        console.log(authToken)
        console.log(emailToken)
        if (authToken) {
            navigate('/Add')
        }

        if (!authToken) {
            navigate('/login')
        }

        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "Tasks"));
            const taskArray = [];
            querySnapshot.forEach((doc) => {
                taskArray.push({
                    name: doc.data().name,
                    assignedUser: doc.data().assignedUser,
                    description: doc.data().description,
                    email: doc.data().emails,
                });
            });
            setTasks(taskArray);
        };
        fetchData();

    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'Tasks'), {,
                
                duedate: duedate,
                keywords: description.split(" "),
                createdBy: sessionStorage.getItem("Email"),
                completed: false,
                unclaimed: true,
                claimed: false,
                submitlink: "",
                created: Timestamp.now()
            })
            alert("Task successfully submitted");
            window.location = "/home";
        } catch (err) {
            alert(err)
        }
    }


    return (
        <form onSubmit={handleSubmit} className='addTask' name='addTask'>

            <input
                type='text'
                name='title'
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                value={title}
                placeholder='Enter title' />

            <input
                type='text'
                name='title'
                onChange={(e) => setDueDate(e.target.value)}
                value={duedate}
                placeholder='Enter Due Date' />




            <textarea
                onChange={(e) => setDescription(e.target.value.toLowerCase())}
                placeholder='Enter task decription'
                value={description}></textarea>
            <button type='submit'>Done</button>

        </form>

    );
}
export default AddTask