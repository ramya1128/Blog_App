import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Promotion from '../components/Promotion';
//import BlogList from '../components/BlogList';
//import RecentBlogs from '../components/RecentBlogs';
import Hero from '../components/Hero';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    };
    validateToken();
  }, [navigate]);
  
  return (
    <div>
      <Header />
      <Hero/>
      {/*<RecentBlogs/>
      <BlogList/>*/}
      <Promotion/>
      <Footer/>
    </div>
  );
};

export default HomePage;
