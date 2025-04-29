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
        navigate('/')
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
    
}