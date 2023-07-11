import React from 'react';

interface Props {
  title: string;
  tags: string[];
  body: string;
  reactions: number;
}

const PostCard: React.FC<Props> = ({ title, tags, body, reactions }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{title}</p>
        <div className="columns">
          {tags.map((tag) => (
            <div className="column">
              <span className="tag is-primary is-light">{tag}</span>
            </div>
          ))}
        </div>
      </header>
      <div className="card-content">
        <div className="content">{body}</div>
        <p>Reactions {reactions}</p>
      </div>
    </div>
  );
};

export default PostCard;
