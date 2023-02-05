import { query, where } from "firebase/firestore";
import { collection, doc, setDoc,getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../fire";
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import "./task.css"
import Button from '@mui/material/Button';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [JSONDATA, setJSONDATA] = useState([]);
    const [claimedTask, setClaimedTask] = useState("");
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
            navigate('/Search');
        }

        if (!authToken) {
            navigate('/login');
        }
    }, []);
    const collectionTasks = collection(db, 'Tasks');
    const handleClaimTask = async () => {
        if (!claimedTask) {
            return;
        }
        const updateRef = doc(db, "Tasks", claimedTask);
        await updateDoc(updateRef, {
            "unclaimed": false,
            "claimed": true,
            "claimedBy": sessionStorage.getItem('Email')
        });
        setClaimedTask("");
        alert("Task has been successfully claimed");
        window.location.reload();
    };

    const [tasks, setTasks] = useState([]);
    const [claimTask, setClaimTask] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let tasks = [];
            
            const q = searchTerm ? query(collectionTasks, where("keywords", "array-contains", searchTerm), where ("unclaimed", "==", true)) : query(collectionTasks, where("unclaimed", "!=", false));
            console.log(q);
            const collectionSnapshot = await getDocs(q);

            collectionSnapshot.forEach(function (doc) {
                tasks.push({
                    id: doc.id,
                    description: doc.data().description,
                });
            });

            setTasks(tasks);
        };

        fetchData();
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm]);

    return (
        <div>
        <div className="Search keywords for tasks: ">
            <input
                type="text"
                placeholder="Keyword..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <h2> Unclaimed Tasks: </h2>
            {tasks.map((task, key) => {
                return (
                    <div className="task" key={key}>
                        <p> Task ID:{task.id}<br /> Description: {task.description}<br /><br /></p>
                    </div>
                );
            })}
            </div>
            <div className="claimTask">
                <h2> Claim Task: </h2>
                <input
                    type="text"
                    placeholder="Task ID..."
                    value={claimedTask}
                    onChange={e => setClaimedTask(e.target.value)}
                />
                <button onClick={handleClaimTask}>Claim Task</button>
            </div>
            <Button variant="contained" onClick={handleLogout}>Log out</Button>
        </div>
    );
}

export default Search;
