const Blog = require('../database/Blog');

createBlog = async (blogData) => {
    return await Blog.create(blogData);
};
const findBlogs = async (search) => {
    try {

        const regex = new RegExp(search, "i"); // Case-insensitive search for the keyword
        return await Blog.find({
            isDeleted: false, // Only fetch blogs that are not deleted
            $or: [
                { title: regex },    // Search keyword in the `title` field
                { author: regex },   // Search keyword in the `author` field
            ],
        });
    } catch (error) {
        console.error("Error finding blogs:", error);
        throw error; // Propagate the error to handle it in the calling function
    }
};


module.exports = { createBlog, findBlogs };
