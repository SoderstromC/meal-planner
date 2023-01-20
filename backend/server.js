import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/meal-planner";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8090;
const app = express();

app.use(cors());
app.use(express.json());


// USER SCHEMA

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 8,
    // maxlength: 12,
    /// My_B4nK_P4$$word
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  savedRecipes: {
    type: [],
    default: [],
  },
  shoppingItems: {
    type: [],
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);


// REGISTER AS A USER

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long",
      });
    } else {
      const newUser = await new User({
        username: username,
        password: bcrypt.hashSync(password, salt),
      }).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: "Something went wrong. Try again",
    });
  }
});


//LOGIN

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
    });
  }
});


//AUTHENTICATE USER

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken: accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
};


// SAVE RECIPE ID AND NAME

app.post("/saveRecipe", async (req, res) => {
  const { recipeId, userId, recipeName } = req.body;
  
  try {
    const updatedUser = await User.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(userId),
        savedRecipes: {$not: {$elemMatch: { recipeId, recipeName }}},
      },
      { $push: { savedRecipes: { recipeId, recipeName } }},
      { new: true }
    )

    // If it found the user without the recipe already saved
    if (updatedUser) {
      res.status(201).json({ success: true, response: updatedUser.savedRecipes });
    } else {
      // Return error message if recipe is already saved for this user
      res.status(400).json({ success: false, response: {error: "'You have already saved this recipe"} });
    }
  } catch (error) {
    res.status(500).json({ success: false, response: {error: "Server error"} });
  }
});



// REMOVE RECIPE ID FROM USER'S SAVED LIST

app.put("/removeRecipe", async (req, res) => {
  const { recipeId, userId } = req.body;
  try {
    const removeRecipe = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedRecipes: { recipeId } } },
      { new: true }
    );
    res
      .status(201)
      .json({ success: true, response: removeRecipe.savedRecipes });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});


// SHOW SAVED RECIPES

app.get("/saveRecipe/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(201).json({ success: true, response: user.savedRecipes });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});


//SAVE INGREDIENTS TO SHOPPING LIST

app.post("/saveListItem", async (req, res) => {
  const { userId, itemsToSave } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { shoppingItems: { $each: itemsToSave } } },
      { new: true }
    );
    res.status(201).json({ success: true, response: user.shoppingItems });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});


//SHOW SHOPPING LIST

app.get("/listItems/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(201).json({ success: true, response: user.shoppingItems });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});


//REMOVE SHOPPINGITEM FROM SHOPPING LIST

app.put("/removeIngredient", async (req, res) => {
  const { id, userId } = req.body;
  try {
    const removeIngredient = await User.findByIdAndUpdate(
      userId,
      { $pull: { shoppingItems: { id } } },
      { new: true }
    );
    res
      .status(201)
      .json({ success: true, response: removeIngredient.shoppingItems });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});


//EDIT SHOPPINGITEM IN SHOPPING LIST

 app.put("/editIngredient", async (req, res) => {
    const { userId, id, text } = req.body;

    try {
      const editResult = await User.findOneAndUpdate(
        { _id: userId, "shoppingItems.id": id },
        { $set: { "shoppingItems.$.raw_text": text } },
        { new: true }
      );
      res
        .status(201)
        .json({ success: true, response: editResult.shoppingItems });
    } catch (error) {
      res.status(400).json({ success: false, response: error });
    }
  });


//REMOVE ALL SHOPPINGITEMS FROM SHOPPING LIST

app.put("/removeallitems", async (req, res) => {
  const { userId } = req.body;
  try {
    const removeAllItems = await User.findByIdAndUpdate(
      userId,
      { $pull: { shoppingItems: {} }},
      { new: true }
    );
    res
      .status(201)
      .json({ success: true, response: removeAllItems.shoppingItems });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});


//TECHNIGO RESOURCES FOR REFERENCE

app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});