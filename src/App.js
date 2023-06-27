import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import LoggedIn from './components/LoggedIn';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteBlogRef = useRef();

  useEffect(() => {
    (async () => {
      const response = await blogService.getAll();
      setBlogs(response);
    })();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setMessage(`${username} successfully logged in`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage('Wrong creditentials');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogoutBtn = (event) => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleDeleteBlogBtn = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        setMessage(`${blog.title} was successfully removed.`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (exception) {
        setMessage('Error!');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
  };

  const replaceBlog = async (blogObject, newBlogObject) => {
    try {
      const responseData = await blogService.update(
        blogObject.id,
        newBlogObject
      );
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
      setMessage(`${blogObject.title} was successfully replaced.`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage('Error!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const createBlog = async (newBlogObject) => {
    noteBlogRef.current.toggleVisibility();
    try {
      const responseData = await blogService.create(newBlogObject);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
      setMessage(`${responseData.title} was successfully created.`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage('Error!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const likeBlog = async (blogObject, newBlogObject) => {
    try {
      const responseData = await blogService.update(
        blogObject.id,
        newBlogObject
      );
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
      setMessage(`${blogObject.title} was successfully liked.`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage('Error!');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      {user === null && (
        <Togglable buttonLabel="Log in">
          <LoginForm login={login}></LoginForm>
        </Togglable>
      )}

      {user !== null && (
        <>
          <LoggedIn user={user} handleButton={handleLogoutBtn}></LoggedIn>
          <Togglable buttonLabel="Add a blog" ref={noteBlogRef}>
            <BlogForm
              replaceBlog={replaceBlog}
              createBlog={createBlog}
              blogs={blogs}
            ></BlogForm>
          </Togglable>
        </>
      )}
      <Notification message={message} />
      <h2>Blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDeleteButton={handleDeleteBlogBtn}
            likeBlog={likeBlog}
          ></Blog>
        ))}
    </div>
  );
}

export default App;
