
// styles
import './UsersList.css'
// hooks
import { useCollection } from '../../hooks/useCollection'
import Avatar from '../Avatar/Avatar'
export default function UsersList() {
    const { documents, error } = useCollection('userData');
    return (
        <div className='user-list'>
            <h2>All Users</h2>
            { documents && documents.map((user) => (
                <div key={user.id} className='user-list-item'>
                     <span className='online-user' style={user.online === true ? {backgroundColor: 'green'} : {backgroundColor: 'black'}}></span>
                    <span>{user.dispayName}</span>
                    <Avatar imgSrc={user.photoURL}/>
                </div>
            ))}
            { error && <div>{error}</div>}
        </div>
    )
}
