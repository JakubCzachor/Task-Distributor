import { addDoc,collection, deleteDoc, doc, getDocs, runTransaction } from 'firebase/firestore'
import React, {useEffect,useState} from 'react'
import { db } from "../fire";
import EditTask from './EditTask';

const Task = () => {
    
    const[tasks,setTasks] = useState([])
    const[createTask,setCreateTask] = useState("")
    const[checked,setChecked] = useState([])
    const collectionRef = collection(db,'tasks')

    useEffect(() => {
        const getTasks = async() =>{


            await getDocs(collectionRef).then((task) => {
            let tasksData = task.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setTasks(tasksData)
            setChecked(tasksData)
            }).catch((err) => {
                console.log(err);
            })
        }
        getTasks()
    },[])
    // add task handler
    const submitTask = async (e) => {
        e.preventDefault();
        try{
            await addDoc(collectionRef,{
                task: createTask,
                isChecked:false
            })
            window.location.reload()
        } catch(err){
            console.log(err)
        }
    }

    const deleteTask = async(id) =>{
        if (window.confirm('are you sure you want to delete the task?')) {
            try{
                const documentReff = doc(db,"tasks",id)
                await deleteDoc(documentReff)
                window.location.reload()
            }catch(err){
                console.log(err)
            }
        }
    }
    const checkBoxHandler = async(event) =>{

        setChecked(state => {
            const index = state.findIndex(checkbox => checkbox.id.toString() === event.target.name)


            let newState = state.slice()
            newState.splice(index, 1,{
                ...state[index],
                isChecked: !state[index].isChecked
            })
            setTasks(newState)
            return newState
        })
        //persiting check values
        try{
            const docRef = doc(db,"tasks",event.target.name)
            await runTransaction(db,async(transaction)=>{
                const taskDoc = await transaction.get(docRef)
                if(!taskDoc.exists()){
                    throw "Document does not exist"
                }
                const newValue = !taskDoc.data().isChecked
                transaction.update(docRef,{isChecked: newValue})
            })
            console.log("Task checked succesfully")
        }catch(err){
            console.log("Failed to check task",err)
        }

    }
    console.log("tasks",tasks)
    return(
        <>
            <div className = "container">
                <div className ="row col-md-12">
                    <div className = "card card-white">
                        <div className = "card-body">
                        {/*Button trigger modal*/}
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTask">
  Add Task</button>
                            {tasks.map(({task,id,isChecked}) => 
                            <div className = "todo-list" key = {id}>
                                <div className = "todo-item">
                                    <hr />
                                    <span>
                                        <div className = "checker">
                                            <span>
                                                <input 
                                                type = "checkbox"
                                                defaultValue={isChecked}
                                                onChange={(event) => checkBoxHandler
                                                (event)}
                                                name={id}
                                                />
                                                    
                                            </span>
                                        </div>
                                        &nbsp;{task}
                                    </span>
                                    <span className='float-end mx-3'>
                                        <EditTask task={task} id= {id}/>
                                    <button 
                                    type = "button" 
                                    className = "btn btn-danger"
                                    onClick={() => deleteTask(id)}
                                    > Delete</button>
                                    </span>
                                    {/* <button type = "button" className = "btn btn-danger"> Delete Task</button> */}

                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/*Modal */}
<div className="modal fade" id="addTask" tabIndex="-1" aria-labelledby="addTaskLabel" aria-hidden="true">
  <div className="modal-dialog">
  <form onSubmit = {submitTask} className = "d-flex">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addTaskLabel">Add Tasks Below</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* <form onClick = {submitTask} className = "d-flex"> */}
            <input 
            type = "text" 
            className = "form-control" 
            placeholder='Add a task'
            onChange={e => setCreateTask(e.target.value)}
            />

        {/* </form> */}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-primary">Save Task</button>
      </div>
    </div>
    </form>
  </div>
</div>

        </>


    )
}
export default Task;