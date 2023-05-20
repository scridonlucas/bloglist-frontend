import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import LoggedIn from './components/LoggedIn';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setBlogTitle] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [newUrl, setUrl] = useState('');

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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleBlogTitle = (event) => {
    setBlogTitle(event.target.value);
  };

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
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

  const addBlog = async (event) => {
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
        try {
          const responseData = await blogService.update(
            blogObject.id,
            newBlogObject
          );
          setBlogs(
            blogs.map((b) => (b.id !== newBlogObject.id ? b : responseData))
          );
          setBlogTitle('');
          setAuthor('');
          setUrl('');
          setMessage(`${newTitle} was succesfully replaced`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        } catch (exception) {
          console.log(exception);
          setMessage('Wrong creditentials');
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        }
      }
    } else {
      const newBlogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0,
      };
      try {
        const responseData = await blogService.create(newBlogObject);
        setBlogs(blogs.concat(responseData));
        setBlogTitle('');
        setAuthor('');
        setUrl('');
        setMessage(`${newTitle} was succesfully addded`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (exception) {
        setMessage('Wrong creditentials');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
  };
  return (
    <div>
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        ></LoginForm>
      )}

      {user !== null && (
        <>
          <LoggedIn user={user} handleButton={handleLogoutBtn}></LoggedIn>
          <BlogForm
            addBlog={addBlog}
            blogTitle={newTitle}
            handleBlogTitle={handleBlogTitle}
            author={newAuthor}
            handleAuthor={handleAuthor}
            url={newUrl}
            handleUrl={handleUrl}
          ></BlogForm>
        </>
      )}
      <Notification message={message} />
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleButton={handleDeleteBlogBtn}
        ></Blog>
      ))}
    </div>
  );
}

export default App;
