// Step 4
// Part 1 - Add several lines of code
module.exports = {
    user: "booksapi", // Replace with your SQL Server login username
    password: "Password", // Replace with your SQL Server login password
    server: "localhost",
    database: "bed_db",
    trustServerCertificate: true,
    options: {
      port: 1433, // Default SQL Server port
      connectionTimeout: 60000, // Connection timeout in milliseconds
    },
  };
