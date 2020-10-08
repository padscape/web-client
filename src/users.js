const jwt = require("jsonwebtoken");
const express = require("express");
const mail = require("nodemailer");
const router = express.Router();
const mongo = require("./connection.js");

router.get("/:username", (req, res) => {
  mongo.userSchema.findOne(
    { Username: req.params.username },
    "-Password -Email -Activation",
    (err, result) => {
      if (err) {
        res.writeHead(400, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify({ Error: "Bad Request" }));
      }

      res.writeHead(result === null ? 404 : 200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });

      res.end(
        JSON.stringify(result === null ? { Error: "Not Found" } : result)
      );
    }
  );
});

router.get("/", (req, res) => {
  mongo.userSchema.find({}, "-Password -Email -Activation", (err, result) => {
    if (err) throw err;

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(JSON.stringify(result));
  });
});

router.post("/", (req, res) => {
  if (
    !req.body.Username ||
    !req.body.Password ||
    !req.body.Email ||
    typeof req.body.Username !== "string" ||
    typeof req.body.Password !== "string" ||
    typeof req.body.Email !== "string"
  ) {
    res.writeHead(400, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(JSON.stringify({ Error: "Bad Request" }));
  } else {
    let db = new mongo.userSchema();
    db.Username = req.body.Username;
    db.Password = req.body.Password;
    db.Email = req.body.Email;

    db.save((err, entry) => {
      if (err) throw err;

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });

      res.end(JSON.stringify({ id: entry.id }));
    });
  }
});

router.post("/login", (req, res) => {
  if (!req.body.Username || typeof req.body.Username !== "string") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({ Error: "Bad Request", Details: "Username is required." })
    );
  } else if (!req.body.Password || typeof req.body.Password !== "string") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({ Error: "Bad Request", Details: "Password is required." })
    );
  } else if (/\s/.test(req.body.Username) || /\s/.test(req.body.Password)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({
        Error: "Bad Request",
        Details: "Username or password cannot contain spaces.",
      })
    );
  } else {
    mongo.userSchema.findOne({ Username: req.body.Username }, (err, user) => {
      if (err) throw err;

      if (user === null) {
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });

        res.end(JSON.stringify({ page: "" }));
        return;
      }

      let token = "";

      if (req.body.Password === user.Password) {
        token = jwt.sign(
          {
            data: `${req.body.Username} ${req.body.Password}`,
          },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
      }

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });

      res.end(JSON.stringify({ page: token }));
    });
  }
});

router.post("/signup", (req, res) => {
  if (!req.body.Username || typeof req.body.Username !== "string") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({ Error: "Bad Request", Details: "Username is required." })
    );
  } else if (!req.body.Password || typeof req.body.Password !== "string") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({ Error: "Bad Request", Details: "Password is required." })
    );
  } else if (/\s/.test(req.body.Username) || /\s/.test(req.body.Password)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({
        Error: "Bad Request",
        Details: "Username or password cannot contain spaces.",
      })
    );
  } else if (!req.body.Email || typeof req.body.Email !== "string") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({ Error: "Bad Request", Details: "Email is required." })
    );
  } else {
    mongo.userSchema.findOne({ Username: req.body.Username }, (err, user) => {
      if (err) throw err;

      if (user !== null) {
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify({ page: "Username is taken." }));
        return;
      } else {
        let token = jwt.sign(
          {
            data: `${req.body.Username} ${req.body.Password}`,
          },
          process.env.SECRET,
          { expiresIn: "1h" }
        );

        let db = new mongo.userSchema();
        let code = Math.floor(Math.random() * 900000) + 100000;

        db.Username = req.body.Username;
        db.Password = req.body.Password;
        db.Email = req.body.Email;
        db.Activation = code;

        db.save((err, entry) => {
          if (err) throw err;

          res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });

          res.end(JSON.stringify({ page: token }));
        });

        let transporter = mail.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: "padscapeapp@gmail.com",
            pass: process.env.EMAIL_PASS,
          },
        });

        let options = {
          from: "padscapeapp@gmail.com",
          to: req.body.Email,
          subject: "Account Activation - Padscape",
          html: `<h1>Greetings, ${req.body.Username}!</h1><p>Welcome to the Padscape community! We hope you find our software useful and you have a great time here! The activation code you will need to be able to use your account is: ${code}</p><h3>The Padscape Team</h3>`,
        };

        transporter.sendMail(options, (err, info) => {
          if (err) throw err;
        });
      }
    });
  }
});

router.post("/activate", (req, res) => {
  if (!req.body.Activation || typeof req.body.Activation !== "string") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({
        Error: "Bad Request",
        Details: "Activation code is required.",
      })
    );
  } else if (!req.body.Key || typeof req.body.Key !== "string") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({
        Error: "Bad Request",
        Details: "User Token is required.",
      })
    );
  } else {
    jwt.verify(req.body.Key, process.env.SECRET, (err, decoded) => {
      const data = decoded.data.split(" ");
      username = data[0];
      password = data[1];

      mongo.userSchema.findOne(
        { Username: username, Password: password },
        (err, user) => {
          if (err) throw err;

          if (user === null) {
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            res.end(JSON.stringify({ valid: "" }));
            return;
          }

          let valid = "false";

          if (req.body.Activation === user.Activation) {
            valid = "true";
          }

          res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });

          res.end(JSON.stringify({ valid: valid }));
        }
      );
    });
  }
});

router.put("/", (req, res) => {
  if (!req.body.Key || typeof req.body.Key !== "string") {
    res.writeHead(400, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(JSON.stringify({ Error: "Bad Request" }));
  } else {
    jwt.verify(req.body.Key, process.env.SECRET, (err, decoded) => {
      data = decoded.data.split(" ");
      username = data[0];
      password = data[1];

      mongo.userSchema.findOne(
        { Username: username, Password: password },
        (err, result) => {
          if (err) {
            res.writeHead(400, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });

            res.end(JSON.stringify({ Error: "Bad Request" }));
          }

          if (result === null) {
            res.writeHead(404, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });

            res.end(JSON.stringify({ Error: "Not Found" }));
          } else {
            result.Username = req.body.Username;
            result.Password = req.body.Password;

            let token = jwt.sign(
              {
                data: `${req.body.Username} ${req.body.Password}`,
              },
              process.env.SECRET,
              { expiresIn: "1h" }
            );

            result.save((err, entry) => {
              if (err) throw err;
              res.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              });

              res.end(JSON.stringify({ page: token }));
            });
          }
        }
      );
    });
  }
});

router.delete("/", (req, res) => {
  if (!req.body.Key || typeof req.body.Key !== "string") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });

    res.end(
      JSON.stringify({
        Error: "Bad Request",
        Details: "User Token is required.",
      })
    );
  } else {
    jwt.verify(req.body.Key, process.env.SECRET, (err, decoded) => {
      data = decoded.data.split(" ");
      username = data[0];
      password = data[1];

      mongo.userSchema.findOne(
        { Username: username, Password: password },
        (err, result) => {
          if (err) {
            res.writeHead(400, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });

            res.end(JSON.stringify({ Error: "Bad Request" }));
          }

          if (result === null) {
            res.writeHead(404, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });

            res.end(JSON.stringify({ Error: "Not Found" }));
          } else {
            mongo.userSchema.deleteMany(
              { Username: username, Password: password },
              (err, entry) => {
                if (err) throw err;

                res.writeHead(200, {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                });

                res.end(JSON.stringify({ id: entry.id }));
              }
            );
          }
        }
      );
    });
  }
});

module.exports = router;
