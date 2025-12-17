import {useState, useEffect} from 'react'
import TweetList from '../../ComponentModels/TweetList.jsx'
import {getLikedTweets} from '../../../Services/tweetApi'

const LikedTweets = ({userId, tweetFunctions}) => {
	const [tweets, setTweets] = useState([])
    
    // Fetch all the tweets of the given user
    useEffect(() => {
       	const fetchData = async () => {
          try{
            const result = await getLikedTweets(userId)
            setTweets(result)
          } catch(e) {
            console.error(e)
          }
        }

       	fetchData()
    }, [])   
    return(
    	<TweetList userId={userId} tweets={tweets} tweetFunctions={tweetFunctions}/> 
    )
}

export default LikedTweets