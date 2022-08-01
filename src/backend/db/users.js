import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have likes (Likes are set to 0 by default), History Array, Playlists Array (added Watch Later Playlist in it by default) by default
 * */

export const users = [
  {
    _id: uuid(),
    userName: "adam_1",
    firstName: "Adam",
    lastName: "Jones",
    email: "adamjones@gmail.com",
    password: "$2a$10$ulEPVj3cRyC.nVclfbk38OsobI7OfQu7KnrG876ViTP1HgfEej6jm",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    userName: "john123",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "$2a$10$2GWfA4SLr6F.7e56wnNYKeH8K5/VfdWSBtUERlmX9f.CFnPIqnPwK",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
