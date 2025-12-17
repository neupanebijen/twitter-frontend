import styled from 'styled-components'
import { color, device } from '../style.js'

const StyledPopupWrapper = styled.div`
	position: fixed; 
	top: 0; 
	bottom: 0; 
	left: 0; 
	right: 0; 
	background: ${color.secondary_background}; 
`

export const PopupContainer = styled.div`
	position: fixed; 
	width: 63rem;
	top: 10%;
	left: 50%;
	transform: translateX(-50%); 
	background: ${color.secondary}; 
	color: ${color.tertiary}; 
	border-radius: 20px; 
	padding: .5rem 2rem;
	z-index: 99;
	height: 70rem;
	overflow-y: auto;
	overflow-x: hidden;

	@media ${device.mobileLMax} {
		top:5%;
		min-height: 30vh;
		max-height: 80vh;
		width: 100%;
		padding: .5rem 0rem; 
		margin: 0 auto; 
	}
`

// Add evenet listener to wrapper that listens to events that onClick removes the popup element from the screen.
export const PopupWrapper = () => {
	return(
		<StyledPopupWrapper className="popupWrapper" /> 
	)
}
