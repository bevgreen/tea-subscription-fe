import './TeaSubscriptionContainer.css'
import TeaSubscriptions from '../TeaSubscriptions/TeaSubscriptions'

function TeaSubs( {teaSubs}) {
    const teaSubsData = teaSubs.map(sub => {
    return (
        <TeaSubscriptions
            key={sub.id}
            title={sub.attributes.title} 
            image={`http://localhost:3000${sub.attributes.image_url}`}
            id={sub.id}
            />
    )   
    })

    return (
        <section className='TeaSubscriptionContainer' >
            {teaSubsData}
        </section>
    )
}
export default TeaSubs