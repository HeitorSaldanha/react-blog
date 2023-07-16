import React, { useState } from 'react';
import { Post } from 'src/types';
import { Breadcrumb, Pagination, PostCard, Loader } from 'src/components';
import { usePostsQuery } from 'src/hooks/useQueries';

const SearchPosts: React.FC<{
  value: string;
  onSubmit: () => void;
  onChange: (a: string) => void;
}> = ({ value, onSubmit, onChange }) => {
  const handleSearch = async (ev: React.FormEvent) => {
    ev.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={(ev) => handleSearch(ev)} data-testid="search-post">
      <div className="columns is-centered mb-2">
        <div className="column is-half">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Find post"
                value={value}
                onChange={(ev) => onChange(ev.target.value)}
              />
            </div>
            <div className="control">
              <button className="button is-info" type="submit">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const ErrorMessage: React.FC<{ error: Error }> = ({ error }) => (
  <div className="column is-full">
    <div className="notification is-danger is-light has-text-centered">
      <h1 className="title is-3">Failed to load posts</h1>
      <h2 className="subtitle is-5">{error.message}</h2>
    </div>
  </div>
);

const PostsList: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <>
    {posts.map((post, i) => (
      <div
        key={`post-card-${i}`}
        className="column is-half"
        data-testid="post-card"
      >
        <PostCard {...post} />
      </div>
    ))}
  </>
);

export const Posts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  const { isLoading, isError, error, data, refetch } = usePostsQuery({
    page,
    filter,
  });

  const { posts, total = 0 } = data || {};

  return (
    <>
      <Breadcrumb />
      <SearchPosts value={filter} onChange={setFilter} onSubmit={refetch} />
      <div className="box">
        <div className="columns is-multiline">
          {isLoading && <Loader />}
          {isError && <ErrorMessage error={error as Error} />}
          {!isLoading && !isError && posts && <PostsList posts={posts} />}
        </div>
        {!isLoading && !isError && posts && total > 6 && (
          <Pagination
            totalPages={Math.ceil(total / 6)}
            currentPage={page}
            onChange={setPage}
          />
        )}
      </div>
    </>
  );
};
