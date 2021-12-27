// components
import Avatar from "../../components/Avatar/Avatar"
// hooks
import { useFirestore } from "../../hooks/useFirestore"
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";


export default function ProjectSummary({ project }) {
    const { deleteDocumentFromFirestore } = useFirestore('Projects');
    const { user } = useAuth();
    const nav = useNavigate();
    async function handleDeleteClick(e){
        await deleteDocumentFromFirestore(project.id);
        nav('/dashboard');
    }
    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className="due-date">{project.dueDate.toDate().toDateString()}</p>
                <p className="details">
                    {project.details}
                </p>
                <h4>project is assigned to : </h4>
                { project.assignedUserForDB.map(u => {
                    return(
                        <div key={u.id}>
                            <Avatar imgSrc={u.photoURL} />
                        </div>
                    )
                })}
                { user.uid === project.createdBy.id && (
                <button className="btn" onClick={handleDeleteClick}>Mark as completed.</button>
                )}
            </div>
            
        </div>
    )
}
