import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchComments, fetchPost, fetchUser } from 'src/utils/fetchData';
import CommentCard from 'src/components/CommentCard';

export const PostDetail: React.FC = () => {
  const { id: postId = '' } = useParams();

  const postQuery = useQuery({
    queryKey: ['postDetail'],
    queryFn: () => fetchPost({ postId }),
  });

  const { userId = 0 } = postQuery.data || {};

  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser({ userId }),
    enabled: !!userId,
  });

  const commentsQuery = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments({ postId }),
  });

  if (userQuery.error instanceof Error) return <>{}</>;

  if (userQuery.isLoading) return <>{}</>;

  const { firstName, lastName } = userQuery.data || {};

  return (
    <>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="box">
              <section className="section">
                <h1 className="title is-3">{postQuery?.data?.title}</h1>
                <h2 className="title is-5">{`Author: ${firstName} ${lastName}`}</h2>
                <p>{postQuery?.data?.body}</p>
              </section>
              <section className="section">
                <h2 className="title is-5">Comments</h2>
                {commentsQuery.data?.comments.map((comment, i) => (
                  <CommentCard
                    userId={comment.user.id}
                    userName={comment.user.username}
                    body={comment.body}
                    key={`comment-card-${i}`}
                  />
                ))}
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
