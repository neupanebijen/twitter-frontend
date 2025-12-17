import UserImage from '../ComponentModels/UserImage.jsx'
import styled from 'styled-components'
import { color, device } from '../style.js'
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'

const ProfileContainer = styled.div `
	position: relative; 
	width: 10rem;
	@media ${device.laptopM} {
		width: 20rem;
	}


`

const ProfileButtonContainer = styled.div `
	display: flex; 
	align-items: center;
	cursor: pointer; 
	border-radius: 3rem;
	padding: 1.4rem 3.4rem 1.4rem 3.4rem;
	width: 10rem;

	&:hover{
		background: ${color.shade}; 
	}
	justify-content: flex-start;
	pointer-event:auto;

	@media ${device.laptopM} {
		width: 20rem;
	}
`

const UserId = styled.p `
	color: ${color.tertiary_shade}; 
	font-size: 1.5rem;
	display: none;
	line-height: 2rem;
	padding-left: 2rem;

	@media ${device.laptopM} {
		display: block;
	}
`

const UserName = styled.p `
	font-size: 1.7rem;
	line-height: 2rem;
	display: none;
	padding-left: 2rem;
	pointer-event: none; 

	@media ${device.laptopM} {
		display: block;
	}
`

const PopupButton = styled.button `
	color: ${color.tertiary}; 
	background: none;
	border: none; 
	border-top: 1px solid ${color.tertiary_shade}; 
	font-size: 1.5rem;
	padding: 1.6rem;
	cursor: pointer;
	border-radius: 2rem;

	&:hover{
		background: ${color.shade};
	}
`

const PopUpContainer = styled.div `
	display: flex; 
	flex-direction: column; 
	border: 1px solid ${color.tertiary_shade};
	border-radius: 2rem;
	@media ${device.mobileLMax} {
		margin-bottom: 2rem;
	}
`


const User = ({ userId, userName }) => {
    return (
        <div>
			<UserName>{userName}</UserName>
			<UserId>{userId}</UserId>
		</div>
    )
}

const ProfileButton = ({ handleClick, username }) => {
    return (
        <ProfileButtonContainer onClick={() => handleClick()}>
			{window.innerWidth < 720 ? <UserImage width="30px" height="30px"/> :<UserImage />} 
			<User userId={`@${username}`} userName={username} /> 
		</ProfileButtonContainer>
    )
}



const UserPopup = ({ username, setShowPopup, logout}) => {
	const clickListener = e => {
    	setShowPopup(false)
    }

    useEffect(() => {
        // Attach the listeners on component mount.
        document.addEventListener('click', clickListener)
        // Detach the listeners on component unmount.
        return () => {
            document.removeEventListener('click', clickListener)
        }
    }, [])

    return (
        <PopUpContainer>
			<ProfileButton handleClick={() => {}} username={username} /> 
			<PopupButton onClick={() => logout()}>Log out @{username}</PopupButton>
		</PopUpContainer>
    )
}

const PopUp = styled(UserPopup)`
	position: absolute; 
	bottom: 100%; 
	top: -100%;
	left: 0; 

	@media ${device.mobileLMax} {

	}
`

const Profile = ({ username, logout}) => {
    const [showPopup, setShowPopup] = useState(false)
    const onClick = () => setShowPopup(!showPopup)    

    return (
        <ProfileContainer>
			{showPopup ? <PopUp username={username} setShowPopup={() => setShowPopup(false)} logout={logout}/> : ''}
			<ProfileButton handleClick={onClick} username={username}/> 
		</ProfileContainer>
    )
}

export default Profile