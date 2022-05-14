import React from "react";
import { useNavigate } from "react-router-dom";
import { useVideoListContext } from "../../context/VideoListContext";

const CategoryCard = ({ category }) => {
  const navigateTo = useNavigate();
  const { categoryName, thumbnail } = category;
  const { dispatch: videoListDispatch } = useVideoListContext();
  const categoryClickHandler = (clickedCategory) => {
    console.log(clickedCategory);
    videoListDispatch({
      type: "FILTER_SELECTED_CATEGORY",
      payload: clickedCategory,
    });
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
