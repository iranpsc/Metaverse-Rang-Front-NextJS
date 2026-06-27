import React, { useState } from "react";

const Pagination = () => {
  const sampleData = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },

    // ... داده‌های دیگر
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sampleData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (!Number.isFinite(pageNumber)) return;
    const safePageNumber = Math.min(
      totalPages,
      Math.max(1, Math.trunc(pageNumber))
    );
    setCurrentPage(safePageNumber);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-3">
        {currentItems.map((item) => (
          <div key={item.id}>{item.text}</div>
        ))}
      </div>
      <div className="flex flex-row">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          قبلی
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <div
            className=" px-1 flex flex-row justify-center items-center"
            key={index + 1}
          >
            <button
              className={`min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm transition-all duration-300 ease-in-out ${
                currentPage === index + 1
                  ? "bg-error w-[20px] h-[5px]"
                  : "bg-singleVideo-gray w-[12px] h-[5px]"
              }`}
              onClick={() => handlePageChange(index + 1)}
              aria-label={`Page ${index + 1}`}
              aria-current={currentPage === index + 1 ? "page" : undefined}
            >
              {index + 1}
            </button>
          </div>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default Pagination;
