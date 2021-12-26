// hooks
import { useEffect, useState } from 'react'
import { useCollection } from '../../hooks/useCollection';
import useAuth from '../../hooks/useAuth'
import useLocation from '../../hooks/useLocation';
// styles
import './Create.css'
// components
import Select from 'react-select';
// firebase
import { timestamp } from '../../firebase/config';
import useAddCollection from '../../hooks/useAddCollection';
import { useNavigate } from 'react-router-dom';

const categoryOptions = [
    { value: 'development', label: 'Development'},
    { value: 'design', label: 'Design'},
    { value: 'sales', label: 'Sales'},
    { value: 'marketing', label: 'Marketing'},
]

export default function Create() {
    const { user } = useAuth();
    // getting the user IP and location
    const { getLocationFunc, locationData } = useLocation();
    // users list
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);
    const { documents, error: collectionError } = useCollection('userData');
    const { addCollectionAction, success, error: addingDocumentsError, isPending } = useAddCollection();
    const nav = useNavigate();
    useEffect(() => {
        if(documents){
            setUsers(documents.map((user) => {
                return {
                    value: user,
                    label: user.displayName,
                }
            }))
        }
    },[documents])
    function handleCreateFormSubmit(e){
        e.preventDefault();
        setFormError(null);
        if(!category){
            setFormError('Please enter category.')
            return;
        }
        if(assignedUsers.length < 1){
            setFormError('Please assign a user.')
            return;
        }
        getLocationFunc('https://geolocation-db.com/json/');
        let userLocationData;
        if(locationData){
             userLocationData = {
                IP: locationData.IPv4,
                country: locationData.country_name,
                countryCode: locationData.country_code,
                city: locationData.city ? locationData.city : locationData.state,
            }
        }
        let createdBy = {
            photoURL: user.photoURL,
            displayName: user.displayName,
            id: user.uid,
        }
        let assignedUserForDB = assignedUsers.map((user) => {
            return{
                displayName: user.value.displayName,
                photoURL: user.value.photoURL,
                id: user.value.id,
            }
        })
        let createProjectDocuments = {
            name,
            details,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            category: category.value,
            comments: [],
            createdBy,
            assignedUserForDB,
            userLocationData,
        }
        if(createProjectDocuments){
            addCollectionAction('Projects', createProjectDocuments);
        }
        if(success){
            nav('/');
        }
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
                    <Select 
                        onChange={(option) => setCategory(option)}
                        options={categoryOptions}
                    />
                </label>
                <label>
                    <span>Assignt to:</span>
                    <Select
                        onChange={(options) => setAssignedUsers(options)}
                        options={users}
                        isMulti
                    />
                </label>
                { !isPending && <button className="btn">Add Project</button>}
                { isPending && <button className="btn" disabled>waiting to add...</button>}
                { formError && <p className='error'>{formError}</p>}
                { collectionError && <p className='error'>{collectionError}</p>}
                { addingDocumentsError && <p className='error'>{addingDocumentsError}</p>}
            </form>
        </div>
    )
}
