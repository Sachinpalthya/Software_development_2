-- Create Database
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


INSERT INTO users (user_id, full_name, email, password, role) VALUES
(1, 'karthik', 'karthik@gmail.com.com', 'hashedpass1', 'student'),
(2, 'Sneha Reddy', 'sneha@gmail.com', 'hashedpass2', 'student'),
(3, 'praveen', 'praveen@gmail.com', 'hashedpass3', 'mentor'),
(4, 'akash', 'akash@gmail.com', 'hashedpass4', 'student'),
(5, 'Admin User', 'admin@gmail.com', 'hashedpass5', 'admin');

INSERT INTO courses (course_id, course_title, course_description, course_level, created_by) VALUES
(1, 'HTML Fundamentals', 'Learn the basics of HTML for web development', 'basic', 3),
(2, 'CSS Styling', 'Understand how to style web pages using CSS', 'basic', 3),
(3, 'JavaScript Programming', 'Introduction to JavaScript programming', 'intermediate', 3),
(4, 'Node.js Backend', 'Learn backend development using Node.js', 'intermediate', 3),
(5, 'Full Stack Development', 'Build complete web applications', 'advanced', 3);

INSERT INTO lessons (lesson_id, course_id, lesson_title, lesson_content, lesson_order) VALUES
(1, 1, 'Introduction to HTML', 'Learn what HTML is and how it works', 1),
(2, 1, 'HTML Tags', 'Understanding common HTML tags', 2),
(3, 2, 'CSS Basics', 'Introduction to CSS styling', 1),
(4, 3, 'JavaScript Variables', 'Learn variables in JavaScript', 1),
(5, 4, 'Node.js Setup', 'How to install and run Node.js', 1);

INSERT INTO enrollments (enrollment_id, user_id, course_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 3, 3),
(5, 4, 1);

INSERT INTO reflections (reflection_id, user_id, lesson_id, reflection_text) VALUES
(1, 1, 1, 'This was a great introduction to HTML!'),
(2, 2, 1, 'I found the part about HTML tags very useful'),
(3, 3, 3, 'Learning CSS basics was fun'),
(4, 4, 1, 'Good overview of HTML fundamentals'),
(5, 1, 2, 'Understanding HTML tags helped me a lot');

INSERT INTO contests (contest_id, contest_title, contest_description, contest_date, duration_minutes) VALUES
(1, 'HTML Basics Quiz', 'Test your knowledge of HTML fundamentals', '2024-01-15', 30),
(2, 'CSS Styling Challenge', 'Apply CSS to style web pages', '2024-01-20', 45),
(3, 'JavaScript Programming Test', 'Solve JavaScript coding problems', '2024-01-25', 60),
(4, 'Node.js Backend Challenge', 'Build a simple backend application', '2024-02-01', 90),
(5, 'Full Stack Project', 'Create a complete web application', '2024-02-10', 120);

INSERT INTO contest_participants (participation_id, contest_id, user_id, score) VALUES
(1, 1, 1, 85),
(2, 1, 2, 92),
(3, 2, 1, 78),
(4, 3, 3, 88),
(5, 4, 4, 95);

INSERT INTO leaderboard (leaderboard_id, user_id, total_score) VALUES
(1, 1, 163),
(2, 2, 92),
(3, 3, 88),
(4, 4, 95);

INSERT INTO jobs (job_id, job_title, company_name, job_link, related_course) VALUES
(1, 'Frontend Developer', 'Tech Solutions Inc.', 'https://example.com/job1', 1),
(2, 'Web Designer', 'Creative Agency', 'https://example.com/job2', 2),
(3, 'JavaScript Developer', 'Code Masters', 'https://example.com/job3', 3),
(4, 'Backend Engineer', 'Data Systems', 'https://example.com/job4', 4),
(5, 'Full Stack Developer', 'Web Innovations', 'https://example.com/job5', 5);

INSERT INTO comments (comment_id, user_id, lesson_id, comment_text) VALUES
(1, 1, 1, 'Great explanation!'),
(2, 2, 1, 'Thanks for the clear examples'),
(3, 3, 2, 'Very helpful content'),
(4, 4, 3, 'I learned a lot'),
(5, 1, 4, 'Excellent tutorial');

INSERT INTO streaks (streak_id, user_id, current_streak, last_activity_date) VALUES
(1, 1, 5, '2024-01-10'),
(2, 2, 3, '2024-01-08'),
(3, 3, 7, '2024-01-12'),
(4, 4, 2, '2024-01-05');

