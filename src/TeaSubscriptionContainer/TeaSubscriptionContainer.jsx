import './TeaSubscriptionContainer.css'
import TeaSubscriptions from '../TeaSubscriptions/TeaSubscriptions'

function TeaSubs( {teaSubs}) {
    const teaSubsData = teaSubs.map(sub => {
    return (
        <TeaSubscriptions
            title={sub.attributes.title} 
            image={sub.attributes.image_url}
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