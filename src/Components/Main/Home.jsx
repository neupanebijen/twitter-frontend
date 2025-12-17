import styled from 'styled-components'
import {color, device} from '../style.js'
import Title from '../ComponentModels/Title.jsx'
import {Tweet} from '../ComponentModels/Tweet.jsx'
import TweetList from '../ComponentModels/TweetList.jsx'

const HomeTweet = styled.div`
	padding: 0 2rem; 
	border-bottom: 1px solid ${color.shade_border};

	@media ${device.mobileLMax} {
		display: none;	
	}
`

const Break = styled.div`
	height: 1rem; 
	width: 100%;
	background: ${color.shade};

	@media ${device.mobileLMax} {
		display: none;	
	}
`

const Home = ({userId,tweets, tweetFunctions}) => {
	return(
		<>
			<>
				<Title titleText="Home" />
				<HomeTweet>
					<Tweet userId={userId} tweetFunctions={tweetFunctions}/> 
				</HomeTweet> 
				<Break /> 
				<TweetList userId={userId} tweets={tweets} tweetFunctions={tweetFunctions}/>
			</>
		</>
	)
}

export default Home