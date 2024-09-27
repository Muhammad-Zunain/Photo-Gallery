import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoGalleryDashboard from './components/PhotoGalleryDashboard';
import Login from './components/Login';
import Register from './components/Register';
import Reviews from './components/Reviews';
import UploadPhoto from './components/UploadPhoto';  // Create UploadPhoto component
// import SignOut from './components/SignOut';         

function App() {
    return (
        <Router>
            <Routes>
                {/* Routes for Login and Register */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Nested Routes for Dashboard */}
                <Route path="/dashboard" element={<PhotoGalleryDashboard />}>
                    {/* Default route for /dashboard */}
                    <Route index element={<h2>Welcome to the Dashboard</h2>} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="upload-photo" element={<UploadPhoto />} />
                    {/* <Route path="signout" element={<SignOut />} /> */}
                </Route>

                {/* Default route redirects to Dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" />} />

                {/* Fallback route redirects to Dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Router>
    );
}

export default App;
