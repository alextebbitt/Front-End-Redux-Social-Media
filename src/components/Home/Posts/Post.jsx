import React from 'react'
import { useSelector } from 'react-redux';

const Post = () => {
    const { posts } = useSelector((state) => state.posts)
    
    const post = posts.map((post) => 
    {
        return (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <span> {post.body} </span>
            </div>
        )
    })
    
    return (<div>
        {post}
            </div>
        )
    
}

export default Post