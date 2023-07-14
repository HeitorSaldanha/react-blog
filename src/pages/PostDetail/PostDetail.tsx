import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Breadcrumb, CommentCard, Loader } from 'src/components';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import {
  useUserQuery,
  usePostQuery,
  useCommentsQuery,
} from 'src/hooks/useQueries';

export const PostDetail: React.FC = () => {
  const { id: postId = '' } = useParams();

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['postDetail'] });

  const postQuery = usePostQuery(postId);
  const commentsQuery = useCommentsQuery(postId);

  console.log({ postQuery });

  const { userId = 0 } = postQuery.data || {};

  const userQuery = useUserQuery(userId);

  const { firstName, lastName } = userQuery.data || {};

  const { isError } = userQuery;
  console.log({ isError });

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
              {commentsQuery?.data?.comments && (
                <>
                  {commentsQuery.data.comments.map((comment, i) => (
                    <CommentCard
                      userId={comment.user.id}
                      userName={comment.user.username}
                      body={comment.body}
                      key={`comment-card-${i}`}
                    />
                  ))}
                </>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};
