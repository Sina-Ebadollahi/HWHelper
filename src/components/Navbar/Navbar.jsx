// hooks
import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout';
// styles
import './Navbar.css'
// routing
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar() {
    const { user } = useAuth();
    const { logout, isPending: logoutIsPending } = useLogout();
    const nav = useNavigate();

    function handleLogoutClick(){
        logout();

        nav('/')
    }

    return (
        <nav className='navbar'>
            <ul>
                <li className="logo">
                    <span><Link to="/">HWHelper</Link></span>
                </li>
                {!user && (
                    <>
                        <li><Link to="/login">login</Link></li>
                        <li><Link to="/signup">signup</Link></li>
                    </>
                )}
                {!logoutIsPending && (<li><button className='btn' onClick={handleLogoutClick}>Logout</button></li>)}
                {logoutIsPending && (<li><button className='btn' disabled>Loggin Out ...</button></li>)}
            </ul>
            
                
        </nav>
    )
}
