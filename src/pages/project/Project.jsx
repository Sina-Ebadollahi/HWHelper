// hooks
import { useParams } from 'react-router-dom';
import useDocument from '../../hooks/useDocument';
// styles
import './Project.css';
import ProjectComments from './ProjectComments';
import ProjectSummary from './ProjectSummary';

export default function Project() {
    const { id: documentID } = useParams();
    const { doc, error } = useDocument('Projects', documentID)
    if(error){
        return(
            <div className='error'>{error}</div>
        )
    }
    if(!doc){
        return(
            <div className='loading'>
                loading...
            </div>
        )
    }
    return (
        <div className='project-details'>
            <ProjectSummary project={doc} />
            <ProjectComments documentID={documentID} doc={doc} />
        </div>
    )
}
