import { query, where } from "firebase/firestore";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../fire";
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';


function TasksToBeComplete() {
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
            navigate('/Submit');
        }

        if (!authToken) {
            navigate('/login');
        }
    }, []);
    const [tasks, setTasks] = useState([]);
    const [tasksWIP, setTasksWIP] = useState([]);
    const fetchData = async () => {
        const collectionTasks = collection(db, 'Tasks');
        const qWIP = query(collectionTasks, where("claimedBy", "==", sessionStorage.getItem("Email")), where("completed", "==", false));
        const q = query(collectionTasks, where("claimedBy", "==", sessionStorage.getItem("Email")), where("completed", "==", true));
        console.log(q);
        const collectionSnapshot = await getDocs(q);
        let taskArray = [];
        let taskWIPArray = [];
        collectionSnapshot.forEach(function (doc) {
            taskArray.push({
                id: doc.data().name,
                title: doc.data().title,
                description: doc.data().description
            });
        });
        const collectionWIPSnap = await getDocs(qWIP);
        collectionWIPSnap.forEach(function (doc) {
            taskWIPArray.push({
                id: doc.data().name,
                title: doc.data().title,
                description: doc.data().description
            });
        });
        setTasks(taskArray);
        setTasksWIP(taskWIPArray);
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
         <div className="taskComplete">
            <h2> Tasks You've Completed: </h2>
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
            <h2> Tasks You Haven't Completed </h2>
            {tasksWIP.length > 0 ? (
                tasksWIP.map((task, key) => (
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

        )
}

export default TasksToBeComplete;