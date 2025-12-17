import Title from '../ComponentModels/Title.jsx'
import styled from 'styled-components'
import {color} from '../style.js'
import UserImage from '../ComponentModels/UserImage.jsx'
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
import ProfileTweets from './ProfileComponents/Tweets.jsx'
import LikedTweets from './ProfileComponents/Likes.jsx'
import {Followers, Followings} from './ProfileComponents/Follow.jsx'
import {useState, useEffect} from 'react'
import {getUserData} from '../../Services/userApi'

const ProfileHeader = styled.div`	
`

const CoverPicContainer = styled.div`
	width: 100%;
	background-color: ${color.shade_border}; 
	height: 20rem;
`

const CoverPic = styled.img`
	width: 100%;
	height: 100;
	object-fit: cover; 
`

const UserImageContainer = styled.div`
	margin: -7.5rem 0 0 2rem;
	display: inline-block;
	border: 3px solid ${color.secondary};
	border-radius: 50%;
`

const ProfileContainer = styled.div `
	position: relative; 
`

const ProfileTextSmall = styled.p `
	color: ${color.tertiary_shade}; 
	font-size: 1.5rem;
	padding-left: 2rem;
	display: flex;
	justifyContent: center; 
	alignItems: center;
	margin-top: .5rem;
`

const ProfileText = styled.p `
	font-size: 2.2rem;
	line-height: 1rem;
	padding-left: 2rem;
	pointer-event: none; 
	font-weight: bold;
`

const iconStyle={
	margin: ".4rem .4rem 0 0 ",
	fontSize: "1.8rem"
}

const ProfileMenu = styled.div`
	display: flex; 
	justify-content: space-between;
	align-items: center; 
	width: 100%;
	margin-top: 1rem;
	border-bottom: 1px solid ${color.shade_border}; 
`

const MenuItems = styled(NavLink)`
	font-size: 1.8rem;
	color: ${color.tertiary_shade};
	display: flex;
	flex-grow: 1; 
	align-items: center; 
	justify-content: center;
	cursor: pointer;
	font-weight: bold; 
	padding: 1rem;
	&:hover{
		color: ${color.primary}; 
		background-color: ${color.secondary_shade};
	}
`

const linkActiveStyle={
	color: color.primary
}

const Profile = ({userData: userDataMain, tweets, tweetFunctions}) => {
	const [index, setIndex] = useState(0)
	const [userData, setUserData] = useState(userDataMain) 
	const date = new Date(userData.createdAt)

	useEffect(() => {
		const fetchData = async () => {
			const result = await getUserData(userDataMain._id)
			setUserData(result)
		}

		fetchData()
	},[index])

	tweetFunctions['reloadProfile'] = () => {
		setIndex(index + 1) 
	}

	tweetFunctions['isFollowing'] = (targetUserId) => {
        return userData.following.includes(targetUserId)
    }

	return(
		<>
			<Router>
			<Title titleText="Profile" />
			<ProfileHeader>
				<CoverPicContainer>
					<CoverPic src={userData.userImage || null }/> 
				</CoverPicContainer> 
				<UserImageContainer>
					<UserImage width="13rem" height="13rem"/>	
				</UserImageContainer>
				<ProfileContainer>
					<ProfileText>{userData.username}</ProfileText>
					<ProfileTextSmall>@{userData.username}</ProfileTextSmall> 
					<ProfileTextSmall><DateRangeOutlinedIcon style={iconStyle}/> Joined at {date.toLocaleString('default',{month: 'short'})} {date.getFullYear()}</ProfileTextSmall>
					<ProfileTextSmall><span style={{color:`${color.tertiary}`, margin:"0 .4rem 0 0"}}>{userData.followingCount}</span> Following <span style={{color:`${color.tertiary}`,margin:"0 .4rem 0 1rem"}}>{userData.followersCount}</span> Followers</ProfileTextSmall> 
				</ProfileContainer>
				<ProfileMenu>
					<MenuItems activeStyle={linkActiveStyle} exact to='/profile/'>Tweets</MenuItems>
					<MenuItems activeStyle={linkActiveStyle} to='/profile/followers'>Followers</MenuItems>
					<MenuItems activeStyle={linkActiveStyle} to='/profile/followings'>Followings</MenuItems>
					<MenuItems activeStyle={linkActiveStyle} to='/profile/likes'>Likes</MenuItems>
				</ProfileMenu>
					<Switch>
						<Route path='/profile/' exact render={() => <ProfileTweets userId={userData._id} tweetFunctions={tweetFunctions}/>} />
						<Route path='/profile/followers' exact render={() => <Followers userId={userData._id} refresh={index} tweetFunctions={tweetFunctions}/>} />
						<Route path='/profile/followings' exact  render={() => <Followings userId={userData._id} refresh={index} tweetFunctions={tweetFunctions}/>}/>
						<Route path='/profile/likes' exact render={() => <LikedTweets userId={userData._id} tweetFunctions={tweetFunctions}/> }  />
					</Switch>
			</ProfileHeader>
			</Router>
		</>
	)
}

const Tweets = (props) => {
	return(
		<>
			<h3 style={{color:"white"}}>This is {props.component}.</h3>
		</>
	)
}

export default Profile