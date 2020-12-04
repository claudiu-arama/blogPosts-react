import React, { Component, Suspense } from 'react';
import axios from '../../axios';
import Posts from './Posts/Posts';
import './Blog.css';

import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

// HOC dynamic importing - *****
import asyncComponent from '../../HOC/asyncComponent';
// dynamic import syntax - asyncComponent is executed, is a function and the argument
// should also be a function
const AsyncNewPost = asyncComponent(() => {
  return import('../Blog/NewPost/NewPost');
});
// end of dynamic import with hoc - *******

class Blog extends Component {
  state = {
    auth: true,
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                {/* set activeClassName to change class name for active link, use NavLink */}
                <NavLink
                  to="/posts/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: '#fa923f',
                    textDecoration: 'underline',
                  }}>
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
                  }}>
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? (
            // dynamic importing with HOC -******
            <Route path="/newPost" component={AsyncNewPost} />
          ) : // end of dynamic import with HOC -*****

          null}
          {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}

          <Route path="/posts" component={Posts} />

          {/* flexible path below */}
          {/* path: '/:' will be replaced dynamically */}
          {/* <Route path="/:id" exact component={FullPost} /> */}

          {/* redirect in case of restricted access or wrong address, with <Redirect /> */}
          {/* <Redirect from="/" to="/posts" /> */}
          {/* redirect with route and no path - render for unknown route */}
          <Route
            render={() => (
              <h1 className="rootStyle">
                Oops! You are not supposed to be here! Click "Posts" or "New
                Post" at the top to go where the action is!
              </h1>
            )}
          />
          {/* end of redirect */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
