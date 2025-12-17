import Title from '../ComponentModels/Title.jsx'
import {Tweet} from '../ComponentModels/Tweet.jsx'
import TweetList from '../ComponentModels/TweetList.jsx'
import {getSavedTweets} from '../../Services/userApi'
import {useState,useEffect} from 'react'
import styled from 'styled-components'

const EmptyText = styled.p`
	display: flex; 
	justify-content: center; 
	margin-top: 2rem;
	font-size: 2rem;
`

const Bookmarks = ({userId, userData, tweets, tweetFunctions}) => {
	const [savedTweets, setSavedTweets] = useState([])
	useEffect(() => {
		const fetchData = async() => {
			const data = await getSavedTweets(userId)
			setSavedTweets(data.savedPosts)
		}
		fetchData()
	}, [])
	return(
		<>
			<Title titleText="Bookmarks" />
			{savedTweets.length === 0 ? <EmptyText>No Bookmarks</EmptyText> : <TweetList userId={userId} tweets={savedTweets} tweetFunctions={tweetFunctions}/> }
		</>
	)
}

export default Bookmarks