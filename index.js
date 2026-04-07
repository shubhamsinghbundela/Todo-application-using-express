const express = require("express");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware");
const { userModel, todoModel } = require("./models");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const existingUser = await userModel.findOne({
    userName: userName,
    password: password,
  });

  if (existingUser) {
    res.status(403).json({
      message: "User with this username already exists",
    });
    return;
  }

  const newUser = await userModel.create({
    userName: userName,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  res.status(200).json({
    id: newUser._id,
    message: "User get created",
  });
});

app.post("/signin", async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  const userExist = await userModel.findOne({
    userName: userName,
  });

  if (!userExist) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: userExist.id,
    },
    "shubham123",
  );

  res.status(200).json({
    token,
  });
});

app.post("/todo", authMiddleware, async (req, res) => {
  const newTodo = await todoModel.create({
    description: req.body.description,
    userId: req.userId
  });

  res.status(200).json({
    id: newTodo._id,
    message: "todo get created",
  });
});

app.get('/todos', authMiddleware, async (req, res) => {
    const allTodos = await todoModel.find({
        userId: req.userId
    })

    res.status(200).json({
        allTodos
    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
