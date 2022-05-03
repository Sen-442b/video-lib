import React, { useState, useEffect } from "react";
import { HeroGif } from "../../assets/public-assets";
import ReactPlayer from "react-player";
import { HeroLoopGif } from "../../assets/public-assets";
import { useVideoListContext } from "../../context/VideoListContext";
import { getCategoriesService } from "../../services/Categories";

const Home = () => {
  const { state } = useVideoListContext();
  const { videoList } = state;
  const [categories, setCategories] = useState([]);

  const getCategoriesHandler = async () => {
    try {
      const response = await getCategoriesService();
      console.log(response.data.categories);
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
          categories.map((category) => <CategoryCard category={category} />)}
      </div>
    </div>
  );
};

export default Home;

function CategoryCard({ category }) {
  console.log(category);
  const { categoryName } = category;
  return (
    <div className="category-item">
      <img
        src="https://pbs.twimg.com/media/FC4X0TZVIAQ5Ssb?format=jpg&name=4096x4096"
        alt="check"
        className="category-item-img"
      />
      <div className="category-item-content"> {categoryName}</div>
    </div>
  );
}
