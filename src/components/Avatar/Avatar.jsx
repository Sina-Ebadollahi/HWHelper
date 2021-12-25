
// stlyes
import './Avatar.css'

export default function Avatar({ imgSrc }) {
    return (
        <div className='avatar'>
            <img src={imgSrc} alt="user Avatar" />
        </div>
    )
}
