const supabase = require("../Config/SupabaseConfig");
const bcrypt = require("bcrypt");

const CreateUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Some of the fields are missing" });

    const { data: existing, error: checkErr } = await supabase
      .from("Users")
      .select("email")
      .eq("email", email)
      .limit(1);
    if (checkErr) throw checkErr;
    if (existing && existing.length > 0)
      return res.status(409).json({ error: "Email already registered" });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const { data, error } = await supabase
      .from("Users")
      .insert([{ name, email, password: hashedPassword }])
      .select();
    if (error) throw error;
    res.status(201).json({ message: "User created successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  CreateUser,
};
