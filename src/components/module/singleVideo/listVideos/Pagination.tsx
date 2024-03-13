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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          قبلی
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <div className=" px-1 flex flex-row justify-center items-center">
            <button
              className={`h-[5px] rounded-sm transition-all duration-300 ease-in-out ${
                currentPage === index + 1
                  ? "bg-error w-[20px]"
                  : "bg-singleVideo-gray w-[12px]"
              }`}
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {/* متن دکمه */}
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
