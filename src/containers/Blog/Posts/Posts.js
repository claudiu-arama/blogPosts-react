import React from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Link } from 'react-router-dom';

class Posts extends React.Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get('/posts')
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: 'Max',
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log( response );
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    // this.setState({ selectedPostId: id }); - case 1
    // case 2 - navigating programatically, mostly used after a given operation has finished
    // this.props.history.push('/' + id) - push string or object, both work
    this.props.history.push({ pathname: '/' + id });
  };

  render() {
    let posts = (
      <p style={{ textAlign: 'center' }}>Something went wrong!</p>
    );
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // pass the [link to] property, turn it into an absolute path - case 1
          // <Link to={'/' + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
            // passing props to the <Post /> component with the spread operator
            {...this.props}
          />
          // </Link> - case 1
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
