const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");   // ✅ Add this

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "banana_secret_key"; // ✅ Add this
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "project",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connected");
  }
});
// =================================register===========================
app.post("/register", async (req, res) => {
  try {
    const { Name, Email, PhoneNumber, Address, password } = req.body;

    if (!Name || !Email || !PhoneNumber || !Address || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO reg(Name,Email,PhoneNumber,Address,password) VALUES(?,?,?,?,?)";

    connection.query(
      sql,
      [Name, Email, PhoneNumber, Address, hashPassword],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: err.sqlMessage,
          });
        }

        res.json({
          message: "Registration Successful",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ==========================login====================

app.post("/login", async (req, res) => {

    var { Email, password } = req.body;

    var sql = "SELECT * FROM reg WHERE Email = ?";

    connection.query(sql, [Email],async function (err, result) {

            if (err) throw err;

            if (result.length == 0) {
                return res.send("User not found");
            }

            var match = await bcrypt.compare(password, result[0].password);

            if (match) {

                // JWT Token Generate
                var token = jwt.sign(
                    {
                        Name: result[0].id,
                        PhoneNumber: result[0].user,
                        Address: result[0].role
                    },
                    SECRET_KEY,
                    { expiresIn: "1h" }
                );

                res.json({
                     message: "Login Successful",
                      token: token,
                      id: result[0].id,
                      Name: result[0].Name
                
                });

            } else {
                res.send("Invalid Password");
            }
        });

});

// JWT Middleware
function Kavach(req, res, next) {

    var header = req.headers["authorization"];

    if (!header) {
        return res.send("Token Required");
    }

    var token = header.split(" ")[1];

    jwt.verify(token, SECRET_KEY, function (err, decoded) {

        if (err) {
            return res.send("Invalid Token");
        }

        req.user = decoded;
        next();
    });

}

// =============request==============
app.post("/sell-banana", (req, res) => {

  const {
    client_id,
    bananaType,
    quantity,
    price,
    quality,
    location,
    description
  } = req.body;

  const sql = `
    INSERT INTO req
    (client_id, bananaType, quantity, price, quality, location, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      client_id,
      bananaType,
      quantity,
      price,
      quality,
      location,
      description
    ],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).send("Database Error");
      }

      res.json({
        message: "Banana Listed Successfully",
        id: result.insertId
      });

    }
  );

});
// =======================admin register==================

app.post("/adminregister", async (req, res) => {
  try {
    const { Name, Email, PhoneNumber,  password } = req.body;

    if (!Name || !Email || !PhoneNumber ||  !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO adminreg(Name,Email,PhoneNumber,password) VALUES(?,?,?,?)";

    connection.query(
      sql,
      [Name, Email, PhoneNumber,  hashPassword],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: err.sqlMessage,
          });
        }

        res.json({
          message: "Registration Successful",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});




// =======================
// Admin Login
// =======================
app.post("/adminlogin", async (req, res) => {
  const { Email, password } = req.body;

  const sql = "SELECT * FROM adminreg WHERE Email = ?";

  connection.query(sql, [Email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const admin = result[0];

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // JWT Token
    const token = jwt.sign(
      {
        id: admin.id,
        Name: admin.Name,
        Email: admin.Email,
        PhoneNumber: admin.PhoneNumber,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });
  });
});

// =======================
// JWT Middleware
// =======================
function Kavach(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token Required",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    req.user = decoded;
    next();
  });
}

// =======================
// Profile API
// =======================
app.get("/profile", Kavach, (req, res) => {
  res.status(200).json(req.user);
});


// ===================get register client================

app.get("/reg", (req, res) => {
  const sql = "SELECT COUNT(*) AS totalClients FROM reg";

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json({
      totalClients: result[0].totalClients,
    });
  });
});
//  =======================clients list==============

app.get("/clients", (req, res) => {
  const sql = "SELECT id, Name, Email, PhoneNumber, Address FROM reg";

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json(result);
  });
});

// ===================view button show client details ============
app.get("/client/:id", (req, res) => {

  const id = req.params.id;

  const sql = `
    SELECT
      reg.id,
      reg.Name,
      reg.Email,
      reg.PhoneNumber,
      reg.Address,
      req.id AS requestId,
      req.bananaType,
      req.quantity,
      req.price,
      req.quality,
      req.location,
      req.description,
      req.status,
      req.created_at
    FROM reg
    JOIN req
    ON reg.id = req.client_id
    WHERE reg.id = ?
    ORDER BY req.created_at DESC
  `;

  connection.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result); // ✅ Saari requests return hongi

  });

});
// Accept Request API
app.put("/request/accept/:id", (req, res) => {

  const id = req.params.id;

  connection.query(
    "UPDATE req SET status='Accepted' WHERE id=?",
    [id],
    (err) => {

      if (err) return res.status(500).json(err);

      res.json({
        message: "Request Accepted"
      });

    }
  );

});
// ====================Reject Request API==================
app.put("/request/reject/:id", (req, res) => {

  const id = req.params.id;

  connection.query(
    "UPDATE req SET status='Rejected' WHERE id=?",
    [id],
    (err) => {

      if (err) return res.status(500).json(err);

      res.json({
        message: "Request Rejected"
      });

    }
  );

});

// =================get request==================


app.get("/req", (req, res) => {
  const sql = "SELECT COUNT(*) AS totalreq FROM req";

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json({
      totalreq: result[0].totalreq,
    });
  });
});



// ============server=====================
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});