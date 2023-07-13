import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bulma/css/bulma.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Posts } from './pages/Posts';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PostDetail } from './pages/PostDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Posts />,
  },
  {
    path: 'post/:id',
    element: <PostDetail />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">React Blog</p>
        </div>
      </section>
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <RouterProvider router={router} />
          </div>
        </div>
      </section>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
