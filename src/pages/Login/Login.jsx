// hooks
import useLogin from '../../hooks/useLogin';
import { useState } from 'react'
// styles
import './Login.css'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginAction, error, isPending } = useLogin();
    const nav = useNavigate();
    function handleLoginSubmit(e){
        e.preventDefault();
        loginAction(email, password)
        setEmail('');
        setPassword('');
        nav('/');
    }
    return (
        <form onSubmit={(e) => handleLoginSubmit(e)} className='auth-form'>
            <h2>Login</h2>
            <label>
                <span>Email:</span>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />
            </label>
            <label>
                <span>Password:</span>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />
            </label>
            { error && <p className='error' style={{color: 'red'}}>{error}</p>}
            { !isPending && <button type='submit' className='btn'>Login</button>}
            { isPending && <button type='submit' className='btn' disabled>Pending...</button>}
        </form>
    )
}
