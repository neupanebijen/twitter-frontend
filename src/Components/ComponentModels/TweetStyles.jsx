import styled from 'styled-components'
import{color, device} from '../style.js'

export const TweetContainer = styled.div`
	display: flex; 
	gap: 2rem;
	margin-top: 2rem;

	@media ${device.mobileLMax} {
		gap: 0;	
		padding: 0 1rem;
	}
`

export const TweetCoreContainer = styled.div`
	display: flex; 
	flex-direction: column;
	flex-grow: 1; 


`

export const TweetArea = styled.textarea`
	color: ${color.tertiary};
	background: ${color.secondary};
	font-size: 2.5rem;
	padding: 1rem;
	border: none; 
	border-bottom: 1px solid ${color.tertiary_shade}; 
	height: auto; 
	overflow: auto;  
	outline: none;
	&:focus{
		outline: none;
	}

	&::placeholder{
		color: ${color.tertiary_shade};
	}
`

export const TweetUtils = styled.div`
	margin-top: 1rem;
	margin-bottom: 1rem;
	display: flex; 
	justify-content: space-between; 
	align-items: center; 

	@media ${device.mobileLMax} {
		margin-bottom: 0rem;	
	}
`

export const Button = styled.div`
	background: ${color.secondary};
	font-size: 1.6rem;
	border-radius: 2rem;
	cursor: pointer;
	font-weight: bold;
	border: none;
	display: flex; 
	align-items: center; 
	justify-content: flex-start;
	padding: 1.2rem;
	&:hover{
		color: ${color.primary_shade};
		background: ${color.secondary_shade}; 
	}
	&:focus {
		outline: none;
	}
`

export const TweetButton = styled(Button)`
	background: ${color.primary};
	color: ${color.tertiary}; 
	justify-content: center; 
	margin-top: 1rem;
	&:hover{
		background: ${color.primary_shade};
		color: ${color.tertiary};
	}
	&:focus {
		outline: none;
	}
`

export const Utils = styled.div`
	display: flex; 
	align-items: center; 
`

export const IconButton = styled.div`
	background: ${color.secondary};
	border-radius: 50%;
	cursor: pointer;
	padding: 1.2rem;
	&:hover{
		color: ${color.primary_shade};
		background: ${color.secondary_shade}; 
	}
	&:focus {
		outline: none;
	}
`

export const ClosePopupContainer = styled.div`
	color: ${color.tertiary};
	background: ${color.secondary};
	font-size: 2.5rem;
	padding: 1rem 0rem 1rem 0rem;
	border-bottom: 1px solid ${color.tertiary_shade};
	z-index: 99; 
`

export const ClosedButton = styled.button`
	background: none;
	border-radius: 50%; 
	cursor: pointer;
	color: ${color.primary};
	border: none; 
	z-index: 99;
	&:hover {
		background: ${color.secondary_shade}; 
	}
`

export const iconStyle = {
	fontSize: "3rem",
	color: color.primary,
	cursor: "pointer"
}