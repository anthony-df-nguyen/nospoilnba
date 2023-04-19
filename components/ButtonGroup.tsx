import React from "react";

export default function ButtonGroup({handlers}) {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
        {/* Previous Day */}
      <button
        onClick={handlers[0]}
        type="button"
        className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
        Back
      </button>
      {/* Today */}
      <button
        onClick={handlers[1]}
        type="button"
        className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
        Today
      </button>
      {/* Next Day */}
      <button
        onClick={handlers[2]}
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
        Forward
      </button>
    </span>
  );
}
