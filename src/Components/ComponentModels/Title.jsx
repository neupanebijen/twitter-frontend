import styled from 'styled-components'
import {color} from '../style.js'

const TitleContainer = styled.div`
	border-bottom: 1px solid ${color.shade_border}; 
	padding: 1.6rem;
`
const TitleText = styled.p`
	font-size: 2rem; 
	font-weight: bold;
`

const Title = ({titleText}) =>{
	return (
		<TitleContainer>
			<TitleText>{titleText}</TitleText>
		</TitleContainer>
	)
}

export default Title