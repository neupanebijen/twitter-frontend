import styled from 'styled-components'
import {color, device} from '../style.js'
import SearchIcon from '@material-ui/icons/Search'

const SidebarContainer = styled.div`
	padding: 2rem 5rem;
	display: none; 
	@media ${device.laptop} {
		display: block;
	}
	width: 40rem;

	@media ${device.mobileLMax} {
		display: none;
	}	
`

const SidebarWrapper = styled.div`
	display: none;
	flex: 1; 
	max-width: 40rem;
	border-left: 1px solid ${color.shade_border};
	width: 40rem;
	height: 100vh;
	position: sticky;
	top: 0;

	@media ${device.tablet} {
		display: block; 
	}
`
const SearchBarContainer = styled.div `
	background: ${color.secondary_shade};
	border-radius: 2rem;
	display: flex; 
	padding: .3rem 2rem;
`

const SearchBar = styled.input `
	font-size: 2.2rem;
	color: ${color.tertiary};
	padding: 1rem;
	background: ${color.secondary_shade};
	border-radius: 2rem;
	border: none;
	&:focus{
		outline: none;
	}
	width: 22rem;
`

const Button = styled.div `
	background: ${color.secondary_shade};
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

const iconStyle = {
    fontSize: "3rem",
    pointerEvents: "none",
    cursor: "pointer"
}

const Trending = styled.div`
	height: 50rem;
	border-radius: 2rem; 
	background: ${color.shade}; 
	margin-top: 2rem;
`

const Title = styled.div`
	border-bottom: 1px solid ${color.shade_border}; 
	padding: 2rem;
	font-size: 2rem;
	font-weight: bold;
`

const Sidebar = props =>  {
	return(
		<SidebarWrapper>
			<SidebarContainer>
				<SearchBarContainer >
        			<SearchBar autoFocus placeholder="Search" /> 
        			<Button> <SearchIcon style={iconStyle}/> < /Button> 
        		</SearchBarContainer> 
				<Trending>
					<Title>Trends for you</Title>
				</Trending>
			</SidebarContainer>
		</SidebarWrapper>
	)
}

export default Sidebar