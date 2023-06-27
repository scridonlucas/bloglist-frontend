import { useState } from 'react';

const Blog = ({ title, author, url, likes, user, deleteBtn, likeBtn }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div>
      {title}
      <button
        type="button"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? 'Hide' : 'View'}
      </button>
      <button type="button" onClick={deleteBtn}>
        Delete
      </button>
      <div style={showWhenVisible}>
        <div>author: {author}</div>
        <div>url: {url}</div>
        <div>
          likes: {likes}{' '}
          <button type="button" onClick={likeBtn}>
            like
          </button>
        </div>
        <div>user: {user.username}</div>
      </div>
    </div>
  );
};

const Blogs = ({ blog, handleDeleteButton, likeBlog }) => {
  const handleLikeBlogBtn = () => {
    const newBlogObject = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlog(blog, newBlogObject);
  };
  return (
    <>
      <Blog
        title={blog.title}
        author={blog.author}
        url={blog.url}
        likes={blog.likes}
        user={blog.user}
        deleteBtn={() => {
          handleDeleteButton(blog.id);
        }}
        likeBtn={handleLikeBlogBtn}
      ></Blog>
    </>
  );
};
export default Blogs;
