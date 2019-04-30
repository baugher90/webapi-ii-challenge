import React from 'react';
import Post from './Post';

const Posts = props => {
    console.log(props)
    return(
        <div className="post-list">
            {props.posts.map(post => (
          <Post post={post} />
        ))}
        </div>
    )
}

export default Posts;