import axios from "axios";

const getCategoriesService = async () => {
  const response = await axios.get("/api/categories");
  return response;
};

export { getCategoriesService };
