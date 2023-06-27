import { useState } from 'react';
const BlogForm = ({ replaceBlog, createBlog, blogs }) => {
  const [newTitle, setBlogTitle] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [newUrl, setUrl] = useState('');

  const handleBlogTitle = (event) => {
    setBlogTitle(event.target.value);
  };

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrl = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const alreadyExists = blogs.some((blog) => blog.title === newTitle);

    if (alreadyExists) {
      if (
        window.confirm(
          `${newTitle} is already added. Do you want to replace it with a new one`
        )
      ) {
        const blogObject = blogs.find((blog) => blog.title === newTitle);
        const newBlogObject = {
          ...blogObject,
          author: newAuthor,
          url: newUrl,
          likes: 0,
        };
        replaceBlog(blogObject, newBlogObject);
        setBlogTitle('');
        setAuthor('');
        setUrl('');
      }
    } else {
      const newBlogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0,
      };
      createBlog(newBlogObject);
      setBlogTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={handleBlogTitle}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthor}
          />
        </div>
        <div>
          Url
          <input type="text" value={newUrl} name="Url" onChange={handleUrl} />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </>
  );
};

export default BlogForm;
