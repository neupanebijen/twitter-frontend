import {useState} from 'react' 
import { BrowserRouter as Router} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import PostAuth from './Components/PostAuth.jsx'
import PreAuth from './Components/PreAuth.jsx'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)	
    const [userData, setUserData] = useState([])
    const [index, setIndex] = useState(0)

    const login = data => {
    	if(data) {
    		setUserData(data)
    		setIsLoggedIn(true)
    	}
    }

    return (
        <Router className="app">
        	<Helmet>
        		<title>Twitter</title>
        	</Helmet>
	        {isLoggedIn 
	        	? <PostAuth userData={userData} refresh={() => {console.log(index); setIndex(index + 1)}} logout={() => setIsLoggedIn(false)}/> 
	        	: <PreAuth login={login}/>  
	        }
    	</Router>
    );
}

export default App;