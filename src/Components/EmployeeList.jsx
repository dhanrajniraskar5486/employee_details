import { useNavigate } from "react-router-dom";

export default function EmployeeList({ employee }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div className="p-10 w-full">
      {employee.length === 0 ? (
        <p className="text-center text-gray-500">No employees available</p>
      ) : (
        <ul role="list" className="divide-gray-100">
          {employee.map((person) =>
            person && person.name ? (
              <li
                key={person.uniqueId}
                className="flex justify-between py-5 px-4 hover:bg-slate-400 hover:rounded cursor-pointer"
                onClick={() => handleClick(person.id)}
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt={person.name}
                    src={person.avatar}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-m font-semibold leading-6 text-gray-900">
                      {person.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-900">
                      {person.emailId}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.mobile}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Country: {person.country}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    State: {person.state}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    District: {person.district}
                  </p>
                </div>
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
}