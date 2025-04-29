import './TeaSubscriptionDetails.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function TeaSubscriptionDetails(){
    const [subDetails, setSubDetails] = useState(null) 
    const subscriptionId = useParams().id

    useEffect(() => {
        displaySubDetails(subscriptionId)
    },[])

    function displaySubDetails(id) {
        console.log('clicked')
        fetch(`http://localhost:3000/api/v1/subscription_plans/${id}`)
        .then((response )=> response.json())
        .then((data) => setSubDetails(data))
        .catch((err) => console.log("Error:", err))
    }

    // subscription info
    const subscription = subDetails?.data?.attributes
    const title = subscription?.title
    const price = subscription?.price
    const frequency = subscription?.frequency
    const image = subscription?.image_url

    // tea info
    const teas = subDetails?.included?.filter(item => item.type === 'tea')

    const teaDetails = teas.map(tea => ({
    title: tea.attributes.title,
    description: tea.attributes.description,
    image: tea.attributes.image_url
    }))

    //customer info
    const customers = subDetails?.included?.filter(item => item.type === 'customer')

    const customerNames = customers.map(customer => ({
    fullName: `${customer.attributes.first_name} ${customer.attributes.last_name}`,
    }))

    return (
        <div className="subscription-details">
          <h2>{title}</h2>
          {image && <img src={image} alt={title} className="subscription-image" />}
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>Frequency:</strong> {frequency}</p>
      
          <h3>Teas in this Subscription:</h3>
          <ul className="tea-list">
            {teaDetails.map((tea, index) => (
              <li key={`tea-${index}`} className="tea-item">
                <strong>{tea.title}</strong>: {tea.description}
                {tea.image && <img src={tea.image} alt={tea.title} className="tea-image" />}
              </li>
            ))}
          </ul>
      
          <h3>Customers:</h3>
          <ul className="customer-list">
            {customerNames.map((customer, index) => (
              <li key={`customer-${index}`}>
                {customer.fullName}
              </li>
            ))}
          </ul>
        </div>
    )
}
export default TeaSubscriptionDetails