import axios from "axios";

export const getPlayListsVideosService = async (encodedToken) => {
  const response = await axios.get("/api/user/playlists", {
    headers: { authorization: encodedToken },
  });
  return response.data;
};

export const createPlayListService = async (encodedToken, playlist) => {
  const response = await axios.post(
    "/api/user/playlists",
    { playlist },
    { headers: { authorization: encodedToken } }
  );
  return response;
};

export const postVideoToPlayListService = async (
  encodedToken,
  playlistId,
  video
) => {
  const response = await axios.post(
    `/api/user/playlists/${playlistId}`,
    { video },
    { headers: { authorization: encodedToken } }
  );
  return response;
};

export const deleteVideoFromPlayListService = async (
  encodedToken,
  playlistId,
  videoId
) => {
  const response = await axios.delete(
    `/api/user/playlists/${playlistId}/${videoId}`,
    { headers: { authorization: encodedToken } }
  );
  return response;
};
