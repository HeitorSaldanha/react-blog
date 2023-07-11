import React from 'react';

interface Props {
  totalPages?: number;
  currentPage?: number;
}

const Pagination: React.FC<Props> = ({ totalPages = 0, currentPage = 0 }) => {
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <button className="pagination-previous">Previous</button>
      <button className="pagination-next">Next page</button>
      <ul className="pagination-list">
        <li>
          <button className="pagination-link" aria-label="Goto page 1">
            1
          </button>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <button className="pagination-link" aria-label="Goto page 45">
            45
          </button>
        </li>
        <li>
          <button
            className="pagination-link is-current"
            aria-label="Page 46"
            aria-current="page"
          >
            46
          </button>
        </li>
        <li>
          <button className="pagination-link" aria-label="Goto page 47">
            47
          </button>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <button
            className="pagination-link"
            aria-label={`Goto page ${totalPages}`}
          >
            {totalPages}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
