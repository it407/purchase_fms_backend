import { loginUserService } from "./services.js";

export const loginUser = async (req, res) => {
  try {
    console.log("LOGIN HIT:", req.body); // 🔥 DEBUG

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password required",
      });
    }

    const user = await loginUserService({ username, password });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);

    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
