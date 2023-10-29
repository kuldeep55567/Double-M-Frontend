import React, { useState, useRef, useEffect } from 'react';

function MultiSelect({ options, selected, setSelected, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleSelection = (option) => {
    if (selected.length < 2 || selected.includes(option)) {
      setSelected((prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((item) => item !== option)
          : [...prevSelected, option]
      );
    }
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="block text-sm font-medium text-white">{title}</div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 block w-full rounded-md bg-white border-2 focus:ring-indigo-500 sm:text-sm border-gray-300"
      >
        {selected.length ? selected.join(', ') : 'Select...'}
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full py-1 bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option) => (
            <li key={option}>
              <button
                onClick={() => toggleSelection(option)}
                className={`block w-full text-left px-3 py-2 ${selected.includes(option) ? 'bg-indigo-500 text-white' : 'text-black'} hover:bg-indigo-500 hover:text-white`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {selected.map((item) => (
          <span
            key={item}
            className="px-3 py-1 rounded-full bg-indigo-500 text-white"
          >
            {item}
            <button
              onClick={() => setSelected((prev) => prev.filter((i) => i !== item))}
              className="ml-2 text-xs"
            >
              x
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
export default MultiSelect;
