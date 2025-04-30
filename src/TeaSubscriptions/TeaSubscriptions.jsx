import './TeaSubscriptions.css'
import { Link } from 'react-router-dom'

function TeaSubscriptions({ title, image, id }) {
  return (
    <div className="TeaSubscription">
      <Link to={`/${id}`}>
        <img className = "TeaSubscriptionImg" src = {image} alt={title} />
      </Link>
      <h3>{title}</h3>
    </div>
  )
}

export default TeaSubscriptions
