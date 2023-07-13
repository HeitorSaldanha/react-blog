import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchComments, fetchPost, fetchUser } from 'src/utils/fetchData';
import { Breadcrumb, CommentCard } from 'src/components';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

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

  const { firstName, lastName } = userQuery.data || {};

  return userQuery.isLoading ? (
    <progress className="progress is-small is-primary mt-5" max="100" />
  ) : (
    <>
      <Breadcrumb
        path={[{ label: `${postQuery?.data?.title}`, icon: faFileLines }]}
      />
      <div className="box">
        <section className="section">
          <h1 className="title is-3">{postQuery?.data?.title}</h1>
          <h2 className="title is-5">{`Author: ${firstName} ${lastName}`}</h2>
          <p>{postQuery?.data?.body}</p>
        </section>
        <section className="section">
          <div className="columns is-mobile is-vcentered">
            <div className="column is-half">
              <h2 className="title is-5">Comments</h2>
            </div>
            <div className="column has-text-right is-half">
              <button className="button is-primary is-outlined">Add new</button>
            </div>
          </div>
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
    </>
  );
};
