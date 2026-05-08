const supabase = require("../Config/SupabaseConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const { data, error } = await supabase
      .from("Users")
      .select("name,email,password")
      .eq("email", email)
      .limit(1);

    if (error) throw error;
    if (!data || data.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = data[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const safeUser = { name: user.name, email: user.email };
    const token = jwt.sign(safeUser, process.env.JWT_SECRET || "alteroffice", {
      expiresIn: "24h",
    });

    return res
      .status(200)
      .json({ message: "Login successful", user: safeUser, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  Login,
};
