import axios from "axios";
import React, { act, useEffect, useState } from "react";
import DropdownSelect from "./DropdownSelect";

export const CreateEmployee = ({ handleClose, action, id }) => {
  const [employeeC, setEmployeeC] = useState({
    name: "",
    emailId: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });
  const [countryList, setCountryList] = useState([]);

  const fetchCountry = async () => {
    const response = await axios.get(
      `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country`
    );
    setCountryList([...response.data]);
  };

  useEffect(() => {
    fetchCountry();
   }, []);

  if (action.action === "EDIT_EMPLOYEE") {
    useEffect(() => {
      const fetchEmployee = async () => {
        const response = await axios.get(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
        );
        setEmployeeC({ ...response.data });
       };
      fetchEmployee();
    }, []);
  }

  async function handleEmployeeCreate(event) {
    event.preventDefault();

    if (action.action === "EDIT_EMPLOYEE") {
      try {
        const response = await axios.put(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
          employeeC
        );
        handleClose();
        window.confirm(
          `Employee Updated successfully with ID : ${response.data.id}`
        );
      } catch (error) {
        console.error("Error Updating employee data:", error);
      }
    } else {
      try {
        const response = await axios.post(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee`,
          employeeC
        );
        handleClose();
        window.confirm(
          `Employee created successfully with ID : ${response.data.id}`
        );
      } catch (error) {
        console.error("Error creating employee data:", error);
      }
    }
  }
  const handleDropdownChange = (value) => {
     setEmployeeC({
      ...employeeC,
      country: value,
    });
  };
  return (
    <div>
      <div className="fixed inset-0 p-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold mb-4">{action.title}</h2>
          <form onSubmit={handleEmployeeCreate}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                onChange={(e) => {
                  setEmployeeC({ ...employeeC, name: e.target.value });
                }}
                value={employeeC.name}
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="emailId"
                className="block text-sm font-medium text-gray-700"
              >
                Email ID
              </label>
              <input
                onChange={(e) => {
                  setEmployeeC({
                    ...employeeC,
                    emailId: e.target.value,
                  });
                }}
                value={employeeC.emailId}
                type="email"
                id="emailId"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile
              </label>
              <input
                onChange={(e) => {
                  setEmployeeC({ ...employeeC, mobile: e.target.value });
                }}
                value={employeeC.mobile}
                type="tel"
                id="mobile"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Select Country
              </label>
              <div className="mb-4 flex items-center justify-center">
                <DropdownSelect
                  defaultOption={employeeC.country}
                  options={countryList}
                  onChange={handleDropdownChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                onChange={(e) => {
                  setEmployeeC({ ...employeeC, state: e.target.value });
                }}
                value={employeeC.state}
                type="text"
                id="state"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-700"
              >
                District
              </label>
              <input
                onChange={(e) => {
                  setEmployeeC({
                    ...employeeC,
                    district: e.target.value,
                  });
                }}
                value={employeeC.district}
                type="text"
                id="district"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              {action.title}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
