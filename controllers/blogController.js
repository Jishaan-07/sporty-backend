const blogs = require('../Model/BlogModel')

// add-Blog

exports.addBlogController = async (req, res) => {
    console.log("inside addBlogController");
    const userId = req.userId
    // console.log(userId);
    // console.log(req.body);
    // console.log(req.file);
    const { title, subDescription, description, date } = req.body
    const blogImage = req.file.filename
    try {
        const existingBlog = await blogs.findOne({ description })
        if (existingBlog) {
            res.status(406).json("Blog already exists ...Please upload another")
        } else {
            const newBlog = new blogs({
                title, subDescription, description, date, blogImage, userId
            })
            await newBlog.save()
            return res.status(200).json(newBlog)

        }
    } catch (err) {
        res.status(401).json(err)

    }
    res.status(200).json("Add Blog Request Recieved")
}


// getHomeBlogs
exports.getHomeBlogController = async (req, res) => {
    console.log("Inside getHomeBlogController");
    try {
        const allHomeBlogs = await blogs.find().limit(6)
        res.status(200).json(allHomeBlogs)

    } catch (err) {
        res.status(401).json(err)
    }

}

// getHomeBestBlogs
exports.getHomeBestBlogController = async (req, res) => {
    console.log("Inside getHomeBestBlogs");
    try {
        const allHomeBestBlogs = await blogs.find().limit(3)
        res.status(200).json(allHomeBestBlogs)

    } catch (err) {
        res.status(401).json(err)
    }

}

// getUserBlog -authorised user
exports.getUserBlogController = async (req, res) => {
    console.log("Inside getUserBlogController");
    const userId = req.userId

    try {
        const allUserBlogs = await blogs.find({ userId })
        res.status(200).json(allUserBlogs)

    } catch (err) {
        res.status(401).json(err)
    }

}

// getAllBlogs
exports.getAllBlogController = async (req, res) => {
    console.log("Inside getAllBlogController");
    // search method
    const searchKey = req.query.search
    const query = {
        title: {
            $regex: searchKey, $options: "i"
        }
    }
    try {
        const allBlogs = await blogs.find(query)
        res.status(200).json(allBlogs)

    } catch (err) {
        res.status(401).json(err)
    }

}


// editBlog
exports.editBlogController = async (req, res) => {
    console.log("Inisde editBlogController");
    const { id } = req.params
    const { title, subDescription, description, date, blogImage } = req.body
    const reUploadImageFileName = req.file ? req.file.filename : blogImage
    // getting userId
    const userId = req.userId
    console.log(id, title, subDescription, description, date, reUploadImageFileName, userId);
    try {
        const updatedBlog = await blogs.findByIdAndUpdate({ _id: id },{
            title, subDescription, description, date, blogImage: reUploadImageFileName, userId
        }, { new: true })
        await updatedBlog.save()
        res.status(200).json(updatedBlog)
    } catch (err) {
        res.status(401).json(err)
    }


}


// deleteBlog
exports.deleteBlogController = async (req, res) => {
    console.log("Inside deleteBlogController");
    const { id } = req.params;
    
    try {
        const removeBlog = await blogs.findByIdAndDelete(id);
        
        if (!removeBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully", removeBlog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
