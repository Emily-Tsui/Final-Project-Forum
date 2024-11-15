import React from 'react'
// import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
// import { supabase } from '../client'

const Card = (props) =>  {

  // const [count, setCount] = useState(0)
 
  // const updateCount = async (event) => {
  //   event.preventDefault();
  
  //   await supabase
  //     .from('Posts')
  //     .update({ betCount: count + 1})
  //     .eq('id', props.id)
  
  //   setCount((count) => count + 1);
  // }

  return (
      <div className="Card">
          <Link to={'/edit/'+ props.id}>
            <img className="moreButton" alt="edit button" src={more} />
          </Link>
          <Link to={`/post/${props.id}`}>
                <h6 className="description">Posted at {props.created_at} </h6>
                <h2 className="title">{props.title}</h2>
                <p className="description">{props.description}</p>
          </Link>

          <h6 classname="votes">{props.upvotes} upvotes</h6>
          
      </div>
  );
};

export default Card;