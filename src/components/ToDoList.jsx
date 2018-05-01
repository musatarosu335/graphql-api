import React from 'react';
// import ToDo from './ToDo';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [ // ダミーデータ
        { id: '1', title: 'Todo 1' },
        { id: '2', title: 'Todo 2' },
      ],
    };
  }

  render() {
    return (
      <div>
        {this.state.todoList.map(todo => (
          <p key={todo.key}>{todo.title}</p>
        ))}
      </div>
    );
  }
}
