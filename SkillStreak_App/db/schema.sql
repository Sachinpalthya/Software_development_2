CREATE DATABASE skill_platform;
USE skill_platform;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student','mentor','admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_title VARCHAR(150) NOT NULL,
    course_description TEXT,
    course_level ENUM('basic','intermediate','advanced'),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE lessons (
    lesson_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    lesson_title VARCHAR(150),
    lesson_content TEXT,
    lesson_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE reflections (
    reflection_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    reflection_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id)
);

CREATE TABLE contests (
    contest_id INT AUTO_INCREMENT PRIMARY KEY,
    contest_title VARCHAR(150),
    contest_description TEXT,
    contest_date DATE,
    duration_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contest_participants (
    participation_id INT AUTO_INCREMENT PRIMARY KEY,
    contest_id INT NOT NULL,
    user_id INT NOT NULL,
    score INT DEFAULT 0,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contest_id) REFERENCES contests(contest_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE leaderboard (
    leaderboard_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_score INT DEFAULT 0,
    rank_position INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(150),
    company_name VARCHAR(150),
    job_link VARCHAR(255),
    related_course INT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (related_course) REFERENCES courses(course_id)
);

CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    comment_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id)
);

CREATE TABLE streaks (
    streak_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    current_streak INT DEFAULT 0,
    last_activity_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(120),
    contact_no VARCHAR(15),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);