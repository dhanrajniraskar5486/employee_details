import { useState, useEffect } from "react";

export default function DropdownSelect({
  defaultOption,
  options,
  label,
  onChange,
}) {
  const [selectedOption, setSelectedOption] = useState(defaultOption || "");

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <label className="block text-md font-medium ">{label}</label>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="border mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="" disabled>
          Select Country
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.country}>
            {option.country}
          </option>
        ))}
      </select>
    </div>
  );
}