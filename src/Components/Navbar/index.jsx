import styled from 'styled-components'
import{color,device} from '../style.js'
import Menu from './Menu.jsx'
import Profile from './Profile.jsx'

const Container = styled.div`
		position: sticky;
		top: 0px;
		flex: 1; 
		font-weight: bold;
		
		max-width: 60rem;
		height: 100vh; 
		min-width: 12rem;
		
		background: ${color.secondary};
		color: white;
		border-right: 1px solid ${color.shade_border};
		
		display: flex; 
		justify-content: space-between;
		align-items: flex-end;
		flex-direction: column;

		@meida ${device.tablet} {
			padding: 0 2rem 2rem 2rem;
			min-width: 20rem;
		}

		@media ${device.mobileLMax} {
			position: fixed;
			top: calc(var(--vh) * 92);
			width: 100vw;
			max-height: calc(var(--vh) * 8);
			z-index: 4; 

			flex-direction: row; 
			align-items: center;
		}

`

const Navbar = ({setShowTweet, username, logout}) => {
	return (
		<Container> 
			<Menu setShowTweet={setShowTweet} />
			<Profile username={username} logout={logout}/> 
		</Container>
	)
}


export default Navbar