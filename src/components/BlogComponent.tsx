import React, { useEffect, useState } from 'react';
import UserNavigationbar from './UserNavigationBarComponent';
import sampleBlogs from '../utilities/SampleBlogs.json';
import BlogRendererComponent from './BlogRendererComponent';
import { BlogInfo } from '../utilities/BlogInfoInterface';

const BlogComponent: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogInfo[]>([]);

  useEffect(() => {
    setBlogs(sampleBlogs.blogList);
  }, []);

  const handleBlogClick = (event: BlogInfo) => {
    console.log('Clicked blog', event.id);
  }

  return (
    <div>
      <UserNavigationbar />
      <h1>Blogs</h1>
      {blogs.map(event => (
        <BlogRendererComponent blog={event} onClick={handleBlogClick}/>
      ))}
    </div>
  );
};

export default BlogComponent;
