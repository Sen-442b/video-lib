import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterSelectedCategoryAction } from "../../redux/features/videoListSlice";
//import { useVideoListContext } from "../../context/VideoListContext";

const CategoryCard = ({ category }) => {
  const navigateTo = useNavigate();
  const { categoryName, thumbnail } = category;
  const videoListDispatch = useDispatch();
  const categoryClickHandler = (clickedCategory) => {
    videoListDispatch(filterSelectedCategoryAction(clickedCategory));
    navigateTo("/videoListing");
  };
  return (
    <div
      className="category-item"
      onClick={() => categoryClickHandler(categoryName)}
    >
      <img src={thumbnail} alt="check" className="category-item-img" />
      <div className="category-item-content"> {categoryName}</div>
    </div>
  );
};

export default CategoryCard;
