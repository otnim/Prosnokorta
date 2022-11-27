import React from "react";
import { Link } from "react-router-dom";

const StudentLeftNav = () => {
  return (
    <div className="bg-secondary left-nav d-flex flex-column">

      <Link to="/student/participated" className="btn btn-secondary m-1">
        All Participated Questions Set
      </Link>

      <Link to="/student/joinset" className="btn btn-secondary m-1">
        Join Set
      </Link>
      <Link to="/student/giveexam" className="btn btn-secondary  m-1">
        Give Exam
      </Link>
    </div>
  );
};

export default StudentLeftNav;
