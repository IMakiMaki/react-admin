import React from "react";

export const NotFound: React.FC = () => {
  return <div>404 Not Found{JSON.stringify(process.env.REACT_APP_API_BASE_URL)}</div>;
};
