import {Switch, Route} from 'react-router-dom'
import styled from 'styled-components'
import Home from './Home.jsx'
import Explore from './Explore.jsx'
import Bookmarks from './Bookmarks.jsx'
import Profile from './Profile.jsx'
import {color, device} from '../style.js'

const MainContainer = styled.div`
	width: 60rem;
	background: ${color.secondary}; 
	color: ${color.tertiary}; 
	position: relative; 
	overflow-x : hidden;
	
	@media ${device.mobileLMax} {
		width: 100vw;
		height: calc(var(--vh) * 93);
	}
`

const Main = ({userId, userData, tweets, tweetFunctions}) =>  {
	return(
		<MainContainer>
			<Switch>
				<Route path='/' exact render={() => <Home userId={userId} tweets={tweets} tweetFunctions={tweetFunctions}/> } />
				<Route path='/explore' render={() => <Explore userId={userId}  tweetFunctions={tweetFunctions}/> } />
				<Route path='/bookmarks' exact  render={() => <Bookmarks userId={userId} userData={userData} tweetFunctions={tweetFunctions}/> }/>
				<Route path='/profile' exact render={() => <Profile userData={userData} tweets={tweets} tweetFunctions={tweetFunctions}/>}  />
			</Switch>
		</MainContainer>
	)
}

export default Main