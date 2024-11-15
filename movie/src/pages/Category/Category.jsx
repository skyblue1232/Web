import React from 'react';
import { Link } from 'react-router-dom';
import './Category.css'; 

const CategoryPage = () => {
  return (
    <div className="category-page">
      <h1>카테고리</h1>
      <div className="category-images">
        <Link to="/nowplaying">
          <div className="image-wrapper">
            <img src="/images/nowplaying_food.jpg" alt="카테고리 1" />
          </div>
        </Link>
        <Link to="/popular">
          <div className="image-wrapper">
            <img src="/images/popular_image.jpg" alt="카테고리 2" />
          </div>
        </Link>
        <Link to="/latestGood">
          <div className="image-wrapper">
            <img src="/images/latest_ham.jpg" alt="카테고리 3" />
          </div>
        </Link>
        <Link to="/upcomming">
          <div className="image-wrapper">
            <img src="/images/upcomming_image.jpg" alt="카테고리 4" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryPage;
