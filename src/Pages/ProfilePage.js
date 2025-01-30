import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [github, setGithub] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const token = localStorage.getItem('token');

  const decodedToken = useMemo(() => {
    return token ? jwtDecode(token) : {};
  }, [token]);

  useEffect(() => {
    if (decodedToken?.username && decodedToken?.email) {
      setUsername(decodedToken.username);
      setEmail(decodedToken.email);
    }

    const storedPortfolio = localStorage.getItem('portfolio');
    if (storedPortfolio) setPortfolio(storedPortfolio);

    const storedLinkedin = localStorage.getItem('linkedin');
    if (storedLinkedin) setLinkedin(storedLinkedin);

    const storedGithub = localStorage.getItem('github');
    if (storedGithub) setGithub(storedGithub);

    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) setPreviewImage(storedImage);
  }, [decodedToken]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:4000/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portfolio, username, email, linkedin, github }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Profile updated successfully!');
        setShowModal(false);
        localStorage.setItem('portfolio', portfolio);
        localStorage.setItem('linkedin', linkedin);
        localStorage.setItem('github', github);
      } else {
        alert(result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        localStorage.setItem('profileImage', e.target.result);
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
    }
  };

  return (
    <>
      <li className="profile-nav-item">
        <button className="profile-nav-button" onClick={() => setShowModal(true)}>
          Profile
        </button>
      </li>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="profile-modal">
        <Modal.Header closeButton>
          <Modal.Title className="profile-modal-title">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="profile-modal-body">
          <div className="profile-image-container">
            <label htmlFor="image-upload" className="profile-image-label">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="profile-image-preview" />
              ) : (
                <div className="profile-image-placeholder">Upload Image</div>
              )}
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="profile-image-input"
              onChange={handleImageUpload}
            />
          </div>
          <div className="profile-form-group">
            <label className="profile-label">Username</label>
            <input type="text" className="profile-input" value={username} readOnly />
          </div>
          <div className="profile-form-group">
            <label className="profile-label">Email</label>
            <input type="email" className="profile-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="profile-form-group">
            <label className="profile-label">Portfolio Link</label>
            <input type="url" className="profile-input" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
          </div>
          <div className="profile-form-group">
            <label className="profile-label">LinkedIn</label>
            <input type="url" className="profile-input" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
          </div>
          <div className="profile-form-group">
            <label className="profile-label">GitHub</label>
            <input type="url" className="profile-input" value={github} onChange={(e) => setGithub(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer className="profile-modal-footer">
          <button className="profile-btn profile-logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <button className="profile-btn profile-save-btn" onClick={handleSave}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfilePage;
