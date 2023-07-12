import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Post, User } from 'src/types/types';

export const PostDetail: React.FC = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState('');
  const { isLoading, error, data } = useQuery({
    queryKey: ['postsData'],
    queryFn: () =>
      fetch(`https://dummyjson.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          fetch('https://dummyjson.com/users/1')
            .then((res) => res.json())
            .then((data: User) =>
              setAuthor(`${data.firstName} ${data.lastName}`)
            );
          return data as Post;
        }),
  });
  console.log({ data });
  return (
    <>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="box">
              <h1 className="title is-3">{data?.title}</h1>
              <h2 className="title is-5">{`Author: ${author}`}</h2>
              <p>{data?.body}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
