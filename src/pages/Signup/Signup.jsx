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
    const { signup, isPending } = useSignup();
    const nav = useNavigate();
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
        if(!isPending){
            nav('/');

        }

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
                <input onChange={(e) => setThumbnail(e.target.files[0])} type="file"  />
            </label>
            <button type='submit' className='btn'>Submit</button>

        </form>
    )
}
