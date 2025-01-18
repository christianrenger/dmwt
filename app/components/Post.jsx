import DeletePostButton from "./DeletePostButton";

export default function Post({id, title, content, username, loggedInUsername}) {
    return (
        <div style={{border: '1px solid white', padding: '15px'}}>
            <h3>{username}</h3>
            <h4>{title}</h4>
            <p>{content}</p>
            {loggedInUsername === username && <DeletePostButton postId={id} />}
            
        </div>
    )
}