
// styles
import './ProjectList.css'
// route
import { Link } from 'react-router-dom'
// components
import Avatar from '../Avatar/Avatar'

export default function ProjectList({ projects }) {
    return (
        <div className='project-list'>
            { projects.length === 0 ? <p>No Projects Found!</p> : projects.map(p => (
                <Link to={`/projects/${p.id}`} key={p.id} >
                    <h4>{p.name}</h4>
                    <p>Due by {p.dueDate.toDate().toDateString()}</p>
                    <div className='assigned-to'>
                        <ul>
                        {p.assignedUserForDB.map((u) => {
                            return(
                                <li key={u.photoURL}>
                                    <Avatar imgSrc={u.photoURL}/>
                                </li>     
                            )
                        })}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}
