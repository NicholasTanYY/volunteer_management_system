import React, { useEffect, useState } from 'react';
import sampleBlogs from '../utilities/samples/SampleBlogs.json';
import BlogRendererComponent from './BlogRendererComponent';
import { BlogInfo } from '../utilities/BlogInfoInterface';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavButton from './NavButtonComponent';
import axios from 'axios';

const BlogComponent: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogInfo[]>([]);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();
  const getBlog = async () => {
    const response = await axios.get(`${process.env.REACT_APP_REQUEST_LINK}/user/getBlogs`);
    setBlogs(response.data);
    setIsDone(true);
  }

  useEffect(() => {
    getBlog();
    // setBlogs(sampleBlogs.blogList);
  }, []);

  const handleNextClick = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex + 1) % blogs.length);
  };

  const handlePrevClick = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex - 1 + blogs.length) % blogs.length);
  };

  const handleBlogClick = (event: BlogInfo) => {
    console.log('Clicked blog', event.id);
    navigate(`/userBlogs/`);
  }

  return (
    !isDone
      ? <div></div>
      :
    <div className="w-75">
      <h3>Latest Blogs</h3>
      {blogs.length > 0 && (
        <div>
          <div className="d-flex justify-content-center">
            <NavButton startIcon={<ArrowBackIcon />} onClick={handlePrevClick}> </NavButton>
            <BlogRendererComponent blog={blogs[currentBlogIndex]} onClick={handleBlogClick} />
            <NavButton endIcon={<ArrowForwardIcon />} onClick={handleNextClick}> </NavButton>
            </div>
        </div>
      )}
    </div>
  );
};

export default BlogComponent;
