import Title from '../ComponentModels/Title.jsx'
import styled from 'styled-components'
import { color, device } from '../style.js'
import SearchIcon from '@material-ui/icons/Search'
import { useState, useEffect } from 'react'
import { searchByTag } from '../../Services/tweetApi.js'
import { searchUser } from '../../Services/userApi.js'

import TweetList from '../ComponentModels/TweetList.jsx'
import UserList from '../ComponentModels/UserList.jsx'

const EmptyText = styled.p `
	display: flex; 
	justify-content: center; 
	margin-top: 2rem;
	font-size: 2rem;
`

const SearchBarContainer = styled.div `
	width: 90%;
	margin: 2rem auto; 
	background: ${color.secondary_shade};
	border-radius: 2rem;
	display: flex; 
	align-items: center;
	padding: .3rem 2rem;

	@media ${device.mobileLMax} {
		width: 90%;
		margin-left: 0; 
	}
`

const SearchBar = styled.input `
	font-size: 2.2rem;
	color: ${color.tertiary};
	padding: 1rem;
	background: ${color.secondary_shade};
	border-radius: 2rem;
	border: none;
	&:focus{
		outline: none;
	}
	flex: 1;
`

const Button = styled.div `
	background: ${color.secondary_shade};
	font-size: 2rem;
	border-radius: 2rem;
	cursor: pointer;
	font-weight: bold;
	border: none;
	display: flex; 
	align-items: center; 
	justify-content: flex-start;
	padding: 1.2rem;
	gap: 1.2rem;
	&:hover{
		color: ${color.primary_shade};
		background: ${color.secondary_shade}; 
	}
	&:focus {
		outline: none;
	}
`

const iconStyle = {
    fontSize: "3rem",
    pointerEvents: "none",
    cursor: "pointer"
}

const Explore = ({userId,  tweetFunctions}) => {
    const [searchText, setSearchText] = useState('')
    const [tweets, setTweets] = useState([])
    const [users, setUsers] = useState([])

    const searchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    const searchPressed = async () => {
        const result = await searchByTag(searchText.toLowerCase())

        const userResult = await searchUser(searchText)
        
        setUsers(userResult)

        const savedTweetsTemp = result.map((tweet) => {
            tweet['user'] = 	{
                username: tweet.user.username
            }
            return tweet
        })
        setTweets(savedTweetsTemp)
        setSearchText('')
    }

    return ( 
    	<>
        <Title titleText="Explore" /> 
        <SearchBarContainer >
        	<SearchBar autoFocus={window.innerWidth < 1024 ? false: true} placeholder="Search" value={searchText} onKeyPress={(e) => e.key === 'Enter' ? searchPressed() : null}onChange={e => searchTextChange(e)}/> <
        Button onClick = {
            () => searchPressed() } > <SearchIcon style={iconStyle}/> < /Button> <
        /SearchBarContainer>  
        { tweets.length === 0 && users.length === 0 ? <EmptyText>No Search Result Found</EmptyText> 
        	:<> <UserList users={users} tweetFunctions={tweetFunctions}/> 
        		<TweetList userId={userId} tweets = {tweets} tweetFunctions={tweetFunctions}/>
        	</>
        }
        </>
    )
}

export default Explore