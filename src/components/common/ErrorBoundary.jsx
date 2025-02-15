import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="container max-w-[88rem] mx-auto px-4 min-h-screen mt-[73px] md:mt-[92px] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-4">
          {error?.message || "An unexpected error occurred"}
        </p>
        <Link to="/" className="text-[#88B537] hover:underline">
          ← Back to Home page
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;
