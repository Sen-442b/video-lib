import axios from "axios";

const getVideoListService = async () => {
  try {
    const response = await axios.get("/api/videos");
    return response;
  } catch (error) {
    //TODO :- make an error handler
    console.log(error);
  }
};

export { getVideoListService };
