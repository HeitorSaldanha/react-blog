import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from 'src/types/types';

const truncateString = (str: string): string => {
  const words = str.split(' ');
  const truncatedWords = words.slice(0, 10);
  const truncatedString = truncatedWords.join(' ');

  if (words.length > 10) {
    return `${truncatedString}...`;
  }

  return truncatedString;
};

const PostCard: React.FC<Post> = ({
  title,
  tags,
  body,
  reactions,
  id,
  userId,
}) => {
  return (
    <Link to={`post/${id}`}>
      <div className="card">
        <header className="card-header pb-3">
          <div className="columns">
            <div className="column is-full">
              <p className="card-header-title">{title}</p>

              {tags.map((tag) => (
                <span className="tag is-primary is-light ml-3">{tag}</span>
              ))}
            </div>
          </div>
        </header>
        <div className="card-content">
          <div className="content">{truncateString(body)}</div>
          <p>Reactions {reactions}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
