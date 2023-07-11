import React from 'react';
import { PostsResponse, Post } from 'src/types/types';

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
            <div className="box"></div>
          </div>
        </div>
      </section>
    </>
  );
};
