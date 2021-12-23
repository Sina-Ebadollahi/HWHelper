
// routing
import { NavLink } from 'react-router-dom'
// hooks
import useAuth from '../../hooks/useAuth'
// styles
import './Sidebar.css'
// svg(s)
import dashboardIcon from '../../asset/images/dashboard_icon.svg'
import addIcon from '../../asset/images/add_icon.svg'
export default function Sidebar() {
    const { user } = useAuth();
    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    { user && (
                        <>
                            <img src={user.photoURL} alt='user profile' style={{borderRadius: '50%'}} />
                            <p>Hi {user.displayName}</p>
                        </>
                    )}
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                <img src={dashboardIcon} alt="Dashboard Icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={addIcon} alt="Dashboard Icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            
        </div>
    )
}
