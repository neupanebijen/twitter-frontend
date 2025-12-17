import TweetContainer from './TweetContainer.jsx'
import styled from 'styled-components'
import { color } from '../style.js'
import { useState, useEffect } from 'react'
import { getUserTweets } from '../../Services/tweetApi'

const StyledTweetList = styled.div `
	border-top: 1px solid ${color.shade_border}; 
	display: flex; 
	flex-direction : column;
`

const TweetList = ({ userId, tweets, tweetFunctions }) => {
    let tweetList = tweets.map((tweet,index) => {

    	return <TweetContainer userId={userId} tweet={tweet} tweetFunctions={tweetFunctions} key={Math.random()}/>
    })

    return (
        <StyledTweetList>
			{tweetList}
		</StyledTweetList>
    )
}

export default TweetList