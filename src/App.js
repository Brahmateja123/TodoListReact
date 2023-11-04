
import React, { Component } from 'react';
import './TodoList.css'; // Import the CSS file

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: '',
      showCompleted: false,
    };
  }

  componentDidMount() {
    // You can fetch initial data or perform other tasks here
    // Currently, it's left empty for this example.
  }

  handleAddTodo = () => {
    if (this.state.newTodo.trim() === '') {
      return;
    }

    const newTodo = {
      title: this.state.newTodo,
      completed: false,
      id: Date.now(),
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
      newTodo: '',
    }));
  }

  handleDeleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  handleEditTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }
        return todo;
      }),
    }));
  }

  handleToggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    }));
  }

  render() {
    const { todos, newTodo, showCompleted } = this.state;

    return (
      <div className="todo-app">
        <h1>Todo List</h1>
        <div className="add-todo">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => this.setState({ newTodo: e.target.value })}
          />
          <button onClick={this.handleAddTodo}>Add</button>
        </div>

        <div className="show-completed">
          <label>
            Show Completed
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => this.setState({ showCompleted: !showCompleted })}
            />
          </label>
        </div>

        <ul className="todo-list">
          {todos
            .filter(todo => !showCompleted || todo.completed)
            .map(todo => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <div className="todo-item">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => this.handleToggleComplete(todo.id)}
                  />
                  <span>{todo.title}</span>
                </div>
                <div className="todo-actions">
                  <button onClick={() => this.handleEditTodo(todo.id, prompt('Edit Task:', todo.title))}>Edit</button>
                  <button onClick={() => this.handleDeleteTodo(todo.id)}>Delete</button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;