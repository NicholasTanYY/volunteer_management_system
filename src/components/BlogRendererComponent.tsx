import React from 'react';
import { BlogInfo } from '../utilities/BlogInfoInterface';

interface BlogRendererProps {
    blog: BlogInfo;
    onClick: (event: BlogInfo) => void;
}

const BlogRendererComponent: React.FC<BlogRendererProps> = ({ blog: event, onClick }) => {
    return (
        <div style={{ border: '1px solid black', margin: '10px', padding: '10px', width: '400px' }} onClick={() => onClick(event)} >
            <h2>{event.name}</h2>
            <p>{event.datePosted} / {event.timePosted}</p>
            <p>{event.description}</p>
        </div>
    );
};

export default BlogRendererComponent;
