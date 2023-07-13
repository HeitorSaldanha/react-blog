import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Post, PostsResponse } from 'src/types';
import { Breadcrumb, Pagination, PostCard } from 'src/components';

const SearchPosts: React.FC = () => (
  <div className="columns is-centered">
    <div className="column is-half">
      <div className="field has-addons">
        <div className="control is-expanded">
          <input className="input" type="text" placeholder="Find post" />
        </div>
        <div className="control">
          <button className="button is-info">Search</button>
        </div>
      </div>
    </div>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="column is-full">
    <div className="notification is-danger is-light has-text-centered">
      <h1 className="title is-3">Failed to load posts</h1>
      <h2 className="subtitle is-5">{message}</h2>
    </div>
  </div>
);

const PostsList: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <>
    {posts.map((post, i) => (
      <div key={`post-card-${i}`} className="column is-half">
        <PostCard {...post} />
      </div>
    ))}
  </>
);

export const Posts: React.FC = () => {
  const [postsResult, setPostsResult] = useState<PostsResponse>();

  const { isLoading, error } = useQuery({
    queryKey: ['postsData'],
    queryFn: () =>
      fetch('https://dummyjson.com/posts?limit=6')
        .then((res) => res.json())
        .then((data) => {
          setPostsResult({ ...data });
          return data;
        }),
  });

  return (
    <>
      <Breadcrumb />
      <SearchPosts />
      <div className="box">
        <div className="columns is-multiline">
          {isLoading && (
            <progress className="progress is-small is-primary mt-5" max="100" />
          )}
          {error instanceof Error && <ErrorMessage message={error.message} />}
          {!isLoading && !error && postsResult?.posts && (
            <PostsList posts={postsResult.posts} />
          )}
        </div>
        {!isLoading && !error && postsResult?.posts && (
          <Pagination totalPages={postsResult?.total / 6} />
        )}
      </div>
    </>
  );
};
