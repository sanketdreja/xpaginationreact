import React, { useState, useEffect } from "react";
import Table from "./Table";
import Pagination from "./Pagination";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    // Fetch employee data from the API
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error(error);
        alert("failed to fetch data");
      });
  }, []);

  // Calculate pagination data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (currentPage * rowsPerPage < data.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Table data={currentData} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / rowsPerPage)}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
    </div>
  );
}

export default App;
