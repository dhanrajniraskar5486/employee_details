import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateEmployee } from "./CreateEmployee";

export default function EmployeeDetail() {
  const nav = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    fetchEmployee();
  };
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
      );
      setEmployee(response.data);
    } catch (error) {
      setEmployee(null);
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, [id]);

  async function handleDeleteEmployee() {
    const confirm = window.confirm(
      `Are you sure you want to delete Employee with ID : ${id}`
    );
    if (!confirm) {
      return;
    }
    const response = await axios.delete(
      `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
    );
    nav("/");
  }
  if (!employee) {
    return (
      <div className="p-10 flex justify-center items-center min-h-screen">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  function handleBacktoRecords() {
    nav("/");
  }

  return (
    <>
      <div className="p-10 m-10 max-w-3xl mx-auto bg-slate-300 rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col bg-slate-800 p-3 rounded items-center">
          <h1 className="text-4xl font-bold text-white m-3">
            Employee Details
          </h1>
        </div>
        <div className="flex items-center  space-x-6 mb-6 p-5">
          <img
            alt={employee.name}
            src={employee.avatar}
            className="h-32 w-32 rounded-full border-4 border-indigo-500 shadow-lg"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {employee.name}
            </h1>
            <p className="text-xl text-gray-700 mb-2">{employee.emailId}</p>
            <p className="text-lg text-gray-600">{employee.mobile}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
          <p className="text-xl font-semibold text-gray-800 mb-2">Address:</p>
          <p className="text-lg text-gray-600">{employee.country}</p>
          <p className="text-lg text-gray-600">{employee.state}</p>
          <p className="text-lg text-gray-600">{employee.district}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <p className="text-xl font-semibold text-gray-800 mb-2">Details:</p>
          <p className="text-lg text-gray-600">
            ID: <span className="font-medium text-gray-900">{employee.id}</span>
          </p>
          <p className="text-lg text-gray-600">
            Created At:{" "}
            <span className="font-medium text-gray-900">
              {new Date(employee.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div className="flex flex-row p-5 justify-center space-x-2">
          <button
            onClick={handleOpen}
            className="px-4 py-2 h-14 bg-amber-800 text-white rounded-md hover:bg-amber-900 text-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteEmployee}
            className="px-4 py-2 h-14 bg-red-600 text-white rounded-md hover:bg-red-700 text-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Delete
          </button>
          <button
            onClick={handleBacktoRecords}
            className="px-4 py-2 h-14 bg-gray-800 text-white rounded-md hover:bg-gray-900 text-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Back to Records
          </button>
        </div>
      </div>
      {open && (
        <CreateEmployee
          handleClose={handleClose}
          action={{ action: "EDIT_EMPLOYEE", title: "Edit Employee" }}
          id={id}
        />
      )}
    </>
  );
}
