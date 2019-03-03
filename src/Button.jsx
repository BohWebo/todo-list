import React from 'react';

const Button = ({ children, onClick }) => (
  <button
    type="button"
    className="todo_filter-button"
    onClick={() => onClick(children)}
  >
    {children}
  </button>
);

export default Button;
