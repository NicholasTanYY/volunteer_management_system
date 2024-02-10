import React from 'react';
import { BlogInfo } from '../utilities/BlogInfoInterface';

interface BlogRendererProps {
    blog: BlogInfo;
    onClick: (event: BlogInfo) => void;
}

const BlogRendererComponent: React.FC<BlogRendererProps> = ({ blog: event, onClick }) => {
    return (
        <div className="border rounded p-4 my-2 bg-light" onClick={() => onClick(event)}>
            <h2 className="mb-3">{event.name}</h2>
            <p className="mb-2">{event.datePosted} / {event.timePosted}</p>
            <p className="mb-0">{event.description}</p>
        </div>
    );
};

export default BlogRendererComponent;
