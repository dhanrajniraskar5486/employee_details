import React, { useEffect, useState } from "react";
import EmployeeList from "./EmployeeList";
import axios from "axios";
import { CreateEmployee } from "./CreateEmployee";

const Home = () => {
  const [searchEmployeeId, setSearchEmployee] = useState("");
  const [employee, setEmployee] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getEmployeeList();
  }, []);

  employee.forEach((data) => {
    data["uniqueId"] = `${data.name.substring(0, 5)}-${data.id}-${Math.floor(
      Math.random() * 10
    )}`;
  });

  async function handleSearchClick() {
    if (searchEmployeeId && searchEmployeeId.length > 0) {
      try {
        const employeeList = await axios.get(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${searchEmployeeId}`
        );
        setEmployee([employeeList.data]);
      } catch {
        setEmployee([]);
      }
    } else {
      const employeeList = await axios.get(
        "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee"
      );
      setEmployee(employeeList.data);
    }
  }

  async function getEmployeeList() {
    const employeeList = await axios.get(
      "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee"
    );
    setEmployee(employeeList.data);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-10 space-y-7">
        <div className="flex items-center w-full space-x-4">
          <input
            type="text"
            placeholder="Search employee records..."
            className="flex-grow px-4 py-2 h-14 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            onChange={(e) => {
              setSearchEmployee(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 h-14 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-xl"
            onClick={handleSearchClick}
          >
            Search
          </button>
          <button
            onClick={handleOpen}
            className="px-4 py-2 h-14 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-xl"
          >
            Add Employee
          </button>
        </div>
        <EmployeeList employee={employee} />
      </div>

      {open && (
        <CreateEmployee
          handleClose={handleClose}
          action={{ action: "ADD_EMPLOYEE", title: "Add New Employee" }} 
        />
      )}
    </>
  );
};

export default Home;
