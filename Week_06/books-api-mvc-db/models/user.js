// Step 4, part 1 - Write the code for user and try and create several functions while implementing CRUD

// Import the mssql module into the file to intercat with Microsoft SQL Database
const sql = require("mssql");
// Define User class with the properties in the dbConfig.js folder
const config = require("../dbConfig");

// Transform inputted user data into structured data that can be used as parameters or more in this code
class User {
    constructor (id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    // Create function createUser(user) to perform its namesake
    // Static functions are used since it is only needed to call on the user class only
    static async createUser(user) {
        let connection;
        // Use try and catch for error handling
        try {
            // Establish a connection with the database
            connection = await sql.connect(config);
    
            // Insert user data into the Users table and retrieve the ID of the inserted record
            const sqlQuery = `
                INSERT INTO Users (username, email) VALUES (@username, @email);
                SELECT SCOPE_IDENTITY() AS id;
            `;
            const request = connection.request();
            request.input("username", sql.VarChar, user.username);
            request.input("email", sql.VarChar, user.email);
            
            // Execute the query
            const insertResult = await request.query(sqlQuery);
            const userId = insertResult.recordset[0].id; // Assuming SCOPE_IDENTITY() returns the last inserted ID
    
            // Retrieve the newly created user's information
            const userQuery = 'SELECT * FROM Users WHERE id = @id';
            request.input('id', sql.Int, userId);
            const userResult = await request.query(userQuery);
    
            // Return the user object
            return userResult.recordset[0];
        } 

        // Catch any errors
        catch (err) {
            // Handle any errors that might occur
            console.error('Error creating user:', err);
            throw err; // Re-throw the error for further handling
        } 

        // Close the connecion
        finally {
            // Close the connection to the database
            if (connection) {
                connection.close();
            }
        }
    }

    // Create function getAllUsers()
    static async getAllUsers() {
        // Define what is connection for the finally block to access
        let connection
        try{
            connection = await sql.connect(config);
            // Write SQL statement to retreieve all user data from Users table
            const sqlQuery = 'SELECT * FROM Users';
            const result = await connection.request().query(sqlQuery);
            return result.recordset; // Returns an array of user objects
        }

        // catch any errors
        catch (err) {
            console.error('Error fetching all users:', err);
            throw err;
        }

        // Close the connection
        finally {
            if (connection) {
                connection.close();
            }
        }
    }

    // Create function getUserById()
    static async getUserById(id) {
        let connection;
        try {
            connection = await sql.connect(config);
            const request = connection.request();
            request.input('id', sql.Int, id);
            // Create a SQL statement to retrieve all user data from the Users table
            const sqlQuery = 'SELECT * FROM Users WHERE id = @id';
            const result = await request.query(sqlQuery);
            // Return an array of user objects from the retreived data
            return result.recordset[0]; 
        }
        catch(err) {
            console.error('Error fetching user by ID:', err);
            throw err;
        }
        finally {
            if (connection) {
                connection.close();
            }
        }
    }

    // Create function updateUser(id, updatedUser)
    static async updateUser(id, updatedUser) {
        let connection
        try {
            connection = await sql.connect(config);
            const request = connection.request();
            request.input('id', sql.Int, id);
            request.input('username', sql.VarChar, updatedUser.username);
            request.input('email', sql.VarChar, updatedUser.email);
            // This statement updates the user info for a specified ID
            const sqlQuery = 'UPDATE Users SET username = @username, email = @email WHERE id = @id';
            await request.query(sqlQuery);
            // Return a successful message 
            return 'User updated successfully.';
        }
        catch (err) {
            console.error('Error updating user:', err);
            throw err;
        }
        finally {
            if (connection) {
                connection.close()
            }
        }
    }

    // Create function getUserById()
    static async deleteUser(id) {
        let connection;
        try{
            connection = await sql.connect(config);
            const request = connection.request();
            request.input('id', sql.Int, id);
            // Create a SQL statement to delete the user with a specified id from the Users table
            const sqlQuery = 'DELETE FROM Users WHERE id = @id';
            await request.query(sqlQuery);
            // Return a message 
            return 'User deleted successfully.';
        }
        catch(err) {
            console.error('Error deleting user:', err);
            throw err;
        }
        finally {
            if (connection) {
                connection.close();
            }
        }
    }

    // Step 5, Part 1
    // Expand the user management functionalities to include searching for users based on username and email
    // The method takes a parameter as an input E.g. Username or email fragment
    static async searchUsers(searchTerm) {
        const connection = await sql.connect(config);
        try {
            // SQL query to search for the searchTerm in both the username and email columns
            const query =`
            SELECT *
            FROM Users
            WHERE username LIKE '%${searchTerm}%'
                OR email LIKE '%${searchTerm}%'
            `;
            // The query results are retreieved using the connection,request().query and returned as the recordset
            const result = await connection.request().query(query);
            return result.recordset;
        }

        // Catch any potential errors via try, catch, and finally
        catch (err) {
            throw new Error("Error searching users");
        }

        // Close the connection even if there is an error
        finally {
            await connection.close();
        }
    }
}
