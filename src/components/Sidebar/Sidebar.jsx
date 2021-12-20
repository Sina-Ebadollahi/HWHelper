
// routing
import { NavLink } from 'react-router-dom'

// styles
import './Sidebar.css'
// svg(s)
import dashboardIcon from '../../asset/images/dashboard_icon.svg'
import addIcon from '../../asset/images/add_icon.svg'
export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    {/* avatar and username */}
                    <p>Hey {/*user*/}</p>
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
