# ZPHS MLPL — High School Academic Marks & Ranking Management Portal

A full-stack school marks management and ranking system built with **Node.js, Express, MongoDB (Mongoose), and Vanilla HTML5/CSS3/JavaScript** (No React).

## 🌟 Key Features

1. **7 Core Subjects**:
   - Telugu, Hindi, English, Maths, Physics, Biology, Social.

2. **69 Registered Students (Sections A & B)**:
   - **Group-X**: 11 students (`X-1` to `X-11`).
   - **Group-Y**: 18 students (`Y-1` to `Y-18`).
   - **Group-Z**: 40 students (`Z-1` to `Z-40`).
   - **Pre-assigned Phone Numbers**: Hardcoded/seeded deterministically in MongoDB backend for every student (e.g. `9848011001` to `9848013040`). Teachers never have to type phone numbers manually.

3. **30 Independent Tests (`Test-1` to `Test-30`)**:
   - Each test maintains independent rankings and separate student records.

4. **5-Field Marks Entry with Live Scaled Calculation (600 Max Total Marks)**:
   - **Student Name**: Dropdown with 69 options with fuzzy filtering (type any letters in any order e.g. `x 5`, `y 12`, `z 40`, or phone digits).
   - **Test Name**: Dropdown with options up to 30 tests (`Test-1` to `Test-30`).
   - **Subject**: Dropdown with the 7 subjects.
   - **Max Marks Conducted**: 4 options (`20`, `25`, `50`, `100`).
   - **Marks Scored**: Live automatic scaling calculation:
     - **Physics & Biology**: Scaled to **50 marks** each:
       $$\text{Counting Marks} = \left(\frac{\text{Marks Scored}}{\text{Max Marks}}\right) \times 50$$
     - **Telugu, Hindi, English, Maths, Social**: Scaled to **100 marks** each:
       $$\text{Counting Marks} = \left(\frac{\text{Marks Scored}}{\text{Max Marks}}\right) \times 100$$
     - **Total Marks**: Calculated out of **600 Marks** ($100 \times 5 + 50 \times 2 = 600$).
     - **Percentage**: $\frac{\text{Total Marks}}{600} \times 100$.

5. **Rankings in 4 Ways**:
   - **Way 1**: Group-X students ranked by total score (top marks first) + Excel download.
   - **Way 2**: Group-Y students ranked by total score (top marks first) + Excel download.
   - **Way 3**: Group-Z students ranked by total score (top marks first) + Excel download.
   - **Way 4**: All students (Groups X, Y, Z combined) ranked by total score (top marks first) + Excel download.
   - Search by student name or phone number.
   - Ascending / Descending sorting options.

6. **Instant Excel Export (`.xlsx`)**:
   - **Download All Groups (Group-Wise Ranked Order)**: Generates a unified Excel file where the primary sheet contains all students structured **group-wise in ranked order**:
     1. Ranked order of **Group-X** (1 to 11)
     2. Blank separator space
     3. Ranked order of **Group-Y** (1 to 18)
     4. Blank separator space
     5. Ranked order of **Group-Z** (1 to 40)
     - Accompanied by individual sheets for Group-X, Group-Y, Group-Z, and overall school rank.
   - **Current View Export**: Downloads spreadsheets formatted with headers, phone numbers, individual subject scores (with Physics & Biology out of 50), total marks (/600), percentage, and grades.

7. **Parent & Student Academic Progress View (Student Report Card)**:
   - Search or select any student to view their complete academic history across all 30 tests.
   - Displays all 7 subject marks for every test, total marks (/600), percentage, group rank, and overall school rank.
   - Real-time KPI summaries: Tests Attempted, Cumulative Average %, Best Test, Strongest Subject, and Focus Area.
   - Visual subject-wise performance breakdown bars across the 7 core subjects.
   - Official printable report card layout with school letterhead, student profile box, test matrix, grading key, and signature blocks for Class Teacher, Headmaster/Principal, and Parent.
   - 1-Click WhatsApp update message generator to copy and message parents instantly (formatted out of 600 marks).
   - Dedicated Excel download for individual student report cards.

8. **Teacher Management Tools**:
   - Clean subject switching: When selecting a new subject, marks input fields are automatically cleared and ready for entry without carrying over previous subject marks.
   - Edit any existing mark record (with live recalculation to 100).
   - Delete mark records with confirmation dialog.

8. **Architecture**:
   - Entire backend is in a **single file** (`server.js`) using Express and Mongoose.
   - Database connection via MongoDB connection string (`MONGODB_URI` in `.env`).
   - Zero external frontend frameworks (Vanilla HTML, CSS, JavaScript).

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB URI (`.env`)
Open `.env` to configure your MongoDB connection string:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/zphs_school
```
*Note: If you are using MongoDB Atlas, replace `MONGODB_URI` with your Atlas SRV string:*
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/zphs_school?retryWrites=true&w=majority
```
*(If MongoDB is not running locally, the server automatically starts an in-memory fallback store so you can explore and test the UI immediately without roadblocks).*

### 3. Start the Server
```bash
node server.js
```
or
```bash
npm start
```

### 4. Open in Browser
Visit: **[http://localhost:3000](http://localhost:3000)**
