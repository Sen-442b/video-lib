import React from "react";

const CategoryCard = ({ category }) => {
  const { categoryName, thumbnail } = category;
  return (
    <div className="category-item">
      <img src={thumbnail} alt="check" className="category-item-img" />
      <div className="category-item-content"> {categoryName}</div>
    </div>
  );
};

export default CategoryCard;
