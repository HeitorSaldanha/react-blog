import React from 'react';

interface Props {
  title: string;
  tags: string[];
  body: string;
  reactions: number;
}

const truncateString = (str: string): string => {
  const words = str.split(' ');
  const truncatedWords = words.slice(0, 10);
  const truncatedString = truncatedWords.join(' ');

  if (words.length > 10) {
    return `${truncatedString}...`;
  }

  return truncatedString;
};

const PostCard: React.FC<Props> = ({ title, tags, body, reactions }) => {
  return (
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
  );
};

export default PostCard;
