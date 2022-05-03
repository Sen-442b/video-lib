import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Sci-Fi",
    thumbnail:
      "https://pbs.twimg.com/media/FC4X0TZVIAQ5Ssb?format=jpg&name=4096x4096",
    description:
      "Computer programming is the process of designing and building an executable computer program to accomplish a specific computing",
  },
  {
    _id: uuid(),
    categoryName: "Documentary",
    thumbnail:
      "https://external-preview.redd.it/DU3QTlt_gxHsdhLe_DxYIl59359PIkE_UYe_CHo59J8.jpg?auto=webp&s=d1c8ccc89a28bdf9affa0257419ca47bef4fdfa5",
    description:
      "Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application",
  },
  {
    _id: uuid(),
    categoryName: "Educational",
    thumbnail: "https://media.sciencephoto.com/image/c0300032/400wm",
    description:
      "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
  },
  {
    _id: uuid(),
    categoryName: "Events",
    thumbnail:
      "https://w0.peakpx.com/wallpaper/527/680/HD-wallpaper-spacex-elon-musk-light-rocket-space.jpg",
    description:
      "Backend Development is also known as server-side development. It is everything that the users don't see and contains behind-the-scenes activities that occur when performing any action on a website.",
  },
];
