// hooks
import useAuth from '../../hooks/useAuth'
// styles
import './Navbar.css'
// routing
import { Link } from 'react-router-dom'
// images
import logoSvg from '../../asset/images/temple.svg'
export default function Navbar() {
    const { user } = useAuth();



    function handleLogoutClick(){
        // logout action
    }
    return (
        <nav className='navbar'>
            <ul>
                <li className="logo">
                    <Link to="/home"><img src={logoSvg} alt="hwhelper logo" /></Link>
                    <span><Link to="/">HWHelper</Link></span>
                </li>
                {!user && (
                    <>
                        <li><Link to="/login">login</Link></li>
                        <li><Link to="/signup">signup</Link></li>
                    </>
                )}
                {user && (<li><button className='btn' onClick={handleLogoutClick}>Logout</button></li>)}
            </ul>
            
                
        </nav>
    )
}
