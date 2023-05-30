const User = require("../Models/userModel");
 const Book = require("../Models/bookModel")
const { sendToken } = require("../utils/auth");
 
 
exports.homepage = (req, res, next) => {
    res.send("This is homepage...");
    // res.json({})
};


exports.signup = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            return res.status(501).json({ message: "user already exists" });
        }
        const newUser = new User(req.body);
        user = await newUser.save();
        console.log(user)
        // sendToken(user, req, res, 200);
        res.json({user})
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
};

exports.signin = async (req, res, next) => {
    try {
        
        const { email, password } = req.body;
        let user = await User.findOne({ email : email }).select("+password").exec();
            //  console.log(user)
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const matchpassword = user.comparepassword(password);

        if (!matchpassword) {
            return res.status(500).json({ message: "wrong credientials" });
        }
    console.log(user)
        sendToken(user, req, res, 200);
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
    // res.json({})
};

exports.signout = (req, res, next) => {
    res.clearCookie("token");
    console.log('cokkies cleared')
    res.status(200).json({ message: "logged out" });
};

 
exports. createbook = async (req, res) => {
    try {
        const book = new Book({ ...req.body});
        console.log(req.user,book)
        await req.user.books.push(book._id);
        await book.save();

        await req.user.save();
        res.status(201).json({ message: "book created" });
         
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
};

// exports.books = async (req, res) => {
//     try {
//         const books = await Book.find().exec();
//         console.log("hi",books)
//         res.status(200).json({  books:books });
//     } catch (error) {
//         res.status(500).json({ message: error });
//     }
// };

exports.books = async (req, res) => {
    try {
        const { books } = await User.findById(req.user._id)
            .populate("books")
            .exec();
        console.log(books);
        res.status(201).json({ message: "user books", books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 
 
exports.deletebooks = async (req, res) => {
    try {
        const  user = await User.findById(req.user._id)
        const  book = await Book.findById({...req.body})
         
        console.log(book)
         user.books.splice(book._id,1)
         
        await user.save();
      
       await Book.deleteOne({...req.body})
        res.status(201).json({ message: "book deleted"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatebooks = async (req, res) => {
    try {
        const  book = await Book.findByIdAndUpdate(req.params.id,{...req.body})
        res.status(201).json({ message: "book updated"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// exports.updatebooks = async (req, res) => {
//     try {
//         const  book = await Book.findById(req.body.id)
//         await Book.updateOne(req.body.id,{...req.body.book})
//         res.status(201).json({ message: "book updated"});

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

 
 
exports.currentuser = (req, res) => {
     
    res.status(200).json({ user: req.user });
};
