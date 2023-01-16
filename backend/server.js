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
    minlength: 8,
    maxlength: 12,
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
    const user = await User.findByIdAndUpdate(userId, {
      $push: { savedRecipes: { recipeId, recipeName } },
    });
    res.status(201).json({ success: true, response: user });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
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
    console.log(removeRecipe);
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


// SHOW SHOPPING LIST

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
    console.log("removeIngredient", removeIngredient);
    res
      .status(201)
      .json({ success: true, response: removeIngredient.shoppingItems });
  } catch (error) {
    res.status(400).json({ success: false, response: error });
  }
});

 app.put("/editIngredient", async (req, res) => {
    const { userId, id, text } = req.body;
    console.log('tadaaa',text )

    try {
      console.log("update...");
      const editResult = await User.findOneAndUpdate(
        { _id: userId, "shoppingItems.id": id },
        { $set: { "shoppingItems.$.raw_text": text } },
        { new: true }
      );
      //https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/write-operations/embedded-arrays/
      //const updateIngredient = await User.findByIdAndUpdate(userId, {new: true}, { $ : {recipeComponents: { id }}},)

      console.log("resultEditIngredient", editResult);
      res
        .status(201)
        .json({ success: true, response: editResult.shoppingItems });
    } catch (error) {
      res.status(400).json({ success: false, response: error });
    }

    /* To get the updated document, we need to specify "new: true": https://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model*/
  });


//REMOVE ALL SHOPPINGITEMS FROM SHOPPING LIST



app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});