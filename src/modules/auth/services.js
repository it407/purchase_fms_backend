
import bcrypt from "bcrypt";
import { insertUser, getAllUsers, deleteUserById } from "./sql.js";

export const createUserService = async ({
  username,
  email,
  password,
  role,
  page,
}) => {
  return insertUser({
    username,
    email,
    password, // ✅ plain text
    role,
    page,
  });
};
export const fetchUsersService = async () => {
  return getAllUsers();
};

export const deleteUserService = async (id) => {
  return deleteUserById(id);
};
