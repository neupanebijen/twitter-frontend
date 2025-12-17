import axios from 'axios'

const apiUrl = "http://localhost:5000/comment"

export const addComment = async (userId, postId, commentText) => {
	const result = await axios({
		method: 'post',
		url: `${apiUrl}/addComment`,
		data: {
			userId: userId, 
			postId: postId,
			commentText: commentText
		}
	})

	return result.data.success
}

export const getComments = async (postId) => {
	const result = await axios({
		method: 'post', 
		url: `${apiUrl}/getComments`,
		data: {
			postId:postId
		}
	})

	return result.data.data
}

export const deleteComment = async (postId,commentId) => {
	const result = await axios({
		method: 'post',
		url: `${apiUrl}/deleteComment`,
		data: {
			postId: postId, 
			commentId: commentId
		}
	})

	return result.data.success
}
