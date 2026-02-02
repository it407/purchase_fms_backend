import {
  createUserService,
  fetchUsersService,
  deleteUserService,
} from "./services.js";

/* CREATE */
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, page } = req.body;

    if (!username || !email || !password || !role || !page) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await createUserService({
      username,
      email,
      password,
      role,
      page,
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/* READ */
export const getUsers = async (req, res) => {
  try {
    const users = await fetchUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* DELETE */
export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
