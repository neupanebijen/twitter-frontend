import {getFollowers, getFollowing} from '../../../Services/userApi'
import {useState, useEffect} from 'react'
import UserList from '../../ComponentModels/UserList.jsx'

export const Followers = ({userId, refresh, tweetFunctions}) => {
	const [users, setUsers] = useState([])
	const refreshValue = refresh ? refresh : -1

	useEffect(() => {
		const fetchData = async () => {
			const result = await getFollowers(userId)

			setUsers(result.followers)
		}
		fetchData()
	},[refreshValue])

	return (
		<>
			<UserList users={users} tweetFunctions={tweetFunctions}/> 
		</>
	)
}

export const Followings = ({userId, refresh, tweetFunctions}) => {
	const [users, setUsers] = useState([])
	const refreshValue = refresh? refresh : -1

	useEffect(() => {
		const fetchData = async () => {
			const result = await getFollowing(userId)

			setUsers(result.following)
		}
		fetchData()
	},[refreshValue])

	return (
			<UserList users={users} tweetFunctions={tweetFunctions}/> 
	)
}