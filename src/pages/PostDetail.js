import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import Upvotes from './Upvotes';
import './PostDetail.css'

const PostDetail = () => {
    const { id } = useParams(); // Get crewmate ID from URL
    const [post, setPost] = useState(null); // State to store crewmate data
    const [loading, setLoading] = useState(true); // Loading state

    const [comment, setComment] = useState({comments: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setComment( (prev) => {
            console.log("Updating comment:", { ...prev, [name]: value }); // Check values
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    // const createComment = async (event) => {
    //     event.preventDefault();

    //     // Check if the post already has comments
    //     const updatedComments = post.comments 
    //     ? `${post.comments}\n${comment.comments}`  // Append new comment if existing
    //     : comment.comments;  // Start with the new comment if none exist

      
    //     await supabase
    //       .from('Posts')
    //       .update({ comments: updatedComments })
    //       .select();
      
    //     window.location = "/post/:id";
    //   }

    const createComment = async (event) => {
        event.preventDefault();
    
        // Check if the post already has comments
        const updatedComments = post.comments 
            ? `${post.comments}\n${comment.comments}`  // Append new comment if existing
            : comment.comments;  // Start with the new comment if none exist
    
        // Update the post with the new comment
        const { error } = await supabase
          .from('Posts')
          .update({ comments: updatedComments })
          .eq('id', id);
    
        if (error) {
            console.error("Error updating comments:", error);
        } else {
            // Refresh the post data to display the new comment
            setPost((prev) => ({ ...prev, comments: updatedComments }));
            setComment({ comments: "" });  // Clear comment input
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts')
                    .select('title, description, created_at, upvotes, comments')
                    .eq('id', id)
                    .single();
                
                if (error) {
                    console.error("Error fetching post details:", error);
                } else {
                    setPost(data);
                }
            } catch (error) {
                console.error("Unexpected error fetching post details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>No post details found.</p>;

    return (
        <div className="postDetailsContainer">
            <h6>Posted at {post.created_at}</h6>

            <h2>{post.title}</h2>
            
            <p>{post.description}</p>

            <br></br>
            <p>Like this post!</p>
            <Upvotes initialUpvotes={post.upvotes} id={id}/>
            <br></br>
            
            <p>Leave a comment below</p>
            <label for="comments"></label>
                <br />
                <textarea rows="5" cols="50" id="description" name="comments" onChange={handleChange}>
                </textarea>
                <input type="submit" value="Submit" onClick={createComment}/>
                <br/>
                <p>{post.comments}</p>
        </div>
    );
};

export default PostDetail;