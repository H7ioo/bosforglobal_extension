import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PreviousPageButton = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="pb-2">
      <button
        className="font-bold text-base bg-red-200 p-2 text-left px-4"
        onClick={() => {
          navigate(-1);
        }}
      >
        {"<"}
      </button>
    </div>
  );
};

export default PreviousPageButton;
