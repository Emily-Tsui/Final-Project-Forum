import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import PostDetail from './pages/PostDetail';
import { supabase } from './client';


const App = () => {
    const [posts, setPosts] = useState([]);  // Holds all posts
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
      // Fetch posts from Supabase when the component mounts
      const fetchPosts = async () => {
          const { data } = await supabase
              .from('Posts')
              .select('*')
              .order('created_at', { ascending: true });
          setPosts(data);
          setFilteredPosts(data);  // Initialize filteredPosts with the full list
      };
      fetchPosts();
  }, []);

    // Function to handle search input and filter posts
    const handleSearch = (inputValue) => {
      setSearchInput(inputValue);
      if (inputValue) {
          const filtered = posts.filter((post) =>
              post.title.toLowerCase().includes(inputValue.toLowerCase())
          );
          setFilteredPosts(filtered);
      } else {
          setFilteredPosts(posts);  // Reset to full list if search input is empty
      }
  };

    // Sets up routes
    let element = useRoutes([
      {
        path: "/",
        element:<ReadPosts data={filteredPosts} /> // 
      },
      {
        path:"/edit/:id",
        element: <EditPost />
      },
      {
        path:"/new",
        element: <CreatePost />
      },
      {
        path:"/post/:id",
        element: <PostDetail />
      }
    ]);



  return ( 

    <div className="App">

      <div className="header">
        <h1>Nurses Forum</h1>
        <input
          id="searchBar"
          type="text"
          placeholder="Search for a post"
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}  // Update search input and filter posts
        />
        <div className="headerButtonsContainer">
          <Link to="/"><button className="headerBtn"> Home  </button></Link>
          <Link to="/new"><button className="headerBtn"> Create a Post!</button></Link>
        </div>
      </div>
        {element}
    </div>

  );
}

export default App;
