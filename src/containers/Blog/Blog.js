import React, { Component } from 'react';
import axios from '../../axios';
import Posts from './Posts/Posts';
import './Blog.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import NewPost from '../Blog/NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                {/* set activeClassName to change class name for active link, use NavLink */}
                <NavLink
                  to="/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: '#fa923f',
                    textDecoration: 'underline',
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    // absolute path
                    pathname: '/newPost',
                    // relative path: pathname: this.props.match.url + '/newPost';
                    hash: '#submit',
                    search: '?quick-submit=true',
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
          <Route path="/" exact component={Posts} />
          {/* path: ':/' will be replaced dynamically */}
          <Route path="/newPost" exact component={NewPost} />
          {/* this is a flexible path */}
          <Route path="/:id" exact component={FullPost} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
