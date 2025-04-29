import './TeaSubscriptionContainer.css'
import { Link } from 'react-router-dom'

function TeaSubscription({title}) {
    return (
        <div className='TeaSubscription'>
            <Link to={`/${id}`}>
                <img className = "TeaSubscriptionImg" src = {image} alt = {title} />
            </Link>
        </div>
    )
}
export default TeaSubscription