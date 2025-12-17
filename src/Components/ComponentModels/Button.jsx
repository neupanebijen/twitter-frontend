import styled from 'styled-components'
import {color,device} from '../style.js'

export const Button = styled.div`
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
`

export const ButtonText = styled.span`
	display: none;
	pointer-events: none;
	margin-right: 1.6rem;
	 @media ${device.laptopM} {
    	display: inline;
  	}
`

export const TweetButton = styled(Button)`
	background: ${color.primary};
	color: ${color.tertiary}; 
	justify-content: center; 
	margin-top: 1rem;
	font-size: 1.6rem;
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
`