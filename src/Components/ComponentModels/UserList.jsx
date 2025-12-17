import UserImage from '../ComponentModels/UserImage.jsx'
import styled from 'styled-components'
import { color, device } from '../style.js'
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import {PopupWrapper, PopupContainer} from './Popup.jsx'
import {ClosePopupContainer, ClosedButton, iconStyle} from './TweetStyles.jsx'
import CloseIcon from '@material-ui/icons/Close'
import Profile from './Profile.jsx'
import {TweetButton} from './Button.jsx'
import {getUserData} from '../../Services/userApi'

const NewButton = styled(TweetButton)`
	position: fixed;
	bottom:10%;
	width: 10rem;
	left: 50%;
	transform: translateX(-50%);
	background: ${color.primary};
	&:hover{
		background: ${color.shade_border};
	}
	z-index: 99;

	@media ${device.mobileLMax} {
		bottom: 9%;
		left: 80%;
	}	
`

const ProfileContainer = styled.div `
	position: relative; 
	width: 20rem;
	margin-right: 2rem;
`

const ProfileButtonContainer = styled.div `
	display: flex; 
	align-items: center;
	cursor: pointer; 
	border-radius: 3rem;
	padding: 1.4rem 3.4rem 1.4rem 3.4rem;
	&:hover{
		background: ${color.shade}; 
	}
	width: 100%;
	justify-content: flex-start;
	pointer-event:auto;
`

const UserId = styled.p `
	color: ${color.tertiary_shade}; 
	font-size: 1.5rem;
	line-height: 2rem;
	padding-left: 2rem;
`

const UserName = styled.p `
	font-size: 1.7rem;
	line-height: 2rem;
	padding-left: 2rem;
	pointer-event: none; 
`

const User = ({ userId, userName }) => {
    return (
        <div>
			<UserName>{userName}</UserName>
			<UserId>{userId}</UserId>
		</div>
    )
}

const UserButton = ({username, userImage, setShowPopup }) => {
    return (
        <ProfileButtonContainer onClick={() => setShowPopup(true)}>
			<UserImage userImage={userImage} /> 
			<User userId={`@${username}`} userName={username} /> 
		</ProfileButtonContainer>
    )
}

const ClosePopup =({setShowPopup}) => {
	return(
		<ClosePopupContainer>
			<ClosedButton onClick={() => setShowPopup(false) }><CloseIcon style={{fontSize: "3rem"}}/></ClosedButton>
		</ClosePopupContainer>
	)
}

const UserProfileInfo = ({userData:userDataMain, setShowPopup, tweetFunctions}) => {
	const [index, setIndex] = useState(0)
	const [userData, setUserData] = useState(userDataMain) 
	const [isFollowing, setIsFollowing]  = useState(tweetFunctions.isFollowing(userData._id))
	
	const clickListener = e => {
    	if(e.target.closest('.popupWrapper')){
    		setShowPopup(false)
    	}
    }

	useEffect(() => {
        // Attach the listeners on component mount.
        document.addEventListener('click', clickListener)
        // Detach the listeners on component unmount.
        return () => {
            document.removeEventListener('click', clickListener)
        }
    }, [])

		useEffect(() => {
		const fetchData = async () => {
			const result = await getUserData(userDataMain._id)
			setUserData(result)
		}

		fetchData()
	},[index])

	const followUser = async () => {
		const hasFollowed = await tweetFunctions.follow(userData._id)
		if(hasFollowed) {
			setIsFollowing(true)
			setIndex(index + 1)
			if(tweetFunctions.hasOwnProperty('reloadProfile')){
				tweetFunctions.reloadProfile()
			}
		}
	}


	const unfollowUser = async () => {
		const hasUnfollowed = await tweetFunctions.unfollow(userData._id)
		if(hasUnfollowed){
			setIsFollowing(false)
			setIndex(index + 1)
			if(tweetFunctions.hasOwnProperty('reloadProfile')){
				tweetFunctions.reloadProfile()
			}
		}
	}


	return(
		<>
			<PopupWrapper /> 
			<PopupContainer>
				<ClosePopup setShowPopup={setShowPopup}/> 
				<Profile userData={userData} refresh={index} tweetFunctions={tweetFunctions} /> 
			</PopupContainer>
			<NewButton onClick={() => isFollowing ? unfollowUser() :followUser()}>{isFollowing? 'Unfollow': 'Follow'}</NewButton>
		</> 
	)
}

const UserContainer = ({userData, tweetFunctions}) => {
	const [showPopup, setShowPopup] = useState(false)
	const handleProfileClick = (bool) => setShowPopup(bool)

	return (
		<>
			<UserButton userImage={userData.avatar} username ={userData.username} setShowPopup={handleProfileClick} /> 
			{showPopup ? <UserProfileInfo userData={userData} tweetFunctions={tweetFunctions} setShowPopup={handleProfileClick}/> : null}
		</>
	)
}

const UserList = ({users, tweetFunctions}) => {
	const userList = users.map(user => {
		return(
			<UserContainer userData={user} tweetFunctions={tweetFunctions} key={user._id} /> 
		)
	})
	return(
		<>{userList}</> 
	)
}

export default UserList