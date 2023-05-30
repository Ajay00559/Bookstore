const express=require("express");
const router= express.Router();
const {
    homepage,
    signup,
    signin,
    signout,
    
    createbook,
    books,
    deletebooks,
    currentuser,
    updatebooks,
}= require('../Controller/indexController');
const { isLoggedIn } = require("../utils/auth");

router.get("/", homepage )

 

//post /signup - createUser
router.post("/signup", signup)

//post /signin - loginUser
router.post("/signin", signin)

//get /signout - logoutUser
router.get("/signout",isLoggedIn, signout)
 

// post /create-book - create book
router.post("/create-book", isLoggedIn, createbook);

// post /delete-book - delete book
router.post("/delete-book", isLoggedIn, deletebooks);
 
// post /update-book - update book
router.post("/update-book/:id", isLoggedIn, updatebooks);
 
 

// get /books - show all books
router.get("/books",isLoggedIn, books);
 

// post loaduser 
router.post("/loaduser",isLoggedIn, currentuser);


module.exports = router;