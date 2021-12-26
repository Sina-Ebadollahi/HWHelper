
// styles
import './Dashboard.css'
// hooks
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList/ProjectList';

export default function Dashboard() {
    const { documents, error } = useCollection('Projects');
    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>    
            { error && <p className='error'>{error}</p>}
            { documents && <ProjectList projects={documents}/>}
        </div>
    )
}
