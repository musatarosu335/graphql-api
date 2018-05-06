import React from 'react';
// import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// Queryを定義
const TODOS_QUERY = gql`
  query ToDosQuery {
    todos {
      id,
      title
    }
  }
`;

const ToDoList = (props) => {
  if (props.data && props.data.loading) {
    return (
      <div>Now loading...</div>
    );
  }

  // Queryで所得したデータの初期化
  const todoList = props.data.todos;

  return (
    <div>
      {todoList.map(todo => (
        <p key={todo.key}>{todo.title}</p>
      ))}
    </div>
  );
};

export default graphql(TODOS_QUERY)(ToDoList);
