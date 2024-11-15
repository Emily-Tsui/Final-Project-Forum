import React from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { useState } from 'react'
import { supabase } from '../client'


const EditPost = ({data}) => {

    const {id} = useParams();
    console.log("Post ID from params:", id); // Check if the ID is correct
    const [post, setPost] = useState({id: null, title: "", description: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
        console.log("Deleting post with ID:", id); // Check if the correct ID is logged
        
        await supabase
            .from('Posts')
            .update({ title: post.title, description: post.description})
            .eq('id', id);

        window.location = "/";
            }

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        window.location = "/";
    }

    return (
        <div>
            <form>
                <label for="title">Update Post Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}>
                </textarea>
                <br/>

                <input type="submit" value="Submit" onClick={updatePost}/>
                <button type="button" className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost;