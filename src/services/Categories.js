import axios from "axios";

const getCategoriesService = async () => {
  try {
    const response = await axios.get("/api/categories");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getCategoriesService };
