-- Create Database
CREATE DATABASE IF NOT EXISTS skill_platform;
USE skill_platform;

-- USERS
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student','mentor','admin') DEFAULT 'student',
    gender VARCHAR(20) DEFAULT 'other',
    profile_photo VARCHAR(255) DEFAULT '/images/default-avatar.png',
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COURSES
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_title VARCHAR(150) NOT NULL,
    course_description TEXT,
    course_level ENUM('basic','intermediate','advanced'),
    category VARCHAR(50) DEFAULT 'Technical',
    video_url VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
);

-- LESSONS
CREATE TABLE lessons (
    lesson_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    lesson_title VARCHAR(150) NOT NULL,
    lesson_content TEXT,
    video_url VARCHAR(255),
    lesson_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

-- ENROLLMENTS
CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE DEFAULT (CURRENT_DATE),
    UNIQUE(user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

-- REFLECTIONS
CREATE TABLE reflections (
    reflection_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    reflection_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

-- CONTESTS
CREATE TABLE contests (
    contest_id INT AUTO_INCREMENT PRIMARY KEY,
    contest_title VARCHAR(150),
    contest_description TEXT,
    contest_date DATE,
    duration_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CONTEST PARTICIPANTS
CREATE TABLE contest_participants (
    participation_id INT AUTO_INCREMENT PRIMARY KEY,
    contest_id INT NOT NULL,
    user_id INT NOT NULL,
    score INT DEFAULT 0,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(contest_id, user_id),
    FOREIGN KEY (contest_id) REFERENCES contests(contest_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- LEADERBOARD
CREATE TABLE leaderboard (
    leaderboard_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    leaderboard_type ENUM('monthly_streak', 'weekly_contest') NOT NULL,
    score INT DEFAULT 0,
    rank_position INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- JOBS
CREATE TABLE jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(150),
    company_name VARCHAR(150),
    job_link VARCHAR(255),
    related_course INT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (related_course) REFERENCES courses(course_id) ON DELETE SET NULL
);

-- COMMENTS
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    comment_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE
);

-- STREAKS
CREATE TABLE streaks (
    streak_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    current_streak INT DEFAULT 0,
    last_activity_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- CERTIFICATES
CREATE TABLE certificates (
    certificate_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    cert_title VARCHAR(150),
    cert_description TEXT,
    issue_date DATE,
    auth_id VARCHAR(50),
    image_url VARCHAR(255),
    tag_name VARCHAR(50),
    tag_color VARCHAR(20),
    category ENUM('Engineering', 'Product', 'Design') DEFAULT 'Engineering',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- -------------------------
-- INSERT DATA (ALL TABLES)
-- -------------------------

-- USERS
INSERT INTO users (user_id, full_name, email, password, role, gender, profile_photo, bio, created_at) VALUES
(1, 'karthik', 'karthik@gmail.com', 'hashedpass1', 'student', 'male', '/images/default-avatar.png', 'Passionate learner', NOW()),
(2, 'Sneha Reddy', 'sneha@gmail.com', 'hashedpass2', 'student', 'female', '/images/default-avatar.png', 'Avid reader and developer', NOW()),
(3, 'praveen', 'praveen@gmail.com', 'hashedpass3', 'mentor', 'male', '/images/default-avatar.png', 'Experienced tech mentor', NOW()),
(4, 'akash', 'akash@gmail.com', 'hashedpass4', 'student', 'male', '/images/default-avatar.png', 'Aspiring software engineer', NOW()),
(5, 'Admin User', 'admin@gmail.com', 'hashedpass5', 'admin', 'other', '/images/default-avatar.png', 'System administrator', NOW());

-- COURSES
INSERT INTO courses VALUES
(1,'HTML Fundamentals','Learn the basics of HTML','basic','Technical','https://www.youtube.com/watch?v=pQN-pnXPaVg',3,NOW()),
(2,'CSS Styling','Learn CSS','basic','Technical','https://www.youtube.com/watch?v=1Rs2ND1ryYc',3,NOW()),
(3,'JavaScript Programming','Intro JS','intermediate','Technical','https://www.youtube.com/watch?v=W6NZfCO5SIk',3,NOW()),
(4,'Node.js Backend','Backend dev','intermediate','Technical','https://www.youtube.com/watch?v=TlB_eWDSMt4',3,NOW()),
(5,'Full Stack Development','Full stack apps','advanced','Technical','https://www.youtube.com/watch?v=nu_pCVPKzTk',3,NOW()),
(6,'Business Strategy Basics','Business growth','basic','Business','https://www.youtube.com/watch?v=DpwjsB-tEVI',3,NOW()),
(7,'Graphic Design Fundamentals','Design intro','basic','Design','https://www.youtube.com/watch?v=YqQx75OPRa0',3,NOW()),
(8,'Personal Finance Management','Finance basics','basic','Soft Skills','https://www.youtube.com/watch?v=4j2em4RXoqU',3,NOW()),
(9,'Project Management Essentials','PM skills','intermediate','Business','https://www.youtube.com/watch?v=qKyiaAMgGqI',3,NOW()),
(10,'Digital Marketing','Marketing','intermediate','Business','https://www.youtube.com/watch?v=bixR-KIJKYM',3,NOW()),
(11,'Entrepreneurship 101','Start your own business','basic','Business','https://www.youtube.com/watch?v=9_H22b10iT0',3,NOW()),
(12,'Financial Analysis','Learn financial modeling','advanced','Business','https://www.youtube.com/watch?v=3-M2hI2wE1w',3,NOW()),
(13,'UI/UX Design Principles','User interface and experience','intermediate','Design','https://www.youtube.com/watch?v=c9Wg6Cb_YlU',3,NOW()),
(14,'Typography Basics','Learn about fonts and layouts','basic','Design','https://www.youtube.com/watch?v=sByzHoiYRo0',3,NOW()),
(15,'Advanced Adobe Illustrator','Vector graphics mastery','advanced','Design','https://www.youtube.com/watch?v=Ib8UBwu3y5w',3,NOW()),
(16,'Web Design Trends','Modern web aesthetics','intermediate','Design','https://www.youtube.com/watch?v=L2vS_050c-M',3,NOW()),
(17,'Effective Communication','Improve verbal and written skills','basic','Soft Skills','https://www.youtube.com/watch?v=HAnw168huqA',3,NOW()),
(18,'Leadership and Influence','Lead teams effectively','intermediate','Soft Skills','https://www.youtube.com/watch?v=lsPIJ2M6Mro',3,NOW()),
(19,'Time Management','Maximize productivity','basic','Soft Skills','https://www.youtube.com/watch?v=iONDebHX9qk',3,NOW()),
(20,'Conflict Resolution','Handle workplace conflicts','intermediate','Soft Skills','https://www.youtube.com/watch?v=KY5TWVz5ZDU',3,NOW());

-- LESSONS
INSERT INTO lessons VALUES
(1,1,'Intro HTML','Basics','https://www.youtube.com/watch?v=kUMe1FH4CGY',1,NOW()),
(2,1,'HTML Tags','Tags','https://www.youtube.com/watch?v=qz0aGYrrlhU',2,NOW()),
(3,2,'CSS Basics','CSS','https://www.youtube.com/watch?v=yfoY53QXEnI',1,NOW()),
(4,3,'JS Variables','Vars','https://www.youtube.com/watch?v=W6NZfCO5SIk',1,NOW()),
(5,4,'Node Setup','Setup','https://www.youtube.com/watch?v=TlB_eWDSMt4',1,NOW()),
(6,6,'Business Strategy','Intro','https://www.youtube.com/watch?v=DpwjsB-tEVI',1,NOW()),
(7,6,'Market Analysis','Analysis','https://www.youtube.com/watch?v=Q8mD02x2k9I',2,NOW()),
(8,7,'Design Principles','Design','https://www.youtube.com/watch?v=YqQx75OPRa0',1,NOW()),
(9,7,'Tools','Photoshop','https://www.youtube.com/watch?v=IyR_uYsRdPs',2,NOW()),
(10,8,'Budgeting','Budget','https://www.youtube.com/watch?v=4j2em4RXoqU',1,NOW()),
(11,8,'Investing','Invest','https://www.youtube.com/watch?v=8bJluR4v2gU',2,NOW()),
(12,9,'Planning','Plan','https://www.youtube.com/watch?v=qKyiaAMgGqI',1,NOW()),
(13,9,'Risk','Risk mgmt','https://www.youtube.com/watch?v=U2hG19bY8_U',2,NOW()),
(14,10,'SEO','SEO','https://www.youtube.com/watch?v=bixR-KIJKYM',1,NOW()),
(15,10,'Social Media','SM','https://www.youtube.com/watch?v=0hXqB8_s7R8',2,NOW()),
(16,5,'Intro to Full Stack','Frontend and Backend overview','https://www.youtube.com/watch?v=nu_pCVPKzTk',1,NOW()),
(17,11,'Starting a Business','What it takes to be an entrepreneur','https://www.youtube.com/watch?v=9_H22b10iT0',1,NOW()),
(18,12,'Reading Financial Statements','Balance sheets and income statements','https://www.youtube.com/watch?v=3-M2hI2wE1w',1,NOW()),
(19,13,'User Experience Basics','Understanding user needs','https://www.youtube.com/watch?v=c9Wg6Cb_YlU',1,NOW()),
(20,14,'Font Pairings','How to choose the right fonts','https://www.youtube.com/watch?v=sByzHoiYRo0',1,NOW()),
(21,15,'Pen Tool Mastery','Drawing vector paths','https://www.youtube.com/watch?v=Ib8UBwu3y5w',1,NOW()),
(22,16,'Modern Web Trends','What is popular in web design today','https://www.youtube.com/watch?v=L2vS_050c-M',1,NOW()),
(23,17,'Active Listening','How to truly listen to others','https://www.youtube.com/watch?v=HAnw168huqA',1,NOW()),
(24,18,'Leading by Example','Inspiring your team','https://www.youtube.com/watch?v=lsPIJ2M6Mro',1,NOW()),
(25,19,'Pomodoro Technique','Managing time in chunks','https://www.youtube.com/watch?v=iONDebHX9qk',1,NOW()),
(26,20,'De-escalation','Calming down a tense situation','https://www.youtube.com/watch?v=KY5TWVz5ZDU',1,NOW());

-- ENROLLMENTS
INSERT INTO enrollments VALUES
(1,1,1,CURDATE()),
(2,1,2,CURDATE()),
(3,2,1,CURDATE()),
(4,3,3,CURDATE()),
(5,4,1,CURDATE());

-- REFLECTIONS
INSERT INTO reflections VALUES
(1,1,1,'Great intro',NOW()),
(2,2,1,'Useful',NOW()),
(3,3,3,'Fun',NOW()),
(4,4,1,'Good',NOW()),
(5,1,2,'Helpful',NOW());

-- CONTESTS
INSERT INTO contests VALUES
(1,'HTML Quiz','Test HTML','2024-01-15',30,NOW()),
(2,'CSS Challenge','CSS test','2024-01-20',45,NOW()),
(3,'JS Test','JS coding','2024-01-25',60,NOW()),
(4,'Node Challenge','Backend','2024-02-01',90,NOW()),
(5,'Full Stack','Project','2024-02-10',120,NOW());

-- PARTICIPANTS
INSERT INTO contest_participants VALUES
(1,1,1,85,NOW()),
(2,1,2,92,NOW()),
(3,2,1,78,NOW()),
(4,3,3,88,NOW()),
(5,4,4,95,NOW());

-- LEADERBOARD
INSERT INTO leaderboard VALUES
(1,1,'monthly_streak',28,1,NOW()),
(2,2,'monthly_streak',25,2,NOW()),
(3,3,'monthly_streak',20,3,NOW()),
(4,4,'monthly_streak',14,4,NOW()),
(5,5,'monthly_streak',10,5,NOW()),
(6,1,'weekly_contest',1850,1,NOW()),
(7,2,'weekly_contest',1820,2,NOW()),
(8,3,'weekly_contest',1790,3,NOW()),
(9,4,'weekly_contest',1750,4,NOW()),
(10,5,'weekly_contest',1600,5,NOW());

-- JOBS
INSERT INTO jobs VALUES
(1,'Frontend Dev','Tech Solutions','link1',1,NOW()),
(2,'Web Designer','Creative','link2',2,NOW()),
(3,'JS Dev','Code Masters','link3',3,NOW()),
(4,'Backend Eng','Data Systems','link4',4,NOW()),
(5,'Full Stack','Web Innovations','link5',5,NOW());

-- COMMENTS
INSERT INTO comments VALUES
(1,1,1,'Great!',NOW()),
(2,2,1,'Nice',NOW()),
(3,3,2,'Helpful',NOW()),
(4,4,3,'Learned',NOW()),
(5,1,4,'Excellent',NOW());

-- STREAKS
INSERT INTO streaks VALUES
(1,1,5,'2024-01-10'),
(2,2,3,'2024-01-08'),
(3,3,7,'2024-01-12'),
(4,4,2,'2024-01-05');

-- CERTIFICATES
INSERT INTO certificates VALUES
(1,1,'React','Advanced','2024-10-24','AUTH1','img1','EXPERT','#f59e0b','Engineering',NOW()),
(2,1,'Agile','Scrum','2024-09-12','AUTH2','img2','PRO','#3b82f6','Product',NOW()),
(3,1,'Cloud','AWS','2024-08-05','AUTH3','img3','EXPERT','#f59e0b','Engineering',NOW()),
(4,1,'UIUX','Design','2024-07-20','AUTH4','img4','BASE','#22c55e','Design',NOW()),
(5,1,'Python','Data','2024-06-15','AUTH5','img5','ADV','#a855f7','Engineering',NOW());