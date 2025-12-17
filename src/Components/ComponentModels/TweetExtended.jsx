import UserImage from '../ComponentModels/UserImage.jsx'
import styled from 'styled-components'
import { color, device } from '../style.js'
import { useState,useEffect } from 'react'
import {PopupWrapper, PopupContainer} from './Popup.jsx'
import {ClosePopupContainer, ClosedButton, iconStyle} from './TweetStyles.jsx'
import CloseIcon from '@material-ui/icons/Close'
import {UserId, UserName, UserContainer,TweetImage, TweetImageContainer,TweetUtils,Button} from './TweetContainerStyles.jsx'
import {TweetButton} from './Button.jsx'

import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RotateRightOutlinedIcon from '@material-ui/icons/RotateRightOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'

import {addComment, getComments, deleteComment} from '../../Services/commentApi'

const StyledTweetContainer = styled.div`
	padding: 2rem;
	display: flex; 
	color: ${color.tertiary_text};
	width: 60rem;
	border-bottom: 1px solid ${color.shade_border};

	@media ${device.mobileLMax} {
		width: 100vw;	
	}
`

const StyledTweetContainerCore = styled.div`
	padding: 0 .5rem 0 1.2rem;
	flex: 1;
`

const ExtendedTweetUtils = styled(TweetUtils)`
	margin-top: 3rem;
`

const CommentArea = styled.textarea`
	color: ${color.tertiary};
	background: ${color.secondary};
	font-size: 2.5rem;
	padding: 1rem;
	border: none; 
	border-bottom: 1px solid ${color.tertiary_shade}; 
	height: auto; 
	overflow: auto;  
	outline: none;
	width: 100%;
	padding: 1.6rem 1rem;
	&:focus{
		outline: none;
	}

	&::placeholder{
		color: ${color.tertiary_shade};
	}
`

const TweetText = styled.p`
	font-size: 2.4rem;
	line-height: 2.3rem;
	margin-top: 1rem;
	min-height: 2rem;
	max-width: 80rem;
	word-wrap: break-word;

	@media ${device.mobileLMax} {
		max-width: 100%;
	}
`

const CommentButton = styled(TweetButton)`
	width: 15rem;
`

const ClosePopup =({setShowPopup}) => {
	return(
		<ClosePopupContainer>
			<ClosedButton onClick={() => setShowPopup()}><CloseIcon style={{fontSize: "3rem"}}/></ClosedButton>
		</ClosePopupContainer>
	)
}

const User = ({username, fullname}) => {
	return(
		<UserContainer>
			<UserName>{fullname}</UserName>
			<UserId>{username}</UserId>
		</UserContainer>
	)
}

const StyledCommentContainer = styled.div`
	width: 100%;
	font-size: 2rem;
	position: relative;
	padding: 0 0 0 1rem;
`

const DeleteComment = styled.button`
	position: absolute; 
	right: 0; 
	top: 10%;
	background: none;
	border: none; 
	border-radius: 20rem;
	color: ${color.primary};
	cursor: pointer; 
	&:hover{
		color: ${color.primary_shade};
		background: ${color.secondary_shade}
	}
`

const CommentHeadingContainer = styled.div`
	display: flex; 
`

const UltimateContainer = styled.div`
	display: flex; 
	margin: 4rem 0 0 0; 
`

const TweetExtendedContainer = ({tweet,setShowPopup,tweetFunctions}) => {
	const [commentText, setCommentText] = useState('')
	const [comments, setComments] = useState([])

	const clickListener = e => {
    	if(e.target.closest('.popupWrapper')){
    		setShowPopup(false)
    	}
    }

    const handleCommentClick = async () => {
    	if(!commentText || commentText == 'Enter a valid Comment'){
    		setCommentText('Enter a valid Comment')
    		return 
    	}

    	const result = await addComment(tweetFunctions.userId, tweet.tweetId, commentText)

    	setComments([{_id: Math.random(), user:{username: tweetFunctions.username}, text: commentText},...comments])
    	setCommentText('')
    	tweetFunctions.setCommentCount(1)
    	tweetFunctions.reload()
    }


	useEffect(() => {
		const fetchData = async () => {
			const result = await getComments(tweet.tweetId)
			setComments(result)
		}

		fetchData()
        // Attach the listeners on component mount.
        document.addEventListener('click', clickListener)
        // Detach the listeners on component unmount.
        return () => {
            document.removeEventListener('click', clickListener)
        }
    }, [])

    const commentDelete = async (commentId) => {
    	const result = await deleteComment(tweet.tweetId, commentId)
    	if(result) {
    		const newCommentList = comments.filter((comment) => comment._id !== commentId)
    		setComments(newCommentList)
    		tweetFunctions.reload()
    	}
    } 
    
    console.log(window.innerWidth)
	// Add image src later
	return(
		<>
			<PopupWrapper /> 
			<PopupContainer>
				<ClosePopup setShowPopup={setShowPopup}/> 
				<StyledTweetContainer>
					<UserImage width="80px" height="80px" /> 
					<StyledTweetContainerCore>
						<User username={`@${tweet.username}`} fullname={`${tweet.username}`}  />
						<TweetText>{tweet.tweetText}</TweetText>
						<ExtendedTweetUtils>
							<Button>
								<ChatBubbleOutlineIcon style={iconStyle}/> {tweet.commentCount } 
							</Button>
							<Button onClick={() =>{tweetFunctions.retweetButtonClicked()}}>
								<RotateRightOutlinedIcon style={iconStyle}/> {tweet.retweetCount}
							</Button>
							<Button onClick={() =>{tweetFunctions.likeButtonClicked()}}>
								<FavoriteBorderOutlinedIcon style={iconStyle}/> {tweet.likeCount}
							</Button>
						</ExtendedTweetUtils>
					</StyledTweetContainerCore>
				</StyledTweetContainer>
				<CommentArea  maxLength="148" autoFocus={window.innerWidth < 1024 ? false: true } rows={1} value={commentText} onChange={(e) => setCommentText(e.target.value)}placeholder="Comment"/> 
				<CommentButton onClick={() => handleCommentClick()}>Comment</CommentButton>
				<CommentContainer  comments={comments} commentDelete={commentDelete} setCommentCount={tweetFunctions.setCommentCount} /> 
			</PopupContainer>
		</> 
	)
}

const CommentContainer = ({comments, commentDelete, setCommentCount}) => {
	const deleteComment = (comment) => {
		commentDelete(comment._id)
		setCommentCount(-1)
	}
	const commentElement = comments.map(comment => {
	return(
		<UltimateContainer>
			<UserImage width="50px" height="50px" /> 
			<StyledCommentContainer key={comment._id}>
				<CommentHeadingContainer>
					<UserName>{comment.user.username}</UserName>
					<UserId>@{comment.user.username}</UserId>
				</CommentHeadingContainer>
				<TweetText>{comment.text}</TweetText>
				<DeleteComment onClick={() => {deleteComment(comment)}}>X</DeleteComment>
			</StyledCommentContainer>
		</UltimateContainer>
		)
	})
	return(
		<>
		{commentElement}
		</>
	)
}

const TweetExtended = ({tweet, setShowPopup, tweetFunctions}) => {
	return(
		<>
			<TweetExtendedContainer tweet={tweet} tweetFunctions={tweetFunctions} setShowPopup={setShowPopup}/>
		</>
	)
}

export default TweetExtended