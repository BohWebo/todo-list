/* eslint-disable no-return-assign */
import React from 'react';
import randomstring from 'randomstring';
import TodoItem from './TodoItem';
import Button from './Button';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 'All',
      
      todos: [
        {
          id: 1,
          text: 'Take out the trash',
          completed: true,
        },
        {
          id: 2,
          text: 'Grocery shopping',
          completed: false,
        },
        {
          id: 3,
          text: 'Clean gecko tank',
          completed: false,
        },
        {
          id: 4,
          text: 'Mow lawn',
          completed: true,
        },
        {
          id: 5,
          text: 'Catch up on Arrested Development',
          completed: false,
        },
      ],
      itemText: '',
      
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
  }
  
  handleClick(id) {
    this.setState((prevState) => {
      const newTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return {
        todos: newTodos,
      };
    });
  }

  handleItemAdedd() {
    this.setState(({todos, itemText}) => {
      if (!itemText) return;

      let newTodoItem = {
        id: todos.length + 1,
        text: itemText,
        completed: false,
      };

      // eslint-disable-next-line consistent-return
      return {
        todos: [...todos, newTodoItem],
        itemText: '',
      };
    });
  }

  handleItemTextChange(text) {
    this.setState({ itemText: text });
  }

  handleChangeMode(mode) {
    this.setState({ mode });
  }

  makeTodosforRender() {
    const { mode, todos } = this.state;
    let todosForRender = todos;
    if (mode === 'Active') {
      todosForRender = todos.filter(item => item.completed === false);
    } else if (mode === 'Completed') {
      todosForRender = todos.filter(item => item.completed === true);
    }
    return todosForRender;
  }

  render() {
    const { todos, itemText } = this.state;
    const hasLeftTodos = todos.filter(item => item.completed === false);
    const todosForRender = this.makeTodosforRender();
    return (
      <div className="todo-list">
        {
          todosForRender.map(todo => (
            <>
              <TodoItem
                key={randomstring.generate(5)}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onChange={this.handleClick}
              />
            </>
          ))
        }
        <input
          className="todo_input-field"
          type="text"
          value={itemText}
          onChange={event => this.handleItemTextChange(event.target.value)}
        />
        <button
          className="todo_button-add"
          type="button"
          onClick={() => this.handleItemAdedd()}
        >
          add
        </button>

        <div className="todo_filter-buttons">
          <Button onClick={this.handleChangeMode}>
            All
          </Button>

          <Button onClick={this.handleChangeMode}>
            Active
          </Button>

          <Button onClick={this.handleChangeMode}>
            Completed
          </Button>
        </div>

        <div className="todo-hasleft">
          <p>{hasLeftTodos.length} has left</p>
        </div>
      </div>
    );
  }
}

export default App;
