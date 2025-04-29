import './TeaSubscriptionContainer.css'
import TeaSubscriptions from '../TeaSubscriptions/TeaSubscriptions'

function TeaSubs( {teaSubs}) {
    const teaSubsData = teaSubs.map(sub => {
    return (
        <TeaSubscriptions
            title={sub.attributes.title} 
            // images={sub.attributes.tea.image}
            // will have to add images to backend and seed data
            />
    )   
    })

    return (
        <section className='TeaSubscriptionContainer' >
            {teaSubs}
        </section>
    )
}
export default TeaSubs