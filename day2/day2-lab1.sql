CREATE DATABASE iti_grading;
USE iti_grading;

CREATE TABLE Students (
  StudentID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Email VARCHAR(100) UNIQUE,
  Address TEXT
);

CREATE TABLE Student_Phones (
  PhoneID INT AUTO_INCREMENT PRIMARY KEY,
  StudentID INT,
  PhoneNumber VARCHAR(20),
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);

CREATE TABLE Subjects (
  SubjectID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(100),
  Description TEXT,
  MaxScore INT
);

CREATE TABLE Student_Subjects (
  EnrollmentID INT AUTO_INCREMENT PRIMARY KEY,
  StudentID INT,
  SubjectID INT,
  EnrollmentDate DATE,
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
  FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID)
);

CREATE TABLE Exams (
  ExamID INT AUTO_INCREMENT PRIMARY KEY,
  StudentID INT,
  SubjectID INT,
  ExamDate DATE,
  Score INT,
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
  FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID)
);

INSERT INTO Students (Name, Email, Address)
VALUES
('Ali Hassan', 'ali@gmail.com', 'Cairo'),
('Sara Ahmed', 'sara@gmail.com', 'Alexandria'),
('Omar Khaled', 'omar@gmail.com', 'Giza'),
('Mona Tarek', 'mona@gmail.com', 'Cairo'),
('Youssef Ibrahim', 'youssef@gmail.com', 'Mansoura');

INSERT INTO Student_Phones (StudentID, PhoneNumber)
VALUES
(1, '01011111111'),
(1, '01011112222'),
(2, '01022223333'),
(3, '01033334444'),
(4, '01044445555');


INSERT INTO Subjects (Name, Description, MaxScore)
VALUES
('C', 'Basic Programming in C', 100),
('CPP', 'Object-Oriented Programming', 100),
('HTML', 'Web Structure Language', 50),
('JS', 'Frontend Scripting Language', 70),
('SQL', 'Database Fundamentals', 100);

INSERT INTO Student_Subjects (StudentID, SubjectID, EnrollmentDate)
VALUES
(1, 1, '2025-01-10'),
(1, 2, '2025-01-12'),
(2, 3, '2025-02-05'),
(3, 5, '2025-03-01'),
(4, 1, '2025-02-15');

INSERT INTO Exams (StudentID, SubjectID, ExamDate, Score)
VALUES
(1, 1, '2025-05-01', 85),
(1, 2, '2025-05-10', 90),
(2, 3, '2025-05-15', 40),
(3, 5, '2025-05-20', 95),
(4, 1, '2025-05-25', 88);

SELECT * FROM Students;
SELECT * FROM Student_Phones;
SELECT * FROM Subjects;
SELECT * FROM Student_Subjects;
SELECT * FROM Exams;


