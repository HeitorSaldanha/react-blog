import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="is-flex is-justify-content-center is-align-items-center">
    <div className="has-text-centered">
      <h1 className="is-size-1 has-text-weight-bold has-text-primary">404</h1>
      <p className="is-size-5 has-text-weight-medium">
        <span className="has-text-danger">Page not found!</span>
      </p>
      <p className="is-size-6 mb-2">
        The page you’re looking for doesn’t exist.
      </p>
      <Link to="/">
        <button className="button is-primary">Go Home</button>
      </Link>
    </div>
  </div>
);

export const Error: React.FC<{ errorCode: number }> = ({ errorCode }) => {
  switch (errorCode) {
    case 404:
      return <NotFound />;

    default:
      return <></>;
  }
};
