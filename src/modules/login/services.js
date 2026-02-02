// import bcrypt from "bcrypt";

// import { findUserByUsername } from "./sql.js";

// export const loginUserService = async ({ username, password }) => {
//   const user = await findUserByUsername(username);

//   if (!user) {
//     throw new Error("Invalid credentials");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     throw new Error("Invalid credentials");
//   }

//   // password client ko kabhi mat bhejna
//   delete user.password;

//   return user;
// };


import { findUserByUsername } from "./sql.js";

export const loginUserService = async ({ username, password }) => {
  const user = await findUserByUsername(username);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // ✅ plain text comparison
  if (password !== user.password) {
    throw new Error("Invalid credentials");
  }

  // password client ko kabhi mat bhejna
  delete user.password;

  return user;
};
