import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {color, device} from '../style.js'
import TwitterIcon from '@material-ui/icons/Twitter'
import SearchIcon from '@material-ui/icons/Search'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import HomeIcon from '@material-ui/icons/Home'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import CreateIcon from '@material-ui/icons/Create';

const MenuContainer = styled.div`
	display: flex; 
	flex-direction: column; 
	text-decoration: none;
	letter-spacing: .05rem; 
	padding-right: 2rem;
	align-items: flex-start;
	& .active{
		color: ${color.primary};
	}

	@media ${device.mobileLMax} {
		flex: 1;
		
		flex-direction: row;
		justify-content: space-around;
	}
`

const Button = styled.div`
	background: ${color.secondary};
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

	@media ${device.mobileLMax} {
		padding: .2rem;
	}
`

const ButtonText = styled.span`
	display: none;
	pointer-events: none;
	margin-right: 1.6rem;
	@media ${device.laptopM} {
    	display: inline;
  	}
`

const TweetButton = styled(Button)`
	background: ${color.primary};
	color: ${color.tertiary}; 
	justify-content: center; 
	margin-top: 1rem;
	width: 15rem;
	height: 4rem;
	border-radius: 2rem;
	margin-left: 1rem;
	&:hover{
		background: ${color.primary_shade};
		color: ${color.tertiary};
	}
	&:focus {
		outline: none;
	}

	& .tweetButtonText{
		display: none;
	}

	@media ${device.laptopM} {
		& .tweetButtonText{
			display: block; 
		}
		& .tweetButotnIcon {
			display: none;
		}
	}

	@media ${device.mobileLMax} {
		margin-top: .5rem;
		margin-left: 0;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
	}
	
`

const TwitterIconButton = styled(Button)`
	color: ${color.tertiary}; 
	&:hover{
		color: ${color.tertiary};
	}

	@media ${device.mobileLMax} {
		display: none;
	}
`

const icon_style = {
	fontSize: "3rem",
	pointerEvents: "none"
}

const link_style = {
	marginTop: ".4rem",
	display: "flex"
}

const Menu = ({setShowTweet}) =>  {
	const handleTweetClick = () => {
		setShowTweet(true)
	}
	
	return(
		<MenuContainer>
			<NavLink to='/' style={link_style}><TwitterIconButton><TwitterIcon style={icon_style}/></TwitterIconButton></NavLink>
			<NavLink to='/' exact style={link_style}><Button activeClassName="active"><HomeIcon style={icon_style}/><ButtonText>Home</ButtonText></Button></NavLink>
			<NavLink to='/explore' style={link_style}><Button activeClassName="active"><SearchIcon style={icon_style}/><ButtonText>Explore</ButtonText></Button></NavLink>
			<NavLink to='/bookmarks' style={link_style}><Button activeClassName="active"><BookmarkBorderIcon style={icon_style}/><ButtonText>Bookmarks</ButtonText></Button></NavLink>
			<NavLink to='/profile' style={link_style}><Button activeClassName="active"><PersonOutlineIcon style={icon_style}/><ButtonText>Profile</ButtonText></Button></NavLink>
			<TweetButton onClick={() => handleTweetClick()}><span className="tweetButtonText">Tweet</span><span className="tweetButotnIcon"><CreateIcon /></span></TweetButton>
		</MenuContainer>
	)
}

export default Menu