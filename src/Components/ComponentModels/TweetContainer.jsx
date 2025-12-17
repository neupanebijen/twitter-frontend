import {useState, useEffect, useReducer} from 'react'
import {color} from '../style.js'

import {UserId, UserName, UserContainer, StyledTweetContainer,ButtonWrapper, StyledTweetContainerCore, TweetText, TweetImage, TweetImageContainer, TweetUtils, Button, TweetInfoContainer,iconStyle, PopupButton, PopUpContainer} from './TweetContainerStyles.jsx'
import UserImage from './UserImage.jsx'

import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RotateRightOutlinedIcon from '@material-ui/icons/RotateRightOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import SettingsIcon from '@material-ui/icons/Settings'

import TweetExtended from './TweetExtended.jsx'


const User = ({username, fullname}) => {
	return(
		<UserContainer>
			<UserName>{fullname}</UserName>
			<UserId>{username}</UserId>
		</UserContainer>
	)
}

const UserPopup = ({tweetId, tweetFunctions, closePopup, userId}) => {
	const clickListener = e => {
    	closePopup(true)
    }

    useEffect(() => {
        // Attach the listeners on component mount.
        document.addEventListener('click', clickListener)
        // Detach the listeners on component unmount.
        return () => {
            document.removeEventListener('click', clickListener)
        }
    }, [])

	return(
		<PopUpContainer>
			<PopupButton onClick={() => {tweetFunctions.saveTweet(tweetId); closePopup()}} className="inner_icon">Save Tweet</PopupButton>
			<PopupButton onClick={() => {tweetFunctions.deleteTweet(tweetId); tweetFunctions.reload();closePopup()}} className="inner_icon">Delete Tweet</PopupButton>
		</PopUpContainer>
	)
}

const TweetContainer = ({tweet, tweetImageSrc, tweetFunctions}) => {
	const [showSettings, setShowSettings] = useState(false)
	const [showTweetExtended, setShowTweetExtended] = useState(false)

	const checkSource = () => {
		if((typeof tweet.post).toString() === 'undefined'){
			return false
		}else {
			return true
		}
	}

	// Need to replace this
	const flag = checkSource()
	const tweetId = flag ? tweet.post._id : tweet._id
	const userId = flag ? tweet._id : tweet.user._id
	const username = flag ? tweet.username : tweet.user.username
	const tweetText = flag? tweet.post.text : tweet.text
	const [likes,setLikes] = useState(flag ? tweet.post.likes : tweet.likes)
	const [likeCount,setLikeCount] = useState(flag ? tweet.post.likeCount : tweet.likeCount)
	const [commentCount,setCommentCount] = useState(flag ? tweet.post.commentCount : tweet.commentCount)
	const [retweets,setRetweets] = useState(flag? tweet.post.retweets : tweet.retweets)
	const [retweetCount, setRetweetCount] = useState(flag ? tweet.post.retweetCount : tweet.retweetCount)

	const tweetInfo = {
		tweetId,
		userId,
		username, 
		tweetText,
		likes,
		likeCount, 
		commentCount,
		retweets, 
		retweetCount,
		imageSrc: tweetImageSrc,
	}

	const containerClicked = e => {
		if(e.target.classList.contains("inner_icon")){
			return
		}
		setShowTweetExtended(true)
	}

	const colorNormal = {
		color: color.tertiary_shade
	}

	const colorActive = {
		color: color.primary
	}


	// Like Button logic (can componentalize this)
	const isLiked = () => {
		if(likes.includes(tweetFunctions.userId)){
			return true	
		}
		return false
	}

	const [likeStyle, setLikeStyle] = useState(() => {
		if(isLiked()) {
			return colorActive
		}
		return colorNormal
	})

	const likeButtonClicked = () => {
		if(isLiked()){
			tweetFunctions.unlikeTweet(tweetId)
			setLikeStyle(colorNormal)	
			setLikeCount(likeCount - 1)
			setLikes(likes.filter(like => like !== tweetFunctions.userId))	
		}else{
			tweetFunctions.likeTweet(tweetId); 
			setLikeCount(likeCount + 1)
			setLikeStyle(colorActive)	
			let tempArray = likes
			tempArray.push(tweetFunctions.userId)
			setLikes(tempArray)
		}
	}

	// For retweets 
	const isRetweeted = () => {
		if(retweets.includes(tweetFunctions.userId)){
			return true	
		}
		return false
	}

	const [retweetStyle, setRetweetStyle] = useState(() => {
		if(isRetweeted()) {
			return colorActive
		}
		return colorNormal
	})

	// Assigning functions for tweetExtended Buttons
	tweetFunctions['likeButtonClicked'] = () => {
		likeButtonClicked()
	}

	tweetFunctions['retweetButtonClicked'] = () => {
		retweetButtonClicked()
	}
	const retweetButtonClicked = () => {
		if(isRetweeted()){
			tweetFunctions.unretweet(tweetFunctions.userId, tweetId)
			setRetweetStyle(colorNormal)	
			setRetweetCount(retweetCount - 1)
			setRetweets(retweets.filter(retweet => retweet !== tweetFunctions.userId))	
		}else{
			tweetFunctions.retweet(tweetFunctions.userId, tweetId); 
			setRetweetCount(retweetCount + 1)
			setRetweetStyle(colorActive)	
			let tempArray = retweets
			tempArray.push(tweetFunctions.userId)
			setRetweets(tempArray)
		}
	}

	tweetFunctions.likeButtonClicked = () => {likeButtonClicked()}
	tweetFunctions.retweetButtonClicked = () => {retweetButtonClicked()}
	tweetFunctions.setCommentCount = (value) => {
		setCommentCount(commentCount + value)

	}
	return(
		<>
		<StyledTweetContainer onClick={(e) => containerClicked(e)}>
			<UserImage width="50px" height="50px" /> 
			<StyledTweetContainerCore>
				<TweetInfoContainer> 
					<User username={`@${username}`} fullname={`${username}`}  />
					{showSettings ? <UserPopup tweetId={tweetId} userId={userId}tweetFunctions={tweetFunctions} closePopup={() => setShowSettings(false)}/> : null} 
					<ButtonWrapper className="inner_icon" onClick={() => setShowSettings(!showSettings)}>
						<SettingsIcon style={iconStyle} />
					</ButtonWrapper>
				</TweetInfoContainer> 
				<TweetText>{tweetText}</TweetText>
				{tweetImageSrc ? <TweetImageContainer><TweetImage src={tweetImageSrc} alt="Image" /></TweetImageContainer> : null}
				<TweetUtils>
					<Button style={{color: color.tertiary_shade}}><ChatBubbleOutlineIcon style={iconStyle}/> {commentCount|| 0 } </Button>
					<Button className="inner_icon" style={retweetStyle} onClick={() => retweetButtonClicked()}><RotateRightOutlinedIcon style={iconStyle}/> { retweetCount|| 0 }</Button>
					<Button className="inner_icon" style={likeStyle} onClick={() => likeButtonClicked()}><FavoriteBorderOutlinedIcon style={iconStyle}/> {likeCount  ||0}</Button>
				</TweetUtils>
			</StyledTweetContainerCore>
		</StyledTweetContainer>
		{showTweetExtended ? <TweetExtended  tweetFunctions={tweetFunctions}tweet={tweetInfo} setShowPopup={() => {setShowTweetExtended(false)}}/> : null}
		</>
	)
}

export default TweetContainer