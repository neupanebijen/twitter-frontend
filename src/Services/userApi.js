import axios from 'axios'

const apiUrl = "http://localhost:5000/user"

export const loginUser = async (username, password) => {
    const result = await axios({
        method: 'post',
        url: 'http://localhost:5000/user/login',
        data: {
            username: username,
            password: password
        }
    })

    return result
}

export const getUserData = async(userId) => {
    const result = await axios({
        method: 'post',
        url: `${apiUrl}/getUserData`,
        data: {
            userId: userId
        }
    })

    return result.data.data
}

export const saveTweet = async (tweetId, userId) => {
    const result = await axios({
        method: 'post',
        url: `${apiUrl}/savePost`,
        data: {
            userId: userId,
            postId: tweetId
        }
    })

    return result.data.success
}

export const getSavedTweets = async (userId) => {
    const result = await axios({
        method: 'post',
        url: `${apiUrl}/getSavedPosts`,
        data: {
            userId: userId,
        }
    })
    return result.data.data
}

export const searchUser = async (username) => {
    const result = await axios({
        method: 'post',
        url: `${apiUrl}/searchUser`,
        data: {
            username: username,
        }
    })

    return result.data.data
}

export const followUser = async (userId, targetUserId) => {
    const result = await axios({
        method: 'post',
        url: `${apiUrl}/followUser`,
        data: {
            userId: userId,
            targetUserId: targetUserId
        }
    })
    return result.data.success
}

export const unfollowUser = async (userId, targetUserId) => {

        
    const result = await axios({
        method: 'post',
        url: `${apiUrl}/unfollowUser`,
        data: {
            userId: userId,
            targetUserId: targetUserId,
        }
    })

    return result.data.success
}

export const getFeedTweet = async (userId) => {
    const result = await axios({
        method: "post",
        url: `${apiUrl}/feedPosts`,
        data: {
            userId: userId,
        }
    })

    return result.data.data
}

export const getFollowers = async (userId) => {
    const result = await axios({
        method: "post", 
        url: `${apiUrl}/getFollowers`,
        data: {
            userId: userId
        }
    })
    return result.data.data
}

export const getFollowing = async(userId) => {
    const result = await axios({
        method: "post", 
        url: `${apiUrl}/getFollowing`,
        data: {
            userId: userId
        }
    })

    return result.data.data
}