import {useState, useEffect} from 'react'
import TweetList from '../../ComponentModels/TweetList.jsx'
import {getUserTweets} from '../../../Services/tweetApi'

const ProfileTweets = ({userId, tweetFunctions}) => {
	const [tweets, setTweets] = useState([])
    
    // Fetch all the tweets of the given user
    useEffect(() => {
       	const fetchData = async () => {
          try{
            const result = await getUserTweets(userId)
            setTweets(result)
          } catch(e) {
            console.error(e)
          }
        }

       	fetchData()
    }, [tweetFunctions.getIndex()])   
    return(
    	<TweetList userId={userId} tweets={tweets} tweetFunctions={tweetFunctions}/> 
    )
}

export default ProfileTweets