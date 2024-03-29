import axios from "axios";

export const getWatchLaterVideosService = async (encodedToken) => {
  const response = await axios.get("/api/user/watchlater", {
    headers: {
      authorization: encodedToken,
    },
  });

  return response;
};

export const postWatchLaterVideoService = async (encodedToken, video) => {
  const response = await axios.post(
    "/api/user/watchlater",
    { video },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

  return response;
};

export const replaceWatchLaterVideosService = async (
  encodedToken,
  updatedWatchLater
) => {
  const response = await axios.post(
    "/api/user/replaceWatchLater",
    { updatedWatchLater },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
  return response;
};
export const deleteWatchLaterVideoService = async (encodedToken, videoId) => {
  const response = await axios.delete(`/api/user/watchlater/${videoId}`, {
    headers: {
      authorization: encodedToken,
    },
  });
  console.log(response);
  return response;
};
