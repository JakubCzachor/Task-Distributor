import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import "../App.css"
import "../fire.js"
import { app } from '../fire';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fire";
import Header from "../header";
import Button from '@mui/material/Button';

const AnimatedButton = styled.button`
  background-color: #4CAF50;
  color: white;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.2);
  }
`;


export default function Home() {
    const [tasks, setTasks] = useState([]);

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
            navigate('/home')
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




        return (
            <div className="homepage">
                <h1>All Available Tasks: </h1>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <p>Name: {task.name}</p>
                            <p>Assigned User: {task.assignedUser}</p>
                            <p>Description: {task.description}</p>
                            <p>Email: {task.email } </p>
                        </li>
                    ))}
                </ul>
                <Button variant = "contained" onClick={handleLogout}>Log out</Button>

            </div>
        );
}
