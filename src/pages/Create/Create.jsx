// hooks
import { useState } from 'react'
// styles
import './Create.css'

export default function Create() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    function handleCreateFormSubmit(e){
        e.preventDefault();
        // actions
    }
    return (
        <div className='create-form'>
            <h2 className='page-title'>Create a new project</h2>
            <form onSubmit={handleCreateFormSubmit}>
                <label>
                    <span>Project name:</span>
                    <input required type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea required type="text" onChange={(e) => setDetails(e.target.value)} value={details}></textarea>
                </label>
                <label>
                    <span>Set due date:</span>
                    <input required type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
                </label>
                <label>
                    <span>Project Category:</span>
                    {/* Category select */}
                </label>
                <label>
                    <span>Assignt to:</span>
                    {/* Category select */}
                </label>
                <button className="btn">Add Project</button>
            </form>
        </div>
    )
}
