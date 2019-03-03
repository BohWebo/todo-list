import React from 'react';

const TodoItem = ({ completed, text, id, onChange }) => (
  <div className="todo-item">
    <input
      className="todo-checkbox"
      type="checkbox"
      checked={completed}
      onChange={() => onChange(id)}
    />
    <span
      className={completed ? 'checked' : ''}
    >
      {text}
    </span>
  </div>
);

export default TodoItem;
