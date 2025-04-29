import './App.css'
import TeaSubscriptionContainer from '../TeaSubscriptionContainer/TeaSubscriptionContainer'
import TeaSubscriptionDetails from '../TeaSubscriptionDetails/TeaSubscriptionDetails'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

function App() {
    const [teaSubs, setTeaSubs] = useState([])
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const showHomeIcon = location.pathname !== '/'
    
    function goHome(){
        // navigate('/') lets put this in container
    }
    
    useEffect(() => {
        displayTeaSubs()
    },[])

    function displayTeaSubs(){
        fetch(`http://localhost:3000/api/v1/subscription_plans`)
        .then((response) => response.json())
        .then((data) => setTeaSubs(data))
        .catch((err) => setError(err))
    }

    return (
        <main className='App'>
            <header>
                <h1>
                    kettle on tea subscriptions
                </h1>
            </header>
            {error && (
            <div className="error-message">
            {error.message}
            </div>
        )}
        <Routes>
            <Route path='/' element={ <TeaSubscriptionContainer teaSubs={teaSubs} /> } />
            <Route path="/:id" element={ <TeaSubscriptionDetails />} />
        </Routes>
        </main>
    )
}