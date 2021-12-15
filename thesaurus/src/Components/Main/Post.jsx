import * as React from 'react';

export const Post = ({ title, text, author }) => {
  return (
    <div className="post">
      <p className="title">{title}</p>
      <p className="text">{text}</p>
      <p className="author">Author: {author}</p>
      < ></>
    </div>
  );
};
