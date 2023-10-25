import React from 'react';
import { Pagination } from 'react-bootstrap';

function DynamicPagination({ total, selected, handlePageChange }) {
  const pages = [];

  const generatePages = (totalPages, currentPage) => {
    const pagination = [];
    const maxAdjacentPages = 2; // Number of adjacent pages to show

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
      if (currentPage > maxAdjacentPages + 1) {
        startPage = currentPage - maxAdjacentPages;
      }

      if (currentPage < totalPages - maxAdjacentPages) {
        endPage = currentPage + maxAdjacentPages;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (startPage !== 1) {
      pagination.unshift(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    if (endPage !== totalPages) {
      pagination.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }

    return pagination;
  };

  if (total <= 1) {
    return null; // No need to show pagination if there's only one page
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev
        onClick={() => handlePageChange(Math.max(selected - 1, 1))}
      />
      {generatePages(total, selected)}
      <Pagination.Next
        onClick={() => handlePageChange(Math.min(selected + 1, total))}
      />
      <Pagination.Last onClick={() => handlePageChange(total)} />
    </Pagination>
  );
}

export default DynamicPagination;
