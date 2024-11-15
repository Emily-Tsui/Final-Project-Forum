import React from 'react';
import './CreatePost.css'
import { useState } from 'react'
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", description: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            console.log("Updating post:", { ...prev, [name]: value }); // Check values
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({title: post.title, description: post.description})
          .select();
      
        window.location = "/";
      }


    return (
        <div>
            <form>
                <label id="createTitle" for="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange}>
                </textarea>
                <br/>


                <input type="submit" value="Submit" onClick={createPost}/>
            </form>
        </div>
    )
}

export default CreatePost