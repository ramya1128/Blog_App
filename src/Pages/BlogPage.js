import React, { useEffect, useState } from "react";
import "./home.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [editBlogId, setEditBlogId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://blog-backend-1-vx3l.onrender.com/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch(`https://blog-backend-1-vx3l.onrender.com/delete-blog/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage("Blog deleted successfully");
        fetchBlogs();
      } else {
        setErrorMessage("Error deleting blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      setErrorMessage("An error occurred while deleting the blog.");
    }
  };

  const handleUpdate = async (id) => {
    const updatedBlog = {
      title: editTitle,
      content: editContent,
      category: editCategory,
      author: editAuthor,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://blog-backend-1-vx3l.onrender.com/update-blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBlog),
      });

      if (response.ok) {
        setSuccessMessage("Blog updated successfully");
        setEditBlogId(null);
        fetchBlogs();
      } else {
        setErrorMessage("Error updating blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setErrorMessage("An error occurred while updating the blog.");
    }
  };

  return (
    <div className="blog-container">
      <h2 className="blog-header">My Blogs</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="blog-list">
        {blogs.length > 0 ? (
          <div className="blog-row">
            {blogs.map((blog) => (
              <div key={blog._id} className="blog-item">
                {editBlogId === blog._id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      className="edit-input"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Edit title"
                    />
                    <textarea
                      className="edit-textarea"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      placeholder="Edit content"
                    />
                    <input
                      type="text"
                      className="edit-input"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      placeholder="Edit category"
                      readOnly
                    />
                    <input
                      type="text"
                      className="edit-input"
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                      placeholder="Edit author"
                      readOnly
                    />
                    <div className="edit-buttons">
                      <button className="save-btn" onClick={() => handleUpdate(blog._id)}>
                        Save
                      </button>
                      <button className="cancel-btn" onClick={() => setEditBlogId(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="blog-content">
                    <h3 className="blog-title">{blog.title}</h3>
                    {blog.image && (
                      <img
                        src={`http://localhost:4000${blog.image}`}
                        alt="Blog image"
                        className="blog-image"
                      />
                    )}
                    <p className="blog-text">{blog.content}</p>
                    <p className="blog-meta">
                      <strong>Category:</strong> {blog.category}
                    </p>
                    <p className="blog-meta">
                      <strong>Author:</strong> {blog.author}
                    </p>
                    <p className="blog-meta">
                      <strong>Posted on:</strong> {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    {blog.externalLink && (
                      <p className="blog-meta">
                        <strong>External Link:</strong>{" "}to Know More About This 
                        <a href={blog.externalLink}  className="c1" target="_blank" rel="noopener noreferrer">
                          Click here
                        </a>
                      </p>
                    )}
                    <div className="blog-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditBlogId(blog._id);
                          setEditTitle(blog.title);
                          setEditContent(blog.content);
                          setEditCategory(blog.category);
                          setEditAuthor(blog.author);
                        }}
                      >
                        🖋️Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(blog._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-blogs">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
