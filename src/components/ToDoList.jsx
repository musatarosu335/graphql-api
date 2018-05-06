import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

// Queryを定義
const TODOS_QUERY = gql`
  query ToDosQuery {
    todos {
      id,
      title
    }
  }
`;

// Mutationを定義
const ADD_MUTATION = gql`
  mutation AddMutation($input: ToDoInput) {
    addToDo(input: $input) {
      title
    }
  }
`;

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  addToDo() {
    // Mutationを実行
    this.props.addMutation({
      variables: {
        input: {
          title: this.state.title,
        },
      },
      refetchQueries: [{ query: TODOS_QUERY }],
    }).then(({ data }) => console.log(data.addToDo));
    this.setState({
      title: '',
    });
  }

  render() {
    if (this.props.data && this.props.data.loading) {
      return (
        <div>Now loading...</div>
      );
    }

    // Queryで所得したデータの初期化
    const todoList = this.props.data.todos;

    return (
      <div>
        <input
          type="text"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <button
          type="submit"
          onClick={() => this.addToDo()}
        >
          追加
        </button>
        {todoList.map(todo => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </div>
    );
  }
}

ToDoList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default compose(
  graphql(TODOS_QUERY),
  graphql(ADD_MUTATION, { name: 'addMutation' }),
)(ToDoList);
