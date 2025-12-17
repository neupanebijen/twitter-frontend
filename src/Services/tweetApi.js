import axios from 'axios'
const apiUrl = "http://localhost:5000/post"

export const addTweet = async (tweetObject) => {
	const {userId, tweetText, 	tag} = tweetObject
	const result = await axios({
		method: "post",
		url: `${apiUrl}/addPost`,
		data:{
			user: userId,
			text : tweetText,
			tag: tag
		}
	})

	return result.data.success
}	

export const getUserTweets = async(userId) => {
	const result = await axios({
		method: `post`, 
		url: `${apiUrl}/getUserPost`,
		data:{
			user: userId
		}
	})
	return(result.data.data)
}

export const deleteTweet = async(tweetId) => {
	const result = await axios({
		method: 'delete',
		url: `${apiUrl}/deletePost`,
		data:{
			postId: tweetId
		}
	})

	return result.data.success
}

export const searchByTag = async(tag) => {
	const result = await axios({
		method: 'post', 
		url: `${apiUrl}/searchByTag`,
		data:{
			tag: tag
		}
	})

	return result.data.data
}

export const editTweet = async(postId, editText, editTag) => {
	const result = await axios({
		method: 'post', 
		url: `${apiUrl}/editPost`,
		data: {
			postId: postId, 
			editText: editText,
			editTag: editTag
		}
	})

	return result.data.success
}

export const likeTweet = async(userId, postId) => {
	const result = await axios({
		method: 'post', 
		url: `${apiUrl}/likePost`,
		data:{
			postId, 
			userId
		}
	})

	return result.data.success
}

export const unlikeTweet = async(userId, postId) => {
	const result = await axios({
		method: 'post', 
		url: `${apiUrl}/unLikePost`,
		data:{
			postId,
			userId
		}
	})

	return result.data.success
} 

export const retweet = async(userId, postId) => {
	const result = await axios({
		method: 'post', 
		url: `${apiUrl}/retweet`,
		data:{
			postId, 
			userId
		}
	})

	return result.data.success
}

export const unretweet = async(userId, postId) => {
	const result = await axios({
		method: 'post', 
		url: `${apiUrl}/unretweet`,
		data:{
			postId, 
			userId
		}
	})

	return result.data.success
}



export const getLikedTweets = async(userId) => {
	const result = await axios({
		method: 'post', 
		url: `${apiUrl}/getLikedPosts`,
		data: {
			userId: userId
		}
	})

	return result.data.data
}