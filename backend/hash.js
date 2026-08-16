const bcrypt = require("bcrypt");

async function hashPassword() {
    const password = "admin123"; // apna password
    const hash = await bcrypt.hash(password, 10);

    console.log(hash);
}

hashPassword();