import React, { Component, Suspense } from 'react';
import axios from '../../axios';
import Posts from './Posts/Posts';
import './Blog.css';

// react 16.6 and higher => use React.lazy for Lazy Loading =>
const NewPost = React.lazy(() => import('../Blog/NewPost/NewPost'));
// end of React.lazy

import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import NewPost from '../Blog/NewPost/NewPost';
import asyncComponent from '../../HOC/asyncComponent';

// dynamic import syntax - imported
// const AsyncNewPost = asyncComponent(() => {
//   return import('../Blog/NewPost/NewPost');
// });
// end of dynamic import with hoc

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
          {this.state.auth ? (
            // dynamic importing with HOC
            // <Route path="/newPost" component={AsyncNewPost} />
            // end of dynamic import with HOC

            // to lazy render the Posts, we use Suspense Component, imported at the top.
            <Route
              path="/newPost"
              render={() => (
                <Suspense fallback={<div>Loading...</div>}>
                  <NewPost {...this.props} />
                </Suspense>
              )}
            />
          ) : null}
          {/* end of lazy render*/}

          {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}

          <Route path="/posts" component={Posts} />

          {/* flexible path below */}
          {/* path: '/:' will be replaced dynamically */}
          {/* <Route path="/:id" exact component={FullPost} /> */}

          {/* next 2 lines- redirect in case of restricted access or wrong address, 2 ways of doing it */}
          {/* <Redirect from="/" to="/posts" /> */}
          <Route
            render={() => (
              <h1 className="rootStyle">
                Opps! you are not supposed to be here! Click "Posts"
                or "New Post" at the top of the back to go back to
                normality!
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
