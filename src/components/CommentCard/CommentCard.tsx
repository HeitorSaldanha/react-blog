import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from 'src/utils/fetchData';

export const CommentCard: React.FC<{
  userName: string;
  body: string;
  userId: number;
}> = ({ userName, body, userId }) => {
  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser({ userId }),
  });

  const { image } = data || {};

  return (
    <div className="card mb-3">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              {image && <img src={image} alt="Placeholder" />}
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
