// firebase serivce
import { firestore, timestamp } from "../../firebase/config"

// hooks
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import { useFirestore } from "../../hooks/useFirestore";
// components
import Avatar from '../../components/Avatar/Avatar'
// function
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ProjectComments({ documentID, doc }) {
    const [newComment, setNewComment] = useState('');
    const { user } = useAuth();
    const { updatingDocumentInFirestore, error: hookError } = useFirestore('Projects')
    async function handleCommentsFormSubmit(e){
        e.preventDefault();

        let commentsToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.floor(Math.random() * 10000),
        }
        if(commentsToAdd){
            updatingDocumentInFirestore(documentID, {
                comments: [...doc.comments, commentsToAdd]
            })
            if(!hookError){
                setNewComment('');
            }
        }
    }
    return (
        <div className="project-comments">
            <h4>Project Comments</h4>
            <ul>
                { doc.comments.length === 0 ? <p>No Comments Yet...</p> : doc.comments.map((comment) => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar imgSrc={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCommentsFormSubmit}>
                <label>
                    <span>Add a new Comment</span>
                    <textarea required onChange={e => setNewComment(e.target.value)} value={newComment}></textarea>
                </label>
                <button className="btn">Submit Comment</button>
            </form>
        </div>
    )
}
