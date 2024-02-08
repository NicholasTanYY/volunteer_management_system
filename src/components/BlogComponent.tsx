import React, { useEffect, useState } from 'react';
import sampleBlogs from '../utilities/samples/SampleBlogs.json';
import BlogRendererComponent from './BlogRendererComponent';
import { BlogInfo } from '../utilities/BlogInfoInterface';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavButton from './NavButtonComponent';

const BlogComponent: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogInfo[]>([]);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setBlogs(sampleBlogs.blogList);
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
    <div>
      <h2>Blogs</h2>
      {blogs.length > 0 && (
        <div>
          <div className="d-flex justify-content-between">
                <NavButton startIcon={<ArrowBackIcon />} onClick={handlePrevClick}> </NavButton>
                <NavButton endIcon={<ArrowForwardIcon />} onClick={handleNextClick}> </NavButton>
            </div>
          <BlogRendererComponent blog={blogs[currentBlogIndex]} onClick={handleBlogClick} />
        </div>
      )}
    </div>
  );
};

export default BlogComponent;
