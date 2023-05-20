const Blog = ({ title, author, deleteBtn }) => {
  return (
    <div>
      {title} {author}{' '}
      <button type="button" onClick={deleteBtn}>
        Delete
      </button>
    </div>
  );
};

const Blogs = ({ blog, handleButton }) => {
  return (
    <>
      <Blog
        title={blog.title}
        author={blog.author}
        deleteBtn={() => {
          handleButton(blog.id);
        }}
      ></Blog>
    </>
  );
};
export default Blogs;
