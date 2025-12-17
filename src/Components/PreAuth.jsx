import styled from 'styled-components'
import { useState } from 'react'
import { color } from './style.js'
import TwitterIcon from '@material-ui/icons/Twitter'
import axios from 'axios'
import {PopupWrapper} from './ComponentModels/Popup.jsx'
import {loginUser} from '../Services/userApi'

const Container = styled.div `
	width: 100vw; 
	height: 100vh; 
	position: fixed; 
	background: ${color.secondary};
	color: ${color.tertiary}; 
	display: flex; 
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 10rem;
`
const iconStyle = {
    color: color.primary,
    fontSize: "12rem"
}

const StyleForm = styled.form `
	display: flex; 
	flex-direction: column; 
`

const StyledInput = styled.input `
	font-size: 2rem;
	border-radius: 2rem;
	padding: 2rem;
`

const Button = styled.input `
	background: ${color.primary};
	color: ${color.tertiary}; 
	font-size: 2rem;
	border-radius: 2rem;
	cursor: pointer;
	font-weight: bold;
	border: none;

	display: flex; 
	align-items: center; 
	justify-content: center;

	padding: 1.2rem;
	margin-top: 2rem;
	gap: 1.2rem;

	&:hover{
		background: ${color.primary_shade};
		color: ${color.tertiary};
	}
	&:focus {
		outline: none;
	}
`

const ChangeAuthText = styled.button `
	background: none; 
	border: none; 
	text-decoration: underline;
	color: ${color.primary}; 
	margin-top: 1rem;
	cursor: pointer;
	&:hover{
		color: ${color.primary_shade};
	}
	&:focus{
		outline: none;
	}
`

const PreAuth = ({login}) => {
	const [signupCompleted, setSignupCompleted] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [creds, setCreds] = useState({
        username: '',
        email: '',
        password: ''
    })

    const authSubmit = async (e) => {
        e.preventDefault()

        try {
        	if(isLogin) {
        		const result = await loginUser(creds.username, creds.password)

        		if(result.data.success){
        			const userData = result.data.data
        			login(userData)
        		}
        	}

        	if(!isLogin) {
        		const result = await axios({
	                method: 'post',
	                url: 'http://localhost:5000/user/signup',
	                data: {
	                    username: creds.username,
	                    email: creds.email, 
	                    password: creds.password
	                }
	            });

        		if(result.data.success){
        			setSignupCompleted(true)
        		}
        	}
        } catch(e) {
        	console.error(e)
        }

        setCreds({
            username: '',
            email: '',
            password: ''
        })

    }

    const onChange = e => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    return (
        <Container>
			<TwitterIcon style={iconStyle}/> 
			<StyleForm onSubmit={e => authSubmit(e)}>
				<label htmlFor="username">Username</label>
				<StyledInput type="text" value={creds.username} name="username" id="username" onChange={e => onChange(e)}/> 
				{
					!isLogin ? 
					<>
						<label htmlFor="email">Email</label>
						<StyledInput type="email" value={creds.email} name="email" id="email" onChange={e => onChange(e)}/>
					</>
					: null
				}
				<label htmlFor="password">Password</label>
				<StyledInput type="password" value={creds.password} name="password" id="password" onChange={e => onChange(e)}/>
				<Button type="submit" value={isLogin?'Log in': 'Sign up'}/>
				<ChangeAuthText onClick={() => setIsLogin(!isLogin)}>{isLogin?'Sign up': 'Log in'}</ChangeAuthText>
			</StyleForm>
			{signupCompleted ? <SignUpCompleted setShowPopup={() => setSignupCompleted(false)} backToLogin={() => setIsLogin(true)} /> : null }	
		</Container>
    )
}

// Post Sign In
const ClosePopupContainer = styled.div`
	color: ${color.tertiary};
	background: ${color.secondary};
	position: fixed; 
	font-size: 2.5rem;
	padding: 5rem;
	border-bottom: 1px solid ${color.tertiary_shade}; 
	border-radius: 20rem;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`

const ClosePopup =({setShowPopup, backToLogin}) => {
	return(
		<ClosePopupContainer>
			<h3>Successfully Signed Up</h3>
			<ChangeAuthText onClick={() => {setShowPopup();backToLogin()}}>Back To Log In</ChangeAuthText>
		</ClosePopupContainer>
	)
}

const SignUpCompleted = ({setShowPopup, backToLogin}) => {
	return(
		<>
			<PopupWrapper /> 
			<ClosePopup setShowPopup={setShowPopup} backToLogin={backToLogin}/> 
		</> 
	)
}

export default PreAuth