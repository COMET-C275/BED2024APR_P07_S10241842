-- Step 2, part 3 - Execute the scripts
USE bed_db
GO

-- 3.1 - Create a books table
CREATE TABLE Books (
	id INT IDENTITY(1,1) PRIMARY KEY,
	title VARCHAR(50) NOT NULL UNIQUE, -- This sets the title to be compulsory, is unique and can't be null
	author VARCHAR(50) NOT NULL -- Author is requires and can't be null
);

-- 3.2 - Insert data into the books table
INSERT INTO Books (title, author)
VALUES
	('The Lord of the Rings', 'J.R.R. Tolkien'),
	('Pride and Prejudice', 'Jane Austen');

-- 3.3 - Verfity the data added
SELECT TOP (1000) [id]
		, [title]
		, [author]
	FROM [bed_db].[dbo].[Books]

SELECT * FROM Books