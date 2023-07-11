import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PostsResponse, Post } from 'src/types/types';
import PostCard from 'src/components/PostCard/PostCard';
import Pagination from 'src/components/Pagination/Pagination';

const SearchPosts: React.FC = () => {
  return (
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
};

export const Posts: React.FC = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['postsData'],
    queryFn: () =>
      fetch('https://dummyjson.com/posts?limit=6').then((res) => res.json()),
  });

  if (isLoading) return <>'Loading...'</>;

  // if (error) return 'An error has occurred: ' + error.message;

  const { posts, total } = data;
  const totalPages = total / 6;

  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Posts</p>
        </div>
      </section>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <SearchPosts />
            <div className="box">
              <div className="columns is-multiline">
                {posts.map((post: Post) => {
                  const { title, body, tags, reactions } = post;
                  return (
                    <div className="column is-half">
                      <PostCard {...{ title, body, tags, reactions }} />
                    </div>
                  );
                })}
              </div>
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
