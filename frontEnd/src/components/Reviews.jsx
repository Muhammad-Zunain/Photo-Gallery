import React from 'react';
import photosData from "./photo.json"
import "../css/PhotoView.css"
import profile from "../assets/profile.jpg";

function Reviews() {
    return (
        <div className="photo-gallery">
            {photosData.photos.map(photo => (
                <div key={photo.id} className="photo-item">
                    <img src={profile} alt={photo.title} />
                    
                </div>
            ))}
        </div>
    );
}

export default Reviews;
