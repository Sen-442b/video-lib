import { Response } from "miragejs";
/**
 * All the routes related to Category are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/users
 * */

export const getAllUsersHandler = function () {
  try {
    return new Response(200, {}, { categories: this.db.users });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles gets a specific user from the db.
 * send GET Request at /api/user/user/:userId
 * */

export const getUserHandler = function (schema, request) {
  const { userId } = request.params;
  try {
    const user = schema.users.findBy({ _id: userId }).attrs;
    return new Response(200, {}, { user });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
