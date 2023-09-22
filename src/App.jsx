import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./components/Posts";
import Paginations from "./components/Paginations";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = response.data;
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  //get current post
  const indexOfLastPost = currentPage * postsPerPage; // 1 * 10 = 10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 - 10 = 0
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); //post.slice(0,10)

  //change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Paginations
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
