// styles
import './Signup.css'
// hooks
import { useState } from 'react'
import useSignup from '../../hooks/useSignup';
// routing
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [errorsInCase,setErrorsInCase] = useState('')
    const { signup, error, isPending } = useSignup();
    const nav = useNavigate();
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName, thumbnail, 'userData');
        

    }
    function handleFileInputChange(e){
        setThumbnail(null);
        let selectedFile = e.target.files[0];
        if(!selectedFile){
            setErrorsInCase('please enter a file')
            return;
        }
        if(selectedFile.type !== "image/png" && selectedFile.type !== "image/jpeg"){
            setErrorsInCase('uploaded file is not valid as image file.');
            return;
        }
        if(selectedFile.size > 30000){
            setErrorsInCase('please enter a file with size of less than 3KB')
            return;
        }
        setErrorsInCase('');
        setThumbnail(selectedFile);
        console.log('th updated');
    }
    return (
        <form onSubmit={(e) => handleSignupSubmit(e)} className='auth-form'>
            <h2>Sign up</h2>
            <label>
                <span>Email:</span>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />
            </label>
            <label>
                <span>Password:</span>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />
            </label>
            <label>
                <span>Username:</span>
                <input onChange={(e) => setDisplayName(e.target.value)} value={displayName} type="text" required />
            </label>
            <label>
                <span>Avatar:</span>
                <input onChange={handleFileInputChange} type="file"  />
            </label>
            { errorsInCase && <p className="error" style={{color: 'red'}}>{errorsInCase}</p>}
            { error && <p className='error' style={{color: 'red'}}>{error}</p>}
            { !isPending && <button type='submit' className='btn'>Submit</button>}
            { isPending && <button type='submit' className='btn' disabled>Pending...</button>}

        </form>
    )
}
