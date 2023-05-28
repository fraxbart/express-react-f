import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import '../styles/usersList.css'



const UsersList = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(3);

  const getUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/users?page=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();
      setData(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [page, pageSize]);

  const handleClick = (e) => {
    setPage(e.selected + 1);
  };

  return (
    <div >
    <ul>
      {data &&
        data.users?.map((user) => {
          return (
            <li className="list-group-item"key={user._id} >
              {user.username} 
            </li>
          );
        })}
    </ul>
    <div >
      <ReactPaginate
        breakLabel="..."
        pageCount={data.totalPage}
        nextLabel="Successivo"
        previousLabel="Precedente"
        onClick={handleClick}
        containerClassName={"pagination"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        disabledClassName={"page-item disabled"}
        activeClassName={"page-item active"}
        pageClassName="page-item"
      />
    </div>
  </div>
);
};

export default UsersList;
