import React, { useState, useEffect } from "react";
import { HeroGif } from "../../assets/public-assets";
import ReactPlayer from "react-player";
import { HeroLoopGif } from "../../assets/public-assets";
//import { useVideoListContext } from "../../context/VideoListContext";
import { getCategoriesService } from "../../services/CategoriesServices";
import CategoryCard from "./CategoryCard";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const getCategoriesHandler = async () => {
    try {
      const response = await getCategoriesService();

      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => getCategoriesHandler(), []);

  const getUniqueCategory = (videoArr) =>
    videoArr.reduce(
      (acc, cv) => (acc.includes(cv.category) ? acc : [...acc, cv.category]),
      []
    );
  return (
    <div className="homepage">
      <div className="hero">
        <div className="player-wrapper">
          <ReactPlayer
            className="hero-gif"
            url={HeroLoopGif}
            loop={true}
            muted={true}
            controls={false}
            playing
            width="100%"
            height="100%"
          />
          <p className="hero-content">Tickle your brain.</p>
        </div>
      </div>
      <div>Categories</div>
      <div className="category-wrapper">
        {categories.length !== 0 &&
          categories.map((category) => (
            <CategoryCard category={category} key={category._id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
