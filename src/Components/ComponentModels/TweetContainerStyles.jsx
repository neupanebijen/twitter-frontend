import styled from 'styled-components'

import {color, device} from '../style.js'

export const UserId = styled.p`
	colexport or: ${color.tertiary_shade}; 
	font-size: 1.5rem;
	line-height: 2rem;
	padding-left: 1rem;
`

export const UserName = styled.p`
	font-size: 1.7rem;
	line-height: 2rem;
	pointer-event: none; 
	font-weight: bold;
`

export const UserContainer = styled.div`
	display: flex; 
`

export const StyledTweetContainer = styled.div`
	border-bottom: 1px solid ${color.shade_border}; 
	padding: 2rem;
	display: flex; 
	color: ${color.tertiary_text};
	width: 60rem;
	z-index: 1;
	&:hover {
		background: ${color.secondary_shade};
	}

	@media ${device.mobileLMax} {
		width: 100vw;	
		padding: 2rem 1rem;	
	}
`

export const StyledTweetContainerCore = styled.div`
	padding: 0 .5rem 0 1.2rem;
	flex: 1;
	cursor: pointer;
	position: relative;
	z-index: 1;
`

export const TweetInfoContainer = styled.div`
	display: flex; 
	justify-content: space-between; 
	position: relative; 
	width: 100%;
`

export const PopUpContainer = styled.div`
	display: flex; 
	flex-direction: column; 
	background: ${color.secondary};
	position: absolute; 
	z-index: 99;
	bottom: 10%;
	right: 0; 
	transform: translateX(-20%);
	border-radius: 2rem; 
	background: ${color.secondary};
	overflow: hidden;
	border: 1px solid ${color.tertiary_shade};

	@media ${device.mobileLMax} {
		width: 8;
		transform: translateX(-20%);
	}
`

export const PopupButton = styled.button`
	color: ${color.tertiary}; 
	background: ${color.secondary};
	border: none;
	border-top: 1px solid ${color.tertiary_shade}; 
	font-size: 1.5rem;
	padding: 1.6rem;
	cursor: pointer;
	&:hover{
		background: ${color.shade};
	}
`

export const TweetText = styled.p`
	font-size: 1.5rem;
	line-height: 2rem;
	margin-top: 1rem;
	min-height: 2rem;
	max-width: 50rem;
	word-wrap: break-word;
`

export const TweetImage = styled.img`
	border-radius: 2rem;
	width: 100%;
	height: 100%;
	margin-top: 1rem;
	object-fit: cover;
`

export const TweetImageContainer = styled.div`
	height: 28.4rem;
`

export const TweetUtils = styled.div`
	display: flex; 
	margin-top: 1rem;
	gap: 8rem;

	@media ${device.mobileLMax} {
		gap: 3rem;
	}
`

export const ButtonWrapper = styled.div`
	cursor: pointer;
	color: ${color.tertiary_shade};
	z-index: 12;
	&:hover{
		color: ${color.primary_shade};
	}
	&:focus {
		outline: none;
	}
	border: none;	
`

export const Button = styled(ButtonWrapper)`
	border-radius: 2rem;
	font-weight: bold;
	display: flex; 
	align-items: center; 
	gap: 1rem;
	z-index: 1;
`

export const iconStyle = {
	fontSize: "2rem",
	pointerEvents: "none",
}
