import React, { useState } from 'react';

interface Props {
  totalPages: number;
}

const PageEllipsis: React.FC = () => (
  <li>
    <span className="pagination-ellipsis">&hellip;</span>
  </li>
);

const PageButton: React.FC<{
  pageNumber: number;
  isActive?: boolean;
  onClick?: () => void;
}> = ({ pageNumber, isActive = false, onClick }) => (
  <li>
    <button
      className={`pagination-link is-clickable ${isActive && 'is-current'}`}
      aria-label={`Goto page ${pageNumber}`}
      onClick={onClick}
    >
      {pageNumber}
    </button>
  </li>
);

const PageButtons: React.FC<{
  totalPages: number;
  currentPage: number;
  setCurrentPage: (a: number) => void;
}> = ({ totalPages, currentPage, setCurrentPage }) => {
  const pagesArray = Array.from(Array(totalPages).keys());
  if (totalPages <= 5) {
    return (
      <>
        {pagesArray.map((pageNumber) => (
          <PageButton
            pageNumber={pageNumber}
            isActive={currentPage === pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
          />
        ))}
      </>
    );
  }
  if (currentPage > totalPages - 3) {
    return (
      <>
        <PageButton
          pageNumber={1}
          isActive={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        />
        <PageEllipsis />
        <PageButton
          pageNumber={totalPages - 3}
          isActive={currentPage === totalPages - 3}
          onClick={() => setCurrentPage(totalPages - 3)}
        />
        <PageButton
          pageNumber={totalPages - 2}
          isActive={currentPage === totalPages - 2}
          onClick={() => setCurrentPage(totalPages - 2)}
        />
        <PageButton
          pageNumber={totalPages - 1}
          isActive={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(totalPages - 1)}
        />
        <PageButton
          pageNumber={totalPages}
          isActive={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        />
      </>
    );
  }
  if (currentPage > 4) {
    return (
      <>
        <PageButton pageNumber={1} onClick={() => setCurrentPage(1)} />
        <PageEllipsis />
        <PageButton
          pageNumber={currentPage - 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        <PageButton pageNumber={currentPage} isActive />
        <PageButton
          pageNumber={currentPage + 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
        <PageEllipsis />
        <PageButton
          pageNumber={totalPages}
          onClick={() => setCurrentPage(totalPages)}
        />
      </>
    );
  }
  return (
    <>
      <PageButton
        pageNumber={1}
        isActive={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      />
      <PageButton
        pageNumber={2}
        isActive={currentPage === 2}
        onClick={() => setCurrentPage(2)}
      />
      <PageButton
        pageNumber={3}
        isActive={currentPage === 3}
        onClick={() => setCurrentPage(3)}
      />
      <PageButton
        pageNumber={4}
        isActive={currentPage === 4}
        onClick={() => setCurrentPage(4)}
      />
      <PageEllipsis />
      <PageButton
        pageNumber={totalPages}
        onClick={() => setCurrentPage(totalPages)}
      />
    </>
  );
};

const Pagination: React.FC<Props> = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="pagination-previous is-clickable"
        onClick={() => {
          currentPage > 1 && setCurrentPage(currentPage - 1);
        }}
      >
        Previous
      </button>
      <button
        className="pagination-next is-clickable"
        onClick={() => {
          currentPage < totalPages && setCurrentPage(currentPage + 1);
        }}
      >
        Next page
      </button>
      <ul className="pagination-list">
        <PageButtons {...{ totalPages, currentPage, setCurrentPage }} />
      </ul>
    </nav>
  );
};

export default Pagination;
