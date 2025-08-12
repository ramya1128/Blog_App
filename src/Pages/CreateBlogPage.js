import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const categories = ["Technology", "Lifestyle", "Health", "Education", "Business", "Entertainment"]; // Predefined categories

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !content || !author || !category) {
      alert('Please fill in all the required fields.');
      return;
    }
    setErrorMessage('');
    setSuccessMessage('');
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("category", category);
    if (externalLink) formData.append("externalLink", externalLink);
    if (image) formData.append("image", image);
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("https://blog-backend-5tkj.onrender.com/blogs/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send FormData instead of JSON
      });
  
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Blog created successfully!");
        setTimeout(() => {
          navigate("/blogs");
        }, 2000);
      } else {
        setErrorMessage(data.message || "Failed to create blog.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="create-blog-container">
      <h1 className='title'>Create your Wonderful Thoughts Into A Vibrant Post</h1>
      {successMessage && <p className="success-message1">{successMessage}</p>}
          {errorMessage && <p className="error-message1">{errorMessage}</p>}
      <div className="create-blog-wrapper">
        <h2 className="create-blog-title">Create Blog</h2>
        <form onSubmit={handleSubmit} className="create-blog-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              className="form-textarea"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="5"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-input"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">External Link (optional)</label>
            <input
              type="url"
              className="form-input"
              name="externalLink"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
            />
          </div>
          <div className="form-group">
  <label className="form-label">Upload Image</label>
  <input
    type="file"
    className="form-input"
    name="image"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
  />
</div>
          <button type="submit" className="submit-btn">
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage;
