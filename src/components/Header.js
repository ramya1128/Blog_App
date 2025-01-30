import React from 'react';
import '../App.css';
//import {Link} from 'react-router-dom';
import ProfilePage from '../Pages/ProfilePage';
//import BlogModal from './BlogModal';
//{isBlogModalOpen && <BlogModal onClose={toggleBlogModal} className="blog-modal" />} create BlogModel.js in components

const Header = () => {
 /* const [isBlogModalOpen, setBlogModalOpen] = useState(false);

  const toggleBlogModal = () => {
    setBlogModalOpen(!isBlogModalOpen);
  };*/

  return (
    <header className="header">
      <h1 className="header-title">Blog It !</h1>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item1"><a href="#subscribe" className="nav-link1">Subscribe</a></li>
          <li className="nav-item1">
            {/*<button onClick={toggleBlogModal} className="nav-btn1"><a href="/blogs">My Blogs</a></button>*/}
            <li className="nav-item1"><a className="nav-link1" href="/blogs">My Blog</a></li>
          </li>
          <li className="nav-item1"><a href="/blogs/create" className="nav-link1">Create Blog</a></li>
          <li className="nav-item"><ProfilePage className="profile-page" /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
