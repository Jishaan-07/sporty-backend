const express = require('express');
const userController = require('../controllers/userController')
const blogController = require('../controllers/blogController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const multerMiddleware = require('../middleware/multerMiddleware');


const router = new express.Router()


// register-post
router.post('/register',userController.registerController)

// login-post
router.post('/login',userController.loginController)

// addBlog
router.post('/add-blog',jwtMiddleware,multerMiddleware.single("blogImage"),blogController.addBlogController)

// homeBlogs
router.get('/home-blog', blogController.getHomeBlogController)

// homeBestBlogs
router.get('/homeBest-blog', blogController.getHomeBestBlogController)

//allBlogs
router.get('/all-blog', blogController.getAllBlogController)

// userBlogs
router.get('/user-blog',jwtMiddleware, blogController.getUserBlogController)

// editBlog
router.put('/blog/:id/edit',jwtMiddleware,multerMiddleware.single("blogImage"), blogController.editBlogController)


// editBlog
router.delete('/delete-blog/:id',jwtMiddleware , blogController.deleteBlogController)

// editUser
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController)



module.exports = router