import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from 'src/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-regular-svg-icons';

export interface Props extends Omit<Post, 'userId'> {}

const truncateString = (str: string): string => {
  const words = str.split(' ');
  const truncatedWords = words.slice(0, 10);
  const truncatedString = truncatedWords.join(' ');

  if (words.length > 10) {
    return `${truncatedString}...`;
  }

  return truncatedString;
};

export const PostCard: React.FC<Props> = ({
  title,
  tags,
  body,
  reactions,
  id,
}) => {
  return (
    <Link to={`post/${id}`}>
      <div className="card">
        <header className="card-header pb-3">
          <div className="columns">
            <div className="column is-full">
              <p className="card-header-title">{title}</p>

              {tags.map((tag, i) => (
                <span className="tag is-primary is-light ml-3" key={`tag-${i}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        <div className="card-content">
          <div className="content">{truncateString(body)}</div>
          <div className="columns is-mobile is-vcentered">
            <div className="column is-half">
              <span className="icon-text">
                <span className="icon">
                  <FontAwesomeIcon icon={faCommentDots} />
                </span>
                <span>{reactions}</span>
              </span>
            </div>
            <div className="column has-text-right is-half">
              <button className="button is-primary">Read more</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
