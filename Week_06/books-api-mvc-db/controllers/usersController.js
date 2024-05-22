// Step 4, Part 2 - Write the code to implement the controller for the Users

// Import the User class
const User = require('../models/user');

// Define Controllers Functions
// Create the createUser(req, res) function 
async function createUser(req, res)  {
    // Use try and catch block to handle errors
    try {
        // Extract user data from the request body
        const newUser = await User.createUser(req.body)
        // Return a success response upon successful creation
        res.status(201).json({ success: true, data: newUser });
    }
    // Error handling
    catch {
        res.status(400).json({ success: false, error: err.message });
    }
}


// Create the getAllUsers(req, res) function
async function getAllUsers(req, res) {
    try {
        // Call the User.getAllUsers method to retreieve all users
        const users = await User.getAllUsers();
        // Return a response with a list of user objects upon successful retreival
        res.status(200).json({ success: true, data: users })
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

// Create the getUserById(req, res) function
async function getUserById(req, res) {
    try {
        // Extract the user ID fom the request parameter and call the method to find the user
        const user = await User.getUserById(req.params.id);
        // If not found, return a not-found error response
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found'});
        }
        // If user is found, return a response with the user object
        res.status(200).json({ success: true, data: user });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

// Create the function updateUser(req, res)
async function updateUser(req, res) {
    try {
        // Extract user ID and updated data from the request and call the method to update the user info
        const updatedUser = await User.updateUser(req.params.id, res.body);
        // Return a success reponse upon successful update
        res.status(200).json({ success: true, data: updatedUser });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// Create the function deleteUser(req, res)
async function deleteUser(req, res) {
    try {
        // Extract the user ID from the request parameter and call the method to delete the user
        await User.deleteUser(req.params.id);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

// Step 5, Part 1
// Create a searchUsers function
async function searchUsers(req, res) {
    // Extract search term from the request query parameters
    const searchTerm = req.query.searchTerm; 
    try {
        // Call the searchUsers method in the User model
        const users = await User.searchUsers(searchTerm);
        // Upon successful search, the retreived users are sent as a JSON response
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({message: 'Error searching users' });
    }
}



// Export the controller functions
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUsers
};