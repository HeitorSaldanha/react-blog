import React, { useEffect } from 'react';
import { useQueryClient, useQueries } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb, CommentCard, Loader } from 'src/components';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useUserQuery } from 'src/hooks/useQueries';
import { Comment } from 'src/types';
import { fetchComments, fetchPost } from 'src/utils/fetchData';

const Post: React.FC<{
  title: string;
  authorName: string;
  body: string;
  comments?: Comment[];
}> = ({ title, authorName, body, comments = [] }) => {
  return (
    <>
      <section className="section">
        <h1 className="title is-3">{title}</h1>
        <h2 className="title is-5">{`Author: ${authorName}`}</h2>
        <p>{body}</p>
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
        {comments.length > 0 && (
          <>
            {comments.map((comment, i) => (
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
  );
};

export const PostDetail: React.FC = () => {
  const { id: postId = '' } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['postDetail'] });
  }, [queryClient]);

  const [postQuery, commentsQuery] = useQueries({
    queries: [
      {
        queryKey: ['postDetail'],
        queryFn: () => fetchPost({ postId }),
        cacheTime: 0,
        retry: false,
      },
      {
        queryKey: ['comments'],
        queryFn: () => fetchComments({ postId }),
        cacheTime: 0,
        retry: false,
      },
    ],
  });

  const { data: postData, isError: postError } = postQuery;
  const { data: commentsData } = commentsQuery;

  useEffect(() => {
    if (postError) navigate('/404');
  }, [navigate, postError]);

  const { data: userData, isLoading: isLoadingUser } = useUserQuery(
    postData?.userId ?? 0,
    true
  );
  return (
    <>
      <Breadcrumb
        path={[
          {
            label: `${postData ? postData.title : '...'}`,
            icon: faFileLines,
          },
        ]}
      />
      <div className="box">
        {isLoadingUser && <Loader />}
        {!isLoadingUser && postData && userData && (
          <Post
            title={postData.title}
            body={postData.body}
            comments={commentsData?.comments}
            authorName={`${userData.firstName} ${userData.lastName}`}
          />
        )}
      </div>
    </>
  );
};
