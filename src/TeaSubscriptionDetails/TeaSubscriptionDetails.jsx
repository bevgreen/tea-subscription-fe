import './TeaSubscriptionDetails.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function TeaSubscriptionDetails() {
  const [subDetails, setSubDetails] = useState(null)
  const subscriptionId = useParams().id

  useEffect(() => {
    displaySubDetails(subscriptionId)
  }, [subscriptionId])

  function displaySubDetails(id) {
    fetch(`http://localhost:3000/api/v1/subscription_plans/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSubDetails(data)
      })
      .catch((err) => console.error('Error fetching subscription:', err))
  }

  if (!subDetails) {
    return <p>Loading subscription details...</p>
  }

  const subscription = subDetails?.data?.attributes
  const title = subscription?.title
  const price = subscription?.price
  const frequency = subscription?.frequency
  const image = subscription?.image_url

  const teas = subDetails?.included?.filter((item) => item.type === 'tea')
  const teaDetails = teas.map((tea) => ({
    title: tea.attributes.title,
    description: tea.attributes.description,
    image: tea.attributes.image_url,
  }))

  const customers = subDetails?.included?.filter(
    (item) => item.type === 'customer' && item.attributes?.first_name && item.attributes?.last_name
  )

  function toggleSubscriptionStatus(customerSubscriptionId, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'

    // Make the PATCH request to update the status of the customer subscription
    fetch(`http://localhost:3000/api/v1/customer_subscriptions/${customerSubscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_subscription: {
          status: newStatus, // send the new status 
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the new subscription status
        const updatedIncluded = subDetails.included.map((item) => {
          if (item.type === 'customer_subscription' && item.id === customerSubscriptionId) {
            return {
              ...item,
              attributes: {
                ...item.attributes,
                status: newStatus,
              },
            }
          }
          return item
        })

        setSubDetails({
          ...subDetails,
          included: updatedIncluded,
        })
      })
      .catch((err) => {
        console.error('Error updating status:', err)
      })
  }

  return (
    <div className="subscription-details">
      <h2>{title}</h2>
      {image && <img src={`http://localhost:3000${image}`} alt={title} className="subscription-image" />}
      <p>
        <strong>Price:</strong> ${parseFloat(price).toFixed(2)}
      </p>
      <p>
        <strong>Frequency:</strong> {frequency}
      </p>

      <h3>Teas in this Subscription 🍵:</h3>
      <ul className="tea-list">
        {teaDetails.map((tea, index) => (
          <li key={`tea-${index}`} className="tea-item">
            <strong>{tea.title}</strong>: {tea.description}
            {tea.image && <img src={`http://localhost:3000${tea.image}`} alt={tea.title} className="tea-image" />}
          </li>
        ))}
      </ul>

      <h3>Customers:</h3>
      <ul className="customer-list">
        {customers.length > 0 ? (
          customers.map((customer, index) => {
            const customerSubscription = subDetails.included.find(
              (item) =>
                item.type === 'customer_subscription' &&
                item.relationships?.customer?.data?.id === customer.id
            )

            const customerSubscriptionId = customerSubscription?.id
            const status = customerSubscription?.attributes?.status || 'inactive'

            return (
              <li key={`customer-${index}`}>
                <span>{`${customer.attributes.first_name} ${customer.attributes.last_name}`}</span>
                <button onClick={() => toggleSubscriptionStatus(customerSubscriptionId, status)}>
                  {status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </li>
            )
          })
        ) : (
          <li>No customers found for this subscription</li>
        )}
      </ul>
    </div>
  )
}

export default TeaSubscriptionDetails
