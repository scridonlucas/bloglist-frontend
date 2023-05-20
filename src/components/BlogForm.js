const BlogForm = ({
  addBlog,
  blogTitle,
  handleBlogTitle,
  author,
  handleAuthor,
  url,
  handleUrl,
}) => {
  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={handleBlogTitle}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthor}
          />
        </div>
        <div>
          Url
          <input type="text" value={url} name="Url" onChange={handleUrl} />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </>
  );
};

export default BlogForm;
