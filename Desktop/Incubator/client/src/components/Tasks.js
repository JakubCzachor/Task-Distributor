import { query, where } from "firebase/firestore";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../fire";
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
function IncTasks() {
    const [JSONDATA, setJSONDATA] = useState([]);
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        sessionStorage.removeItem('Email');
        navigate('/login')
    };

    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token');
        let emailToken = sessionStorage.getItem('Email');
        console.log(authToken);
        console.log(emailToken);
        if (authToken) {
            navigate('/Tasks');
        }

        if (!authToken) {
            navigate('/login');
        }
    }, []);

    const [tasks, setTasks] = useState([]);
   const fetchData = async () => {
        const collectionTasks = collection(db, 'Tasks');
        const q = query(collectionTasks, where("createdBy", "==", sessionStorage.getItem("Email")), where("completed", "==", false));
        console.log(q);
        const collectionSnapshot = await getDocs(q);
        let taskArray = [];
        collectionSnapshot.forEach(function (doc) {
            taskArray.push({
                id: doc.data().name,
                title: doc.data().title,
                description: doc.data().description
            });
        });
        setTasks(taskArray);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="taskUncomplete">
            <h2> Uncompleted Tasks: </h2>
            {tasks.length > 0 ? (
                tasks.map((task, key) => (
                    <div className="task" key={key}>
                        <p> Title: {task.title}</p>
                        <p> Description: {task.description}</p>
                    </div>
                ))
            ) : (
                <p> No tasks to be found </p>
            )}
            <Button variant="contained" onClick={handleLogout}>Log out</Button>
        </div>
    );
}

export default IncTasks;