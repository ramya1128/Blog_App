import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/blogs')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBlogs(data); // If data is an array, set it directly
                } else if (data.blogs && Array.isArray(data.blogs)) {
                    setBlogs(data.blogs); // If data is an object with a "blogs" array
                } else {
                    console.error('Invalid data format:', data);
                    setBlogs([]); // Fallback to empty array
                }
            })
            .catch((error) => console.error('Error fetching blogs:', error));
    }, []);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-4 text-center" id='blogs'>
            <h2 className="mb-4 center">BLOGS</h2>
            <div className="list-group d-flex flex-column align-items-center">
                {currentBlogs.map((blog) => (
                    <div
                    key={blog._id}
                    className="blog-container mb-4 p-3 border rounded shadow"
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <h5>{blog.title}</h5>
                    <hr />
                    <div>
                        <p>
                            {blog.author} <span>| {blog.category}</span>
                        </p>
                        <p className="text-muted" >{new Date(blog.createdAt).toDateString()}</p>
                    </div>
                    <p>
                        {blog.content.length > 200 ? `${blog.content.substring(0, 270)}...` : blog.content}
                    </p>
                </div>
                
                
                ))}
            </div>

            <Pagination className="mt-4 d-flex justify-content-center">
                {[...Array(Math.ceil(blogs.length / blogsPerPage)).keys()].map((number) => (
                    <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default BlogList;
