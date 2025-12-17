import {useState, useEffect} from 'react'

import CloseIcon from '@material-ui/icons/Close'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import GifOutlinedIcon from '@material-ui/icons/GifOutlined'
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined'
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import styled from 'styled-components'
import UserImage from './UserImage.jsx'
import{color, device} from '../style.js'

import {PopupWrapper, PopupContainer} from './Popup.jsx'
import {TweetContainer, TweetCoreContainer, TweetArea, TweetUtils, TweetButton, Utils, IconButton, ClosePopupContainer, ClosedButton} from './TweetStyles.jsx'

import {addTweet} from '../../Services/tweetApi'

const StyledPopupContainer = styled(PopupContainer)`
	height: 35rem;

	@media ${device.mobileLMax} {
		max-height: 33rem;	
	}
`

export const PopupTweet = ({setShowTweet, userId, tweetFunctions}) => {
	const clickListener = e => {
    	if(e.target.closest('.popupContainer')) return ; 
    	setShowTweet(false)
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
		<>
			<PopupWrapper />
			<StyledPopupContainer className="popupContainer">
					<ClosePopup setShowTweet={setShowTweet}/>
					<Tweet tweetRows='5' isAutoFocused={true} userId={userId} setShowTweet={setShowTweet} tweetFunctions={tweetFunctions} />
			</StyledPopupContainer>
		</>
	)
}

const ClosePopup =({setShowTweet}) => {
	return(
		<ClosePopupContainer>
			<ClosedButton onClick={() => setShowTweet(false) }><CloseIcon style={{fontSize: "3rem"}}/></ClosedButton>
		</ClosePopupContainer>
	)
}

const iconStyle = {
	fontSize: window.innerWidth < 720 ? "2rem" : "3rem",
	color: color.primary,
	cursor: "pointer"
}
const TweetCore = ({tweetRows, isAutoFocused, userId, setShowTweet, tweetFunctions}) => {
	const [tweetText, setTweetText]= useState('')
	const isFocused = isAutoFocused || false

	const tweetTextChange = (e) => {
		setTweetText(e.target.value)
	}

	//The Tweet Button
	const handleTweetClick = () => {
		const errValue = 'Please Enter a valid tweet'

		if(!tweetText || tweetText===errValue) {
			setTweetText(errValue)
			return
		}

		const getTags = () => {
			const words = tweetText.split("\n").join(' , ').split(" ")
			const tags = words.map(word => {
				if(word.split('')[0] === "#"){
					return word.slice(1).toLowerCase()
				}
			}).filter(word => {
				if(word) {
					return word
				}
			})

			return tags
		}

		const tweetObject = {
			userId : userId,
			tweetText: tweetText, 
			tag: getTags() 
		}

		addTweet(tweetObject)
		setTweetText('')
		if(setShowTweet) {
			setShowTweet(false)
		}
		tweetFunctions.reload()
	}

	return(
		<TweetCoreContainer >
			<TweetArea maxLength="148" autoFocus={isFocused} rows={tweetRows} value={tweetText} placeholder="What's Happening" onChange={tweetTextChange}/> 
			<TweetUtils>
				<Utils>
					<IconButton><ImageOutlinedIcon style={iconStyle} /> </IconButton>
					<IconButton><GifOutlinedIcon style={iconStyle} />  </IconButton>
					<IconButton><BarChartOutlinedIcon style={iconStyle} />  </IconButton>
					<IconButton><SentimentSatisfiedOutlinedIcon style={iconStyle} />  </IconButton>
					<IconButton><CalendarTodayOutlinedIcon style={iconStyle} />  </IconButton>
				</Utils>
				<TweetButton onClick={() => handleTweetClick()}>Tweet</TweetButton>
			</TweetUtils>
		</TweetCoreContainer>
	)
}

export const Tweet = ({tweetRows, isAutoFocused, userId,setShowTweet,tweetFunctions }) => {
	return (
		<TweetContainer>
			<UserImage height='50px' width='50px'/> 
			<TweetCore tweetRows={tweetRows || 2} isAutoFocused={isAutoFocused} userId={userId} setShowTweet={setShowTweet} tweetFunctions={tweetFunctions} /> 
		</TweetContainer>
	)
}
	