import React from "react";
import { Link } from "react-router-dom";

const AuthorLeftNav = () => {
    return (
        <div className="bg-secondary left-nav d-flex flex-column">

            <Link to="/author" className="btn btn-secondary m-1">
                Manage Question in A set
            </Link>
            <Link to="/author/addset" className="btn btn-secondary m-1">
                Add Set
            </Link>

            <Link to="/author/approvestudent" className="btn btn-secondary m-1">
                Approve Students To Sets
            </Link>


            <Link to="/author/newquestion" className="btn btn-secondary m-1">
                Add new Question To Hub
            </Link>



            {/* <Link to="/author/product/new" className="btn btn-secondary  m-1">
        Add new Product
      </Link>
      <Link to="/author/category/manage" className="btn btn-secondary  m-1">
        Manage Categories
      </Link>
      <Link to="/author/orders/manage" className="btn btn-secondary  m-1">
        Manage Orders
      </Link>
      <Link to="/author/user" className="btn btn-secondary  m-1">
        Manage User
      </Link> */}
        </div>
    );
};

export default AuthorLeftNav;
