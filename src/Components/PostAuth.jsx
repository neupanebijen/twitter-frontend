import styled from 'styled-components'
import {useState, useEffect} from 'react' 
import Main from './Main'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {color, device} from './style.js'
import {PopupTweet} from './ComponentModels/Tweet.jsx'
import {getUserTweets, deleteTweet, likeTweet, unlikeTweet, retweet as retweetTweet, unretweet as unretweetTweet} from '../Services/tweetApi'
import {saveTweet, getFeedTweet, followUser, unfollowUser} from '../Services/userApi'
import ClipLoader from "react-spinners/ClipLoader"

const Container = styled.div`
	display: flex; 
	position: relative;
	overflow: auto; 
	background: ${color.secondary}; 	
  height: calc(var(--vh,1vh) * 100);
	color: ${color.tertiary}; 

  @media ${device.mobileLMax} {
    display: relative;
  }
`

const LoaderContainer = styled.div`
  position: fixed; 
  top: 40%;
  left: 45%;
  width: 10rem;
  height: 5rem;
  z-index: 100;
  font-size: 2rem;
`

const PostAuth = ({userData, logout}) => {
	const {username} = userData
	const [showTweet, setShowTweet] = useState(false)
	const [tweets, setTweets] = useState([])
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
    
    // Fetch all the tweets of the given user
    useEffect(() => {
       	const fetchData = async () => {
          try{
            const result = await getFeedTweet(userData._id)
            setTweets(result)
            setIsLoading(false)
          } catch(e) {
            console.error(e)
          }
        }
        setIsLoading(true)
       	fetchData()
    }, [index])   
    

    const tweetFunctions = {
      userId: userData._id,
      username: username,
      reload:() => {
        const currentUrl = window.location.pathname
        const urlToCheck = currentUrl.split('/')
        setIsLoading(true)
        setTimeout(() => {
          setIndex(index + 1)
          setIsLoading(false)
        },1000)
      },
    	deleteTweet: async (tweetId) => {
    		try {
    			const deleteResult = await deleteTweet(tweetId)
    			if(deleteResult){
    				const tweetsTemp = tweets.filter(tweet => tweet._id !== tweetId)
    				setTweets(tweetsTemp)
    			}					
    		} catch(e) {
    			console.error(e)
    		}
    	},
      // reloadChild: () => {
      //   setIndex(index + 1) 
      // },
      getIndex: () => {
        return index
      },
      // using the userData._id as tweets need to be saved to the current user
    	saveTweet: async (tweetId,userId) => {
    		try{
    			const saveResult = await saveTweet(tweetId, userData._id)
    		} catch(e) {
    			console.error(e)
    		}
    	},
      likeTweet: async(tweetId) => {
        try{
          const likeResult = await likeTweet(userData._id, tweetId)
        } catch(e){
          console.error(e)
        }
      },
      unlikeTweet: async(tweetId) => {
        try{
          const unlikeResult = await unlikeTweet(userData._id, tweetId)
        } catch(e) {
          console.error(e)
        }
      }, 
      retweet: async (userId, tweetId) => {
        try{
          const retweet = await retweetTweet(userId, tweetId)
        } catch(e) {
          console.error(e)
        }
      },
      unretweet: async (userId, tweetId) => {
        try{
          const unretweet = await unretweetTweet(userId, tweetId)
        } catch(e) {
          console.error(e)
        }
      },
      follow: async(targetUserId) =>{
        try{
          const followResult = await followUser(userData._id, targetUserId)
          return followResult
        }catch(e) {
          console.error(e)
        }
      },
      unfollow: async(targetUserId) =>{
        try{
          const followResult = await unfollowUser(userData._id, targetUserId)
          return followResult
        }catch(e) {
          console.error(e)
        }
      },
      isFollowing: (targetUserId) => {
        return userData.following.includes(targetUserId)
      }
    }

	return (
		<>
			    <Container> 	
	        	<Navbar setShowTweet={setShowTweet} username={userData.username} logout={logout}/>
			     	<Main userId={userData._id} userData={userData} tweets={tweets} tweetFunctions={tweetFunctions}/>
	        	<Sidebar />
	        </Container> 
	        {showTweet ? <PopupTweet setShowTweet={setShowTweet} userId={userData._id} tweetFunctions={tweetFunctions}/> : null}     
		      {isLoading? <LoaderContainer><ClipLoader color={color.tertiary} /></LoaderContainer>: null}
    </>
	)
}

export default PostAuth