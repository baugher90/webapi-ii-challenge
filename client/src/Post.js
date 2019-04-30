import React from 'react';

const Post = props => {
    console.log(props)
    return(
        <div className="post">
            <h4>{props.post.contents}</h4>
            <p>{props.post.title}</p>
        </div>
    )
}

export default Post;