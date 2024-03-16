export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ page, pages, onPageChange }: PaginationProps) {
  const totalPages = [];
  for (let i = 1; i <= pages; i++) {
    totalPages.push(i);
  }

  return (
    <div className="flex justify-center">
      {pages !== 0 && (
        <ul className="flex border-2 border-secondaryMain">
          {totalPages.map((pageNumber, idx) => {
            return (
              <li
                onClick={() => onPageChange(pageNumber)}
                className={`px-2 py-1 cursor-pointer ${
                  page === pageNumber ? "bg-gray-200" : ""
                }`}
                key={idx}
              >
                {pageNumber}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default Pagination;
