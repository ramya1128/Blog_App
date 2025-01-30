import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import HomePage from "./Pages/HomePage";
import Home from "./Pages/Home";
import CreateBlogPage from "./Pages/CreateBlogPage";
import BlogPage from "./Pages/BlogPage";
import { UserContextProvider} from "./context/UserContext";
//import UpdateBlog from "./Pages/updateBlog";

const App=()=> {
  //const { userInfo } = useContext(UserContext);
  
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/homepage" element={<HomePage />}></Route>
          <Route path="/blogs" element={<BlogPage />} /> 
          <Route path="/blogs/create" element={<CreateBlogPage />} />
         {/* <Route path="/blog/:id/update" element={<UpdateBlog/>}/>*/}

          {/*<Route path="*"
  element={
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#f8f9fa", 
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "rgb(1, 183, 255)", fontWeight: "bold" }}>
        404 | Not Found
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#555" }}>
        The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="btn btn-primary"
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          borderRadius: "0.5rem",
          textDecoration: "none",
          backgroundColor:"rgb(1, 183, 255)"
        }}
      >
        Go Back to Home
      </a>
    </div>
  }
/>*/}
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
