import './App.css';
import TeaSubscriptionContainer from '../TeaSubscriptionContainer/TeaSubscriptionContainer'
import TeaSubscriptionDetails from '../TeaSubscriptionDetails/TeaSubscriptionDetails'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import teacupIcon from '../icons/teacup.png'

function App() {
    const [teaSubs, setTeaSubs] = useState([])
    const [allTeas, setAllTeas] = useState([]) //storing all tea data
    const [filteredTeas, setFilteredTeas] = useState([]) // storing filtered teas
    const [selectedTea, setSelectedTea] = useState('') // state for selected tea
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const showHomeIcon = location.pathname !== '/'

    useEffect(() => {
        displayTeaSubs()
        fetchTeas()
    }, [])

    // fetch Subscription Plans
    function displayTeaSubs() {
        fetch('http://localhost:3000/api/v1/subscription_plans')
            .then((response) => response.json())
            .then((data) => {
                setTeaSubs(data.data)
                setFilteredTeas(data.data) // initially set to all teas
            })
            .catch((err) => {
                console.log('Error:', err)
                setError(err)
            })
    }

    // fetch all teas
    function fetchTeas() {
        fetch('http://localhost:3000/api/v1/teas')
            .then((response) => response.json())
            .then((data) => {
                setAllTeas(data.data) // store all teas in state
            })
            .catch((err) => {
                console.log('Error:', err)
                setError(err)
            })
    }

    // handle filtering option
    const handleTeaFilterChange = (e) => {
        const selectedTeaId = e.target.value
        setSelectedTea(selectedTeaId)

        if (selectedTeaId) {
            const filteredSubs = teaSubs.filter((sub) =>
                sub.relationships.teas.data.some((tea) => tea.id === selectedTeaId)
            )
            setFilteredTeas(filteredSubs)
        } else {
            setFilteredTeas(teaSubs) // if no filter, show all subscriptions
        }
    }

    // create array of unique tea ids
    const uniqueTeas = []
    teaSubs.forEach((sub) => {
        sub.relationships.teas.data.forEach((tea) => {
            if (!uniqueTeas.some((existingTea) => existingTea.id === tea.id)) {
                uniqueTeas.push(tea)
            }
        })
    })

    return (
        <main className="App">
            <header>
                <h1>
                🫖 Kettle On Tea Subscriptions 🫖
                </h1>
                {showHomeIcon && (
                        <button onClick={() => navigate('/')} className="home-button">
                            <img src={teacupIcon} alt="Teacup Icon" />
                        </button>
                    )}
            </header>
            {error && <div className="error-message">{error.message}</div>}
            {location.pathname === '/' && (
                <div>
                    <label htmlFor="teaFilter">Filter Subscriptions by Tea:</label>
                    <select
                        id="teaFilter"
                        value={selectedTea}
                        onChange={handleTeaFilterChange}
                    >
                        <option value="">All Teas</option>
                        {uniqueTeas.map((tea) => {
                            const fullTea = allTeas.find((t) => t.id === tea.id)
                            const teaTitle = fullTea ? fullTea.attributes.title : "Unknown Tea"

                            return (
                                <option key={tea.id} value={tea.id}>
                                    {teaTitle}
                                </option>
                            )
                        })}
                    </select>
                </div>
            )}

            {/* Routes */}
            <Routes>
                <Route path="/" element={<TeaSubscriptionContainer teaSubs={filteredTeas} />} />
                <Route path="/:id" element={<TeaSubscriptionDetails />} />
            </Routes>
        </main>
    )
}

export default App


