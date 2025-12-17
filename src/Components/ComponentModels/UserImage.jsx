import Avatar from '@material-ui/core/Avatar'

//Add fetch or get the data as a prop.
const UserImage = (props) => {
	return(
			<Avatar alt="UserImage" src="" style={{ height: props.height || '40px', width: props.width || '40px'}}/> 
	)
}

export default UserImage