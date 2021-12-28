
// styles
import './Dashboard.css'
// hooks
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList/ProjectList';
import ProjectFilters from '../../components/ProjectFilters/ProjectFilters';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function Dashboard() {
    const { documents, error } = useCollection('Projects');
    const [currentFilter, setCurrentFilter] = useState('');
    const { user } = useAuth();
    function changeFilter(newFilter){
        setCurrentFilter(newFilter);
    }
    const filteredProjects = documents ? documents.filter((doc) => {
        switch(currentFilter){
            case 'all':
                return true;
            case 'mine':
                let assignedToMe = false;
                doc.assignedUserForDB.forEach((u) => {
                    if(user.uid === u.id){
                        assignedToMe = true;
                    }
                })
                return assignedToMe;
            case 'development':
            case 'design':
            case 'marketing':
            case 'sales':
                return doc.category === currentFilter;    
            default:
                return true;
        }
    }) : null;
    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>    
            { error && <p className='error'>{error}</p>}
            { documents && <ProjectFilters currentFilter={currentFilter} changeFilter={changeFilter} />}
            { documents && <ProjectList projects={filteredProjects}/>}
        </div>
    )
}
