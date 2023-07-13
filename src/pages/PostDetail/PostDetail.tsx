import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchComments, fetchPost, fetchUser } from 'src/utils/fetchData';
import { Breadcrumb, CommentCard, Loader } from 'src/components';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

export const PostDetail: React.FC = () => {
  const { id: postId = '' } = useParams();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['postDetail'] });
  const postQuery = useQuery({
    queryKey: ['postDetail'],
    queryFn: () => fetchPost({ postId }),
    cacheTime: 0,
  });

  const { userId = 0 } = postQuery.data || {};

  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser({ userId }),
    enabled: !!userId,
    cacheTime: 0,
  });

  const commentsQuery = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments({ postId }),
    cacheTime: 0,
  });

  if (userQuery.error instanceof Error) return <>{}</>;

  const { firstName, lastName } = userQuery.data || {};

  return (
    <>
      <Breadcrumb
        path={[
          {
            label: `${postQuery.data ? postQuery.data.title : '...'}`,
            icon: faFileLines,
          },
        ]}
      />
      <div className="box">
        {userQuery.isLoading ? (
          <Loader />
        ) : (
          <>
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
                  <button className="button is-primary is-outlined">
                    Add new
                  </button>
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
          </>
        )}
      </div>
    </>
  );
};
