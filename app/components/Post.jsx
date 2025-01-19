import DeletePostButton from "./DeletePostButton";

export default function Post({id, title, content, username, loggedInUsername}) {
    return (
        <div style={{border: '3px solid #4F633F',borderRadius : '5px', padding: '15px', marginBottom: '15px', backgroundColor: '#d6e8c4'}}>
            <h4>{username}:</h4>
            <h3>{title}</h3>
            <p>{content}</p>
            {loggedInUsername === username && <DeletePostButton postId={id} />}
            
        </div>
    )
}