import React from 'react';
// import HOC for accessing props in wrapped component => 'Route-aware'.
// import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => {
  return (
    <article className="Post" onClick={props.clicked}>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.author}</div>
      </div>
    </article>
  );
};

export default post;
