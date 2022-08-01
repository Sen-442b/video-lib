import "./star-anim.css";

const Star = ({ animationDuration, animationDelay, top }) => {
  return (
    <div
      style={{
        backgroundColor: "transparent",
        width: "50px",
        height: "1px",
        margin: "10px",
        animationName: "star-anim",
        animationDuration,
        animationIterationCount: "infinite",
        animationDelay,
        animationDirection: "alternate",
        backgroundColor: "white",
        position: "fixed",
        top,
        left: "-100px",
        zIndex: "-1",
      }}
    ></div>
  );
};

export default Star;
