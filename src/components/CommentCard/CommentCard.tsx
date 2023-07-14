import React from 'react';
import { useUserQuery } from 'src/hooks/useQueries';

export interface Props {
  userName: string;
  body: string;
  userId: number;
}

export const CommentCard: React.FC<Props> = ({ userName, body, userId }) => {
  const { data } = useUserQuery(userId);

  const { image } = data || {};

  return (
    <div className="card mb-3">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              {image && <img src={image} alt="User Profile" />}
            </figure>
          </div>
          <div className="media-content">
            <p className="subtitle is-6">{`@${userName}`}</p>
          </div>
        </div>

        <div className="content">{body}</div>
      </div>
    </div>
  );
};
