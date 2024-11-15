import React, { useState } from 'react';
import { supabase } from '../client';

const Upvotes = ({ initialUpvotes, id }) =>  {

    const [vote, setVote] = useState(initialUpvotes || 0)
   
    const updateVote = async (event) => {
      event.preventDefault();
    
      await supabase
        .from('Posts')
        .update({ upvotes: vote + 1})
        .eq('id', id)
    
      setVote((vote) => vote + 1);
    }

    return (
        <div>
            <button className="betButton" onClick={updateVote} >
                💕 Number of likes: {vote}
            </button>
        </div>

    );
};

export default Upvotes;