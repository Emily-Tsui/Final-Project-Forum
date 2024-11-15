import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

// const ReadPosts = (props) => {

    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     setPosts(props.data);

    //     // READ all post from table
    //     const fetchPosts = async () => {
    //         const {data} = await supabase
    //             .from('Posts')
    //             .select('*')
    //             .order('created_at', { ascending: true });
            
    //         console.log("Fetched posts:", data); // Check if descriptions are included here
    //         // set state of posts
    //         setPosts(data)
    // };
    //     fetchPosts();
    // }, [props]);

    const ReadPosts = ({ data }) => {
        const [posts, setPosts] = useState(data);
    
        useEffect(() => {
            setPosts(data);  // Update posts whenever the data prop changes
        }, [data]);
   
    
    
    return (
        <div className="ReadPosts">
            {console.log("Posts state in ReadPosts:", posts)} {/* Check if descriptions are here */}
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} title={post.title} description={post.description} created_at={post.created_at} upvotes={post.upvotes}/>
                ) : <h2>{'No Posts Yet!'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;