import React from 'react';

interface Props {
  totalPages: number;
  currentPage: number;
  onChange: (a: number) => void;
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
  onChange: (a: number) => void;
}> = ({ totalPages, currentPage, onChange }) => {
  const pagesArray = Array.from(Array(totalPages).keys());
  if (totalPages <= 5) {
    return (
      <>
        {pagesArray.map((pageNumber, i) => (
          <PageButton
            pageNumber={pageNumber}
            isActive={currentPage === pageNumber}
            onClick={() => onChange(pageNumber)}
            key={`page-button-${i}`}
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
          onClick={() => onChange(1)}
        />
        <PageEllipsis />
        <PageButton
          pageNumber={totalPages - 3}
          isActive={currentPage === totalPages - 3}
          onClick={() => onChange(totalPages - 3)}
        />
        <PageButton
          pageNumber={totalPages - 2}
          isActive={currentPage === totalPages - 2}
          onClick={() => onChange(totalPages - 2)}
        />
        <PageButton
          pageNumber={totalPages - 1}
          isActive={currentPage === totalPages - 1}
          onClick={() => onChange(totalPages - 1)}
        />
        <PageButton
          pageNumber={totalPages}
          isActive={currentPage === totalPages}
          onClick={() => onChange(totalPages)}
        />
      </>
    );
  }
  if (currentPage > 4) {
    return (
      <>
        <PageButton pageNumber={1} onClick={() => onChange(1)} />
        <PageEllipsis />
        <PageButton
          pageNumber={currentPage - 1}
          onClick={() => onChange(currentPage - 1)}
        />
        <PageButton pageNumber={currentPage} isActive />
        <PageButton
          pageNumber={currentPage + 1}
          onClick={() => onChange(currentPage + 1)}
        />
        <PageEllipsis />
        <PageButton
          pageNumber={totalPages}
          onClick={() => onChange(totalPages)}
        />
      </>
    );
  }
  return (
    <>
      <PageButton
        pageNumber={1}
        isActive={currentPage === 1}
        onClick={() => onChange(1)}
      />
      <PageButton
        pageNumber={2}
        isActive={currentPage === 2}
        onClick={() => onChange(2)}
      />
      <PageButton
        pageNumber={3}
        isActive={currentPage === 3}
        onClick={() => onChange(3)}
      />
      <PageButton
        pageNumber={4}
        isActive={currentPage === 4}
        onClick={() => onChange(4)}
      />
      <PageEllipsis />
      <PageButton
        pageNumber={totalPages}
        onClick={() => onChange(totalPages)}
      />
    </>
  );
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onChange,
}) => {
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="pagination-previous is-clickable"
        onClick={() => {
          currentPage > 1 && onChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="pagination-next is-clickable"
        onClick={() => {
          currentPage < totalPages && onChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <ul className="pagination-list">
        <PageButtons {...{ totalPages, currentPage, onChange }} />
      </ul>
    </nav>
  );
};
