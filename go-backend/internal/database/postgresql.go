package database

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"os"
	"strconv"
)

var Db *sql.DB

func ConnectDatabase() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error occurred on .env file, please check")
	}

	// we read our .env file
	host := os.Getenv("HOST")
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	user := os.Getenv("POSTGRES_USER")
	dbname := os.Getenv("POSTGRES_DB")
	pass := os.Getenv("POSTGRES_PASSWORD")
	psqlSetup := fmt.Sprintf("postgres://%v:%v@%v:%v/%v?sslmode=disable",
		user, pass, host, port, dbname)

	db, errSql := sql.Open("postgres", psqlSetup)
	if errSql != nil {
		fmt.Println("There is an error while connecting to the database", err)
		panic(err)
	} else {
		Db = db
		fmt.Println("Successfully connected to database!")
	}

	createTablesQuery := `
	CREATE TABLE IF NOT EXISTS tatarby_users (
		id SERIAL PRIMARY KEY,
		email VARCHAR(255) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL,
		name VARCHAR(255) NOT NULL,
		referral_link VARCHAR(255) NOT NULL,
		photo_url VARCHAR(255)
	);

	CREATE TABLE IF NOT EXISTS tatarby_courses (
	    CourseID SERIAL PRIMARY KEY,
	    CourseName VARCHAR(255),
	    ShortDescription TEXT,
	    Description TEXT,
	    Difficulty VARCHAR(50)
	);

	CREATE TABLE IF NOT EXISTS tatarby_lessons (
	    LessonID SERIAL PRIMARY KEY,
	    LessonName VARCHAR(255),
	    LessonDescription TEXT,
	    Body TEXT,
	    Photo_url TEXT,
	    CourseID INT REFERENCES tatarby_courses(CourseID)
	);

	CREATE TABLE IF NOT EXISTS tatarby_tasks (
	    TaskID SERIAL PRIMARY KEY,
	    LessonID INT REFERENCES tatarby_lessons(LessonID),
	    TaskType VARCHAR(50),
	    TaskText TEXT,
	    Options TEXT[],
	    AudioPath VARCHAR(255),
	    CorrectAnswer TEXT,
	    UserVoiceAnswer TEXT
	);

	CREATE TABLE IF NOT EXISTS tatarby_rating (
	    id SERIAL PRIMARY KEY,
	    name VARCHAR(255) NOT NULL,
	    score INT
	);

	CREATE TABLE IF NOT EXISTS tatarby_completed_lessons (
		id SERIAL PRIMARY KEY,
		user_id INT REFERENCES tatarby_users(id),
		course_id INT REFERENCES tatarby_courses(CourseID),
		lesson_id INT REFERENCES tatarby_lessons(LessonID),
		score INT
	);

	CREATE TABLE IF NOT EXISTS tatarby_promo (
	  id SERIAL PRIMARY KEY,
	  promo VARCHAR(50) NOT NULL UNIQUE,
	  email VARCHAR(255) NOT NULL UNIQUE
	);
	`
	_, err = Db.Exec(createTablesQuery)
	if err != nil {
		fmt.Println("An error occurred while creating the tables:", err)
		panic(err)
	} else {
		fmt.Println("Tables have been created successfully or already exist")
	}

	// Check if the foreign key constraint already exists before adding it
	checkConstraintQuery := `
	SELECT 1
	FROM information_schema.table_constraints
	WHERE constraint_type = 'FOREIGN KEY'
	AND table_name = 'tatarby_lessons'
	AND constraint_name = 'fk_course';
	`
	var exists int
	err = Db.QueryRow(checkConstraintQuery).Scan(&exists)
	if err == sql.ErrNoRows {
		// Ensure existing data does not violate the new constraint
		clearInvalidReferences := `
		UPDATE tatarby_lessons
		SET CourseID = NULL
		WHERE CourseID IS NOT NULL AND CourseID NOT IN (SELECT CourseID FROM tatarby_courses);
		`
		_, err = Db.Exec(clearInvalidReferences)
		if err != nil {
			fmt.Println("An error occurred while clearing invalid references:", err)
			panic(err)
		}

		// The constraint does not exist, so we can add it
		addConstraintQuery := `
		ALTER TABLE tatarby_lessons
		ADD CONSTRAINT fk_course
		FOREIGN KEY (CourseID)
		REFERENCES tatarby_courses(CourseID);
		`
		_, err = Db.Exec(addConstraintQuery)
		if err != nil {
			fmt.Println("An error occurred while adding the foreign key constraint:", err)
			panic(err)
		} else {
			fmt.Println("Foreign key constraint added successfully")
		}
	} else if err != nil {
		fmt.Println("An error occurred while checking the foreign key constraint:", err)
		panic(err)
	} else {
		fmt.Println("Foreign key constraint already exists")
	}
}
