import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/meal-planner";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// USER SCHEMA

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
    maxlenght: 12
    /// My_B4nK_P4$$word
  },
  // npm install crypto
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  },
  savedRecipes: {
    type: [],
    default: []
  },
  recipeComponents: {
    type: [],
    default: [],
  }
});

const User = mongoose.model("User", UserSchema);


// REGISTER AS A USER

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
// npm install bcrypt
// const code = [1, 2, 4, 4];
// const makeCodeSecret = (codeArr) => {
    // const secretMessage = codeArr.map(singleNumber => singleNumber + 1);
    // return secretMessage
//}
// transformedCode = makeCodeSecret(code)
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long"
      });
    } else {
      const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id
        }
      });
    }
  } catch(error) {
      res.status(400).json({
        success: false,
        response: "Something went wrong. Try again"
      });
  }
});


//LOGIN

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    });
  }
});


//AUTHENTICATE USER

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
}


// SAVE RECIPE ID AND NAME 

app.post("/saveRecipe", async (req, res) => {
  const { id, userId, name } = req.body;
  console.log('name', name);
  console.log('ididid',id);
  console.log('userId', userId); //jag f??rst??r inte varf??r det ??r id h??r.. consolog ovan visas inte.

  // 1. Get recipe id from req  
  // 2. Get uesr id
  // 3. Check if recipe id is already in list
  // 4: Add recipe Id to list and save in db  (i mongo finns det kommando f??r att l??gga till i listan, add item ro array)
  // 5: return resultat
  try {
    const user = await User.findByIdAndUpdate(userId, {$push: {savedRecipes: {id, name}}});
    res.status(201).json({success: true, response: user});
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }
});

// REMOVE RECIPE ID FROM USER'S SAVED LIST
app.put("/removeRecipe", async (req, res) => {
  const {  id, userId } = req.body; 
  console.log('RecipeIdRemove',id);
  console.log('UserIdRemove2',userId);

  try {
    console.log('removing...');
    const removeRecipe = await User.findByIdAndUpdate(userId, {$pull: {savedRecipes: { id }}}, {new: true})
    console.log(removeRecipe);
    res.status(201).json({success: true, response: removeRecipe.savedRecipes});
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }

  /* To get the updated document, we need to specify "new: true": https://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model*/
});

// SHOW SAVED RECIPES

app.get("/saveRecipe/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(201).json({success: true, response: user.savedRecipes});
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }
});

//SAVE INGREDIENTS TO SHOPPING LIST

app.post("/saveListItem", async (req, res) => {
  const { userId, itemsToSave } = req.body;
  console.log('ingredients', itemsToSave);
  console.log('userIdShop', userId);

  try {
    const user = await User.findByIdAndUpdate(userId, {$push: {recipeComponents: {$each: itemsToSave}}}, {new: true});
    res.status(201).json({success: true, response: user.recipeComponents});
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }
});

// SHOW SHOPPING LIST

app.get("/listItems/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(201).json({success: true, response: user.recipeComponents});
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }
});


// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});