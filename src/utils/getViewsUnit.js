const getViewsUnit = (viewsNum) => {
  if (viewsNum >= 10_00_000) {
    return (viewsNum / 10_00_000).toFixed(1) + "M";
  } else if (viewsNum >= 1000) {
    return (viewsNum / 1000).toFixed(0) + "K";
  }
  return views;
};

export default getViewsUnit;
