const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const SECRET_KEY = process.env.SECRET_KEY || "mysecretkey";

// ================= Middleware =================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ================= Database Connection =================
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Error:", err);
        return;
    }
    console.log("MySQL Connected Successfully");
});

// ================= Test Route =================
app.get("/", (req, res) => {
    res.send("Backend Server is Running Successfully...");
});

// ================== Image Upload Setup =======================
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, JPEG, PNG images allowed"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// ================= Register =================
app.post("/reg", async (req, res) => {
    try {
        const { name, email, phonenumber, address, password } = req.body;

        if (!name || !email || !phonenumber || !address || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        connection.query("SELECT * FROM reg WHERE email = ?", [email], (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.sqlMessage });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: "Email already registered" });
            }

            const sql = "INSERT INTO reg (name, email, phonenumber, address, password) VALUES (?, ?, ?, ?, ?)";
            connection.query(sql, [name, email, phonenumber, address, hashPassword], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: err.sqlMessage });
                }
                res.status(201).json({ message: "Registration Successful" });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ================= Login =================
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const sql = `
            SELECT id, Name AS name, Email AS email, PhoneNumber AS phonenumber, Address AS address, password, created_at
            FROM reg
            WHERE Email = ?
        `;

        connection.query(sql, [email], async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Database Error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const user = result[0];
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({ message: "Invalid Password" });
            }

            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            res.status(200).json({
                message: "Login Successful",
                token,
                id: user.id,
                name: user.name,
                email: user.email,
                phonenumber: user.phonenumber,
                address: user.address,
                created_at: user.created_at
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ================= Admin Login =================
app.post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE email=?";

    connection.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.sqlMessage });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Admin Not Found" });
        }

        const match = await bcrypt.compare(password, result[0].password);

        if (!match) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            { id: result[0].id, role: "admin" },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Admin Login Successful",
            token,
            id: result[0].id
        });
    });
});

// ================= Client Send Request =================
app.post("/send-request", upload.single("image"), (req, res) => {
    const { client_id, banana_name, quantity, price, location, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO client_request (client_id, banana_name, quantity, price, location, description, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [client_id, banana_name, quantity, price, location, description, image], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.json({ message: "Request Sent Successfully" });
    });
});

// ================= Show Requests in Admin Panel =================
app.get("/admin/requests", (req, res) => {
    const sql = `
        SELECT 
            client_request.id, client_request.banana_name, client_request.quantity, client_request.price,
            client_request.location, client_request.description, client_request.image, client_request.status,
            client_request.created_at, reg.name, reg.email, reg.phonenumber
        FROM client_request
        JOIN reg ON client_request.client_id = reg.id
        ORDER BY client_request.created_at DESC
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.status(200).json(result);
    });
});

// ================= Status Update =================
app.put("/admin/request-status/:id", (req, res) => {
    const { status } = req.body;
    const sql = "UPDATE client_request SET status=? WHERE id=?";

    connection.query(sql, [status, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.json({ message: "Status Updated" });
    });
});

// ================= Delete Request =================
app.delete("/admin/request/:id", (req, res) => {
    const sql = "DELETE FROM client_request WHERE id=?";

    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.json({ message: "Request Deleted Successfully" });
    });
});

// ================= Get Dashboard Counts =================
app.get("/admin/counts", (req, res) => {
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM reg) AS totalClients,
            (SELECT COUNT(*) FROM client_request) AS totalRequests,
            (SELECT COUNT(*) FROM client_request WHERE status='Approved') AS approved,
            (SELECT COUNT(*) FROM client_request WHERE status='Rejected') AS rejected
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.json(result[0]);
    });
});

// ================= Clients Show =================
app.get("/admin/clients", (req, res) => {
    const sql = `
        SELECT id, name, email, phonenumber, address, created_at
        FROM reg
        ORDER BY created_at DESC
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.json(result);
    });
});

// ================= Delete Client =================
app.delete("/admin/client/:id", (req, res) => {
    const sql = "DELETE FROM reg WHERE id=?";

    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }
        res.json({ message: "Client Deleted Successfully" });
    });
});

// ================= Client Show Requests =================
app.get("/my-requests/:client_id", (req, res) => {
    const sql = `
        SELECT id, banana_name, quantity, price, location, description, image, status, created_at
        FROM client_request
        WHERE client_id = ?
        ORDER BY created_at DESC
    `;

    connection.query(sql, [req.params.client_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }
        res.json(result);
    });
});

// ================= Client Dashboard Overview =================
app.get("/client/dashboard/:client_id", (req, res) => {
    const client_id = req.params.client_id;
    const sql = `
        SELECT
            COUNT(*) AS total,
            SUM(status='Pending') AS pending,
            SUM(status='Approved') AS approved,
            SUM(status='Rejected') AS rejected
        FROM client_request
        WHERE client_id=?
    `;

    connection.query(sql, [client_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }
        res.json(result[0]);
    });
});

// ================= Client Profile =================
app.get("/client/profile/:id", (req, res) => {
    const sql = `
        SELECT id, Name AS name, Email AS email, PhoneNumber AS phonenumber, Address AS address, created_at
        FROM reg
        WHERE id = ?
    `;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Profile Not Found" });
        }
        res.json(result[0]);
    });
});

// ================= Client Profile Update =================
app.put("/client/profile/:id", (req, res) => {
    const { name, phonenumber, address } = req.body;
    const sql = `
        UPDATE reg
        SET Name=?, PhoneNumber=?, Address=?
        WHERE id=?
    `;

    connection.query(sql, [name, phonenumber, address, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.json({ message: "Profile Updated Successfully" });
    });
});

// ================= Admin Reports =================
app.get("/admin/reports", (req, res) => {
    const report = {};

    connection.query("SELECT COUNT(*) AS totalClients FROM reg", (err, clientResult) => {
        if (err) return res.status(500).json(err);
        report.totalClients = clientResult[0].totalClients;

        connection.query("SELECT COUNT(*) AS totalRequests FROM client_request", (err, requestResult) => {
            if (err) return res.status(500).json(err);
            report.totalRequests = requestResult[0].totalRequests;

            connection.query("SELECT COUNT(*) AS approved FROM client_request WHERE status='Approved'", (err, approvedResult) => {
                if (err) return res.status(500).json(err);
                report.approved = approvedResult[0].approved;

                connection.query("SELECT COUNT(*) AS rejected FROM client_request WHERE status='Rejected'", (err, rejectedResult) => {
                    if (err) return res.status(500).json(err);
                    report.rejected = rejectedResult[0].rejected;

                    connection.query("SELECT COUNT(*) AS pending FROM client_request WHERE status='Pending'", (err, pendingResult) => {
                        if (err) return res.status(500).json(err);
                        report.pending = pendingResult[0].pending;
                        res.json(report);
                    });
                });
            });
        });
    });
});

// ================= Server Listener =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Running on Port ${PORT}`);
});