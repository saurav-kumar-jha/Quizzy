# QUIZZY – Online Quiz Management System

QUIZZY is a full-stack web application designed to conduct online quizzes securely and efficiently.  
It replaces traditional paper-based examination systems with a modern, automated, and scalable digital solution.

---

## Project Overview

QUIZZY allows:

- 👨‍🏫 Teachers to create and manage quizzes
- 👩‍🎓 Students to attempt quizzes using a unique exam link
- 📊 Automatic evaluation and instant result generation

The system ensures secure authentication, role-based access, and centralized data management.

---

## 🏗️ Project Architecture

The project consists of two main parts:

- **Frontend (React + Vite)** – Handles UI, routing, and API integration  
- **Backend (Spring Boot)** – Handles authentication, business logic, and database operations  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- Tailwind CSS

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Maven

### Database
- PostgreSQL / MySQL

---

## 🔐 Core Features

- Role-Based Authentication (Teacher / Student)
- Secure Login using JWT
- Quiz Creation and Management
- Question CRUD Operations
- Unique Quiz Link Generation
- Automatic Answer Evaluation
- Instant Result Generation
- Centralized Data Storage
- Responsive UI Design

---

## ❗ Problems Solved

- Eliminates manual paper-based exams  
- Reduces time-consuming answer checking  
- Removes human errors in evaluation  
- Manages large numbers of students efficiently  
- Enables remote exam access  
- Improves exam security  
- Provides structured result analysis  
- Reduces repetitive work for teachers  

---

## ⚙️ How It Works

1. Teacher registers and logs in  
2. Teacher creates a quiz  
3. Teacher adds multiple-choice questions  
4. System generates a unique quiz link  
5. Student opens the link and attempts the quiz  
6. System evaluates answers automatically  
7. Results are stored in the database  
8. Teacher views performance reports  

---

## 👨‍🏫 Teacher Functionalities

- Register & Login
- Create Quiz
- Add / Update / Delete Questions
- Generate Exam Link
- View Student Results
- Manage Quiz Data

---

## 👩‍🎓 Student Functionalities

- Access Quiz using link
- Attempt Quiz
- Submit Answers
- View Result Instantly

---

## 🗄️ Database Structure

### Main Entities:
- User
- Quiz
- Question
- Result

### Relationships:
- One Teacher → Many Quizzes  
- One Quiz → Many Questions  
- One Student → Many Results  

---

## 💻 System Requirements

### Hardware
- Minimum 4GB RAM
- Stable Internet Connection
- Laptop/Desktop

### Software
- Node.js
- Java 17+
- PostgreSQL / MySQL
- Modern Web Browser

---

## 🚀 Installation Guide

### 🔹 Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
