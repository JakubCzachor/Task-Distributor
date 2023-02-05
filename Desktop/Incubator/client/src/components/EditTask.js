import { async } from '@firebase/util';
import { doc, updateDoc } from 'firebase/firestore';
import React,{useState} from 'react'
import {db} from '../fire'
const EditTask = ({task,id}) => {


    const[UpdatedTask,setUpdatesTask] = useState([task])

    const updateTask = async(e)=>{
        e.preventDefault();

        try{
            const taskDocument = doc(db,"tasks",id)
            await updateDoc(taskDocument,{
                task: UpdatedTask,
                isChecked:false
            })
            window.location.reload()
        }catch(err){
            console.log(err)
        }


    }

    return(
        <>

    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${id}`}>
    Update Task</button>

        <div className="modal fade" id={`id${id}`} tabIndex="-1" aria-labelledby="UpdateTaskLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="UpdateTaskLabel">Add Tasks Below</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {/* <form onClick = {submitTask} className = "d-flex"> */}
            <input 
            type = "text" 
            className = "form-control" 
            placeholder='Add a task'
            defaultValue={UpdatedTask}
            onChange = {e => setUpdatesTask(e.target.value)}
            />

        {/* </form> */}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button 
        type="submit" 
        className="btn btn-primary"
        onClick={e => updateTask(e)}>Save Task</button>
      </div>
    </div>
  </div>
</div>
</>
    )
}
export default EditTask