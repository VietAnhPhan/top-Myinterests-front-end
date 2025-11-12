function Post(props) {
  return (
    <>
      <div>
        <img
          src={props.author.avatarPath}
          alt={`${props.author.fullname}'s avatar`}
        />
        <p>{props.author.fullname}</p>
        <p>{props.author.username}</p>
        <p>{props.post.body}</p>
      </div>
    </>
  );
}

export default Post;
