const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zphs_school';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Constants
const SUBJECTS = ['Telugu', 'Hindi', 'English', 'Maths', 'Physics', 'Biology', 'Social'];
const ALLOWED_MAX_MARKS = [20, 25, 50, 100];
const TESTS = Array.from({ length: 30 }, (_, i) => `Test-${i + 1}`);

// 69 Students Definition
// Group X: 11 students (X-1 to X-11)
// Group Y: 18 students (Y-1 to Y-18)
// Group Z: 40 students (Z-1 to Z-40)
const MASTER_STUDENTS = [];

// Group X (11 students)
  MASTER_STUDENTS.push(
    {
    studentId: 'X-1',
    name: "ADIBOYINA GURU VISHNU",
    group: 'Group-X',
    section: 'A',
    phoneNumber: '1234567890',
    rollNumber: 1
  },
  {
    studentId: 'X-2',
    name: "SANMALA ANAND KUMAR",
    group: 'Group-X',
    section: 'A',
    phoneNumber: '1234567890',
    rollNumber: 2
  },
  {
    studentId: 'X-3',
    name: "YEDALA VIJETHA",
    group: 'Group-X',
    section: 'A',
    phoneNumber: '1234567890',
    rollNumber: 3
  },
  {
    studentId: 'X-4',
    name: "ADIBOINA PRAVALLIKA",
    group: 'Group-X',
    section: 'B',
    phoneNumber: '1234567890',
    rollNumber: 4
  },
  {
    studentId: 'X-5',
    name: "BALAGANI PADMAJA",
    group: 'Group-X',
    section: 'B',
    phoneNumber: '1234567890',
    rollNumber: 5
  },
  {
    studentId: 'X-6',
    name: "DANTHANALA BRAHMINI",
    group: 'Group-X',
    section: 'B',
    phoneNumber: '1234567890',
    rollNumber: 6
  },
  {
    studentId: 'X-7',
    name: "KORIVI NANDA KISHORE REDDY",
    group: 'Group-X',
    section: 'B',
    phoneNumber: '1234567890',
    rollNumber: 7
  },
  {
    studentId: 'X-8',
    name: "SOMIREDDYPALLI PRANAVI MANI BHASYA",
    group: 'Group-X',
    section: 'B',
    phoneNumber: '1234567890',
    rollNumber: 8
  },
  {
    studentId: 'X-9',
    name: "YARAMPALLY AJAY BABU",
    group: 'Group-X',
    section: 'B',
    phoneNumber: '1234567890',
    rollNumber: 9
  },
  {
    studentId: 'X-10',
    name: "PONGURU NAGA BHARATH KUMAR",
    group: 'Group-X',
    section: 'B',
    phoneNumber: '1234567890',
    rollNumber: 10
  },
  {
    studentId: 'X-11',
    name: "SANMALA PRABHAKAR",
    group: 'Group-X',
    section: 'B',
    phoneNumber: '1234567890',
    rollNumber: 11
  },
);


// Group Y (18 students)

  MASTER_STUDENTS.push(
    {
    studentId: `Y-12`,
    name: "ADIBOINA GURU LAKSHMI",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 12
  },
  {
    studentId: `Y-13`,
    name: "AMBAVARAM SUDHARSHAN REDDY",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 13
  },
  {
    studentId: `Y-14`,
    name: "BATHULA CHAITRA",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 14
  },
  {
    studentId: `Y-15`,
    name: "GUDIME DIVYA",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 15
  },
  {
    studentId: `Y-16`,
    name: "KODURU MUNI CHANDRA",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 16
  },
  {
    studentId: `Y-17`,
    name: "KORIVI KASIREDDY",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 17
  },
  {
    studentId: `Y-18`,
    name: "LEKKALA ARUNA",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 18
  },
  {
    studentId: `Y-19`,
    name: "MADDU YASWANTH YADAV",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 19
  },
  {
    studentId: `Y-20`,
    name: "NAGIPOGU HEMA SREE",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 20
  },
  {
    studentId: `Y-21`,
    name: "PETLU NAVEEN KUMAR",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 21
  },
  {
    studentId: `Y-22`,
    name: "PONGURU SUVARNA",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 22
  },
  {
    studentId: `Y-23`,
    name: "PUTTA CHARANYA",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 23
  },
  {
    studentId: `Y-24`,
    name: "PUTTA VARALAKSHMI",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 24
  },
  {
    studentId: `Y-25`,
    name: "SOMIREDDY PALLI ANJALI",
    group: 'Group-Y',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 25
  },
  {
    studentId: `Y-26`,
    name: "MUTTHALURU VENKATA THARUN KUMAR",
    group: 'Group-Y',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 26
  },
  {
    studentId: `Y-27`,
    name: "MALLE SWETHA",
    group: 'Group-Y',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 27
  },
  {
    studentId: `Y-28`,
    name: "PUTTHA MEGHANA",
    group: 'Group-Y',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 28
  },
  {
    studentId: `Y-29`,
    name: "TIRUVEEDULA BHAVITHA RANI",
    group: 'Group-Y',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 29
  },
);


// Group Z (40 students)

  MASTER_STUDENTS.push(
    {
    studentId: `Z-30`,
    name: "BADVEL SUSHMA",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 30
  },
  {
    studentId: `Z-31`,
    name: "DOLLU NAGARAJU",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 31
  },
  {
    studentId: `Z-32`,
    name: "GUDIME ABINAY",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 32
  },
  {
    studentId: `Z-33`,
    name: "KANAGARI VASANTA",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 33
  },
  {
    studentId: `Z-34`,
    name: "KODURU NAGA INDRAJA",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 34
  },
  {
    studentId: `Z-35`,
    name: "KONDA SREENATH REDDY",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 35
  },
  {
    studentId: `Z-36`,
    name: "LEKKALA RAMI REDDY",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 36
  },
  {
    studentId: `Z-37`,
    name: "MALLE UPENDRA",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 37
  },
  {
    studentId: `Z-38`,
    name: "MANUPATI GAYATHRI",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 38
  },
  {
    studentId: `Z-39`,
    name: "MEKALA VINEEL KUMAR",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 39
  },
  {
    studentId: `Z-40`,
    name: "NAGIPOGU NARESH",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 40
  },
  {
    studentId: `Z-41`,
    name: "NAGIPOGU UGRASIMHA",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 41
  },
  {
    studentId: `Z-42`,
    name: "NARIPOGU SUDARSAN",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 42
  },
  {
    studentId: `Z-43`,
    name: "PANDITH PRASANTH",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 43
  },
  {
    studentId: `Z-44`,
    name: "PUTTA RUPPINI",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 44
  },
  {
    studentId: `Z-45`,
    name: "SHAIK RIHAN",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 45
  },
  {
    studentId: `Z-46`,
    name: "SUNKARA SANTHOSH KUMAR",
    group: 'Group-Z',
    section: "A",
    phoneNumber: '1234567890',
    rollNumber: 46
  },
  {
    studentId: `Z-47`,
    name: "ADIBOYANA MANASA",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 47
  },
  {
    studentId: `Z-48`,
    name: "AMBAVARAM SUMANTH REDDY",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 48
  },
  {
    studentId: `Z-49`,
    name: "CHITTIBOINA LAKSHMI PRASANNA",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 49
  },
  {
    studentId: `Z-50`,
    name: "CHITTIBOINA SREENATH",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 50
  },
  {
    studentId: `Z-51`,
    name: "CHITTIBOINA VENKATA LAKSHMI",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 51
  },
  {
    studentId: `Z-52`,
    name: "DEVIREDDY VENKATA KOWSIK",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 52
  },
  {
    studentId: `Z-53`,
    name: "GUDIME DILEEP",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 53
  },
  {
    studentId: `Z-54`,
    name: "GUDIME KEVIN CHERI",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 54
  },
  {
    studentId: `Z-55`,
    name: "KORIVI CHAITHANYA REDDY",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 55
  },
  {
    studentId: `Z-56`,
    name: "LEKKALA NAGA DUSWANTH KUMAR REDDY",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 56
  },
  {
    studentId: `Z-57`,
    name: "MAGASANI NAGESWARA RAO",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 57
  },
  {
    studentId: `Z-58`,
    name: "MALLE VENKATA RAMOHAN",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 58
  },
  {
    studentId: `Z-59`,
    name: "MALLE VENKATA SAI",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 59
  },
  {
    studentId: `Z-60`,
    name: "MUTTALURU RENUKA",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 60
  },
  {
    studentId: `Z-61`,
    name: "POGURI NAGA ANUSHA",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 61
  },
  {
    studentId: `Z-62`,
    name: "POGURU NAGESWARI",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 62
  },
  {
    studentId: `Z-63`,
    name: "PONGURU JAYASIMHA",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 63
  },
  {
    studentId: `Z-64`,
    name: "PUTTA KRANTHI KUMAR",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 64
  },
  {
    studentId: `Z-65`,
    name: "RAYAPATI MOSES",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 65
  },
  {
    studentId: `Z-66`,
    name: "SANNAPURI VENKATA JAGAN KUMAR",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 66
  },
  {
    studentId: `Z-67`,
    name: "THOKALA NANDINI",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 67
  },
  {
    studentId: `Z-68`,
    name: "VARIKUNTLA KASI ESWAR",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 68
  },
  {
    studentId: `Z-69`,
    name: "YARRABALLE LOKESH",
    group: 'Group-Z',
    section: "B",
    phoneNumber: '1234567890',
    rollNumber: 69
  }
);


// Mongoose Schemas & Models
const StudentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  group: { type: String, required: true, enum: ['Group-X', 'Group-Y', 'Group-Z'] },
  section: { type: String, required: true, enum: ['A', 'B'] },
  phoneNumber: { type: String, required: true },
  rollNumber: { type: Number, required: true }
}, { timestamps: true });

const MarkSchema = new mongoose.Schema({
  studentId: { type: String, required: true, index: true },
  testName: { type: String, required: true, index: true },
  subject: { type: String, required: true, enum: SUBJECTS },
  maxMarks: { type: Number, required: true, enum: ALLOWED_MAX_MARKS },
  rawMarks: { type: Number, required: true, min: 0 },
  scaledMarks: { type: Number, required: true }, // Out of 100
  updatedAt: { type: Date, default: Date.now }
});

MarkSchema.index({ studentId: 1, testName: 1, subject: 1 }, { unique: true });

const Student = mongoose.model('Student', StudentSchema);
const Mark = mongoose.model('Mark', MarkSchema);

// Memory fallback store in case MongoDB is not running locally yet
let isMongoConnected = false;
const memoryStore = {
  students: [...MASTER_STUDENTS],
  marks: []
};

// Subject Maximum Scaled Marks (Physics & Biology out of 50, other subjects out of 100)
function getMaxScaledForSubject(subject) {
  return (subject === 'Physics' || subject === 'Biology') ? 50 : 100;
}

// Calculate scaled marks (Physics & Biology to 50, other subjects to 100)
function calculateScaledMarks(rawMarks, maxMarks, subject) {
  const raw = Number(rawMarks);
  const max = Number(maxMarks);
  if (!max || max <= 0) return 0;
  const targetScale = getMaxScaledForSubject(subject);
  return Math.round(((raw / max) * targetScale) * 100) / 100;
}

// Seed initial sample test marks
function generateSampleMarks() {
  const sampleMarks = [];
  MASTER_STUDENTS.forEach((student, sIdx) => {
    SUBJECTS.forEach((subject, subIdx) => {
      const maxVariants = [20, 25, 50, 100];
      const maxMarks = maxVariants[(sIdx + subIdx) % maxVariants.length];
      
      let baseFactor = 0.65;
      if (student.group === 'Group-X') baseFactor = 0.82;
      else if (student.group === 'Group-Y') baseFactor = 0.74;
      else baseFactor = 0.62;

      const variation = (((sIdx * 7 + subIdx * 13) % 25) - 10) / 100;
      let ratio = Math.max(0.35, Math.min(0.98, baseFactor + variation));
      let rawMarks = Math.round(ratio * maxMarks);
      if (rawMarks > maxMarks) rawMarks = maxMarks;

      const scaledMarks = calculateScaledMarks(rawMarks, maxMarks, subject);

      sampleMarks.push({
        studentId: student.studentId,
        testName: 'Test-1',
        subject,
        maxMarks,
        rawMarks,
        scaledMarks,
        updatedAt: new Date()
      });
    });
  });
  return sampleMarks;
}

// Initialize and Seed Database
async function initializeData() {
  if (isMongoConnected) {
    try {
      const studentCount = await Student.countDocuments();
      if (studentCount < 69) {
        console.log(`[Database] Seeding 69 Master Students into MongoDB...`);
        await Student.deleteMany({});
        await Student.insertMany(MASTER_STUDENTS);
        console.log(`[Database] Successfully seeded 69 students into MongoDB.`);
      }
      const marksCount = await Mark.countDocuments({ testName: 'Test-1' });
      if (marksCount === 0) {
        console.log(`[Database] Seeding sample marks for Test-1...`);
        const sampleMarks = generateSampleMarks();
        await Mark.insertMany(sampleMarks);
        console.log(`[Database] Successfully seeded sample marks for Test-1.`);
      }
    } catch (err) {
      console.error(`[Database] Error during seeding:`, err.message);
    }
  } else {
    // Memory fallback initialized
    if (memoryStore.marks.length === 0) {
      memoryStore.marks = generateSampleMarks().map((m, idx) => ({ ...m, _id: `mem_mark_${idx + 1}` }));
      console.log(`[Memory Fallback] Seeded 69 students and ${memoryStore.marks.length} sample marks for Test-1.`);
    }
  }
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 4000
}).then(() => {
  isMongoConnected = true;
  console.log(`[MongoDB] Connected successfully to: ${MONGODB_URI}`);
  initializeData();
}).catch((err) => {
  isMongoConnected = false;
  console.warn(`\n===============================================================`);
  console.warn(`[MongoDB Warning] Could not connect to MongoDB at "${MONGODB_URI}".`);
  console.warn(`Reason: ${err.message}`);
  console.warn(`-> ACTIVATING IN-MEMORY FALLBACK STORE SO APP RUNS SEAMLESSLY.`);
  console.warn(`-> To connect to MongoDB Atlas or local MongoDB, set MONGODB_URI in .env`);
  console.warn(`===============================================================\n`);
  initializeData();
});

// ================= API ROUTES =================

// 1. Health & Connection Status
app.get('/api/status', async (req, res) => {
  try {
    let studentCount = 69;
    let marksCount = memoryStore.marks.length;

    if (isMongoConnected) {
      studentCount = await Student.countDocuments();
      marksCount = await Mark.countDocuments();
    }

    res.json({
      status: 'online',
      mongoConnected: isMongoConnected,
      mongoUri: MONGODB_URI,
      studentCount,
      marksCount,
      subjectsCount: SUBJECTS.length,
      testsCount: TESTS.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get All Subjects
app.get('/api/subjects', (req, res) => {
  res.json({ subjects: SUBJECTS, allowedMaxMarks: ALLOWED_MAX_MARKS });
});

// 3. Get Tests (Test-1 to Test-30)
app.get('/api/tests', (req, res) => {
  res.json({ tests: TESTS });
});

// 4. Get Students (69 Students) with filtering support
app.get('/api/students', async (req, res) => {
  try {
    const { group, search } = req.query;
    let list = [];

    if (isMongoConnected) {
      const query = {};
      if (group && group !== 'all') query.group = group;
      list = await Student.find(query).sort({ rollNumber: 1 });
    } else {
      list = [...memoryStore.students];
      if (group && group !== 'all') {
        list = list.filter(s => s.group === group);
      }
    }

    if (search) {
      const queryWords = search.toLowerCase().trim().split(/\s+/);
      list = list.filter(student => {
        const fullString = `${student.name} ${student.studentId} ${student.group} ${student.section} ${student.phoneNumber}`.toLowerCase();
        // Matches if all typed fragments match in any order
        return queryWords.every(word => fullString.includes(word));
      });
    }

    res.json({ students: list, count: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Submit or Update Student Mark (The 5 Fields Page)
// Fields: studentId, testName, subject, maxMarks (20, 25, 50, 100), rawMarks
app.post('/api/marks', async (req, res) => {
  try {
    const { studentId, testName, subject, maxMarks, rawMarks } = req.body || {};

    // Validation
    if (!studentId || !testName || !subject || maxMarks === undefined || rawMarks === undefined) {
      return res.status(400).json({ error: 'All 5 fields are required: studentId, testName, subject, maxMarks, rawMarks' });
    }

    if (!TESTS.includes(testName)) {
      return res.status(400).json({ error: `Invalid test name: ${testName}. Allowed: Test-1 to Test-30` });
    }

    if (!SUBJECTS.includes(subject)) {
      return res.status(400).json({ error: `Invalid subject: ${subject}. Allowed: ${SUBJECTS.join(', ')}` });
    }

    const numMax = Number(maxMarks);
    if (!ALLOWED_MAX_MARKS.includes(numMax)) {
      return res.status(400).json({ error: `Invalid max marks: ${maxMarks}. Allowed options: 20, 25, 50, 100` });
    }

    const numRaw = Number(rawMarks);
    if (isNaN(numRaw) || numRaw < 0) {
      return res.status(400).json({ error: 'Marks scored must be a non-negative number' });
    }

    if (numRaw > numMax) {
      return res.status(400).json({ error: `Marks scored (${numRaw}) cannot exceed maximum marks (${numMax})` });
    }

    // Verify student exists
    const student = MASTER_STUDENTS.find(s => s.studentId === studentId || s.name === studentId);
    if (!student) {
      return res.status(404).json({ error: `Student '${studentId}' not found in the 69 registered students.` });
    }

    // Scale to subject max (50 for Physics/Biology, 100 for others)
    const scaledMarks = calculateScaledMarks(numRaw, numMax, subject);

    let savedRecord;

    if (isMongoConnected) {
      savedRecord = await Mark.findOneAndUpdate(
        { studentId: student.studentId, testName, subject },
        {
          studentId: student.studentId,
          testName,
          subject,
          maxMarks: numMax,
          rawMarks: numRaw,
          scaledMarks,
          updatedAt: new Date()
        },
        { upsert: true, new: true, runValidators: true }
      );
    } else {
      // Memory Store logic
      const existingIdx = memoryStore.marks.findIndex(
        m => m.studentId === student.studentId && m.testName === testName && m.subject === subject
      );
      if (existingIdx >= 0) {
        memoryStore.marks[existingIdx] = {
          ...memoryStore.marks[existingIdx],
          maxMarks: numMax,
          rawMarks: numRaw,
          scaledMarks,
          updatedAt: new Date()
        };
        savedRecord = memoryStore.marks[existingIdx];
      } else {
        savedRecord = {
          _id: `mem_mark_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          studentId: student.studentId,
          testName,
          subject,
          maxMarks: numMax,
          rawMarks: numRaw,
          scaledMarks,
          updatedAt: new Date()
        };
        memoryStore.marks.push(savedRecord);
      }
    }

    res.status(200).json({
      success: true,
      message: `Marks recorded successfully for ${student.studentId} in ${subject} (${testName})`,
      record: savedRecord,
      studentDetails: student,
      scaledMarksNote: `${numRaw}/${numMax} calculated to ${scaledMarks}/${getMaxScaledForSubject(subject)}`
    });

  } catch (err) {
    console.error('Error saving marks:', err);
    res.status(500).json({ error: err.message });
  }
});

// 5.1 Batch Submit Student Marks (Save All Marks in Bulk)
app.post('/api/marks/batch', async (req, res) => {
  try {
    const { testName, subject, marks } = req.body || {};

    if (!testName || !subject || !Array.isArray(marks) || marks.length === 0) {
      return res.status(400).json({ error: 'testName, subject, and a non-empty marks array are required.' });
    }

    if (!TESTS.includes(testName)) {
      return res.status(400).json({ error: `Invalid test name: ${testName}. Allowed: Test-1 to Test-30` });
    }

    if (!SUBJECTS.includes(subject)) {
      return res.status(400).json({ error: `Invalid subject: ${subject}. Allowed: ${SUBJECTS.join(', ')}` });
    }

    const studentMap = new Map(MASTER_STUDENTS.map(s => [s.studentId, s]));
    const validRecords = [];

    for (const item of marks) {
      const { studentId, rawMarks, maxMarks } = item;
      const student = studentMap.get(studentId) || MASTER_STUDENTS.find(s => s.name === studentId);
      if (!student) continue;

      const numMax = Number(maxMarks);
      if (!ALLOWED_MAX_MARKS.includes(numMax)) continue;

      const numRaw = Number(rawMarks);
      if (isNaN(numRaw) || numRaw < 0 || numRaw > numMax) continue;

      const scaledMarks = calculateScaledMarks(numRaw, numMax, subject);

      validRecords.push({
        studentId: student.studentId,
        testName,
        subject,
        maxMarks: numMax,
        rawMarks: numRaw,
        scaledMarks,
        updatedAt: new Date()
      });
    }

    if (validRecords.length === 0) {
      return res.status(400).json({ error: 'No valid mark records found in batch payload.' });
    }

    if (isMongoConnected) {
      const bulkOps = validRecords.map(rec => ({
        updateOne: {
          filter: { studentId: rec.studentId, testName: rec.testName, subject: rec.subject },
          update: { $set: rec },
          upsert: true
        }
      }));
      await Mark.bulkWrite(bulkOps);
    } else {
      validRecords.forEach(rec => {
        const existingIdx = memoryStore.marks.findIndex(
          m => m.studentId === rec.studentId && m.testName === rec.testName && m.subject === rec.subject
        );
        if (existingIdx >= 0) {
          memoryStore.marks[existingIdx] = {
            ...memoryStore.marks[existingIdx],
            ...rec
          };
        } else {
          memoryStore.marks.push({
            _id: `mem_mark_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            ...rec
          });
        }
      });
    }

    res.json({
      success: true,
      savedCount: validRecords.length,
      message: `Successfully saved ${validRecords.length} marks for ${subject} in ${testName}.`
    });

  } catch (err) {
    console.error('Error in batch save marks:', err);
    res.status(500).json({ error: err.message });
  }
});

// 6. Get Marks List (Filter by Test, Student, and Subject)
app.get('/api/marks', async (req, res) => {
  try {
    const { testName, studentId, subject } = req.query;
    let marksList = [];

    if (isMongoConnected) {
      const query = {};
      if (testName) query.testName = testName;
      if (studentId) query.studentId = studentId;
      if (subject) query.subject = subject;
      marksList = await Mark.find(query).sort({ updatedAt: -1 });
    } else {
      marksList = [...memoryStore.marks];
      if (testName) marksList = marksList.filter(m => m.testName === testName);
      if (studentId) marksList = marksList.filter(m => m.studentId === studentId);
      if (subject) marksList = marksList.filter(m => m.subject === subject);
    }

    // Attach student metadata (name, group, section, phone)
    const studentMap = new Map(MASTER_STUDENTS.map(s => [s.studentId, s]));
    const enriched = marksList.map(m => {
      const markObj = m.toObject ? m.toObject() : { ...m };
      const stu = studentMap.get(markObj.studentId) || {};
      return {
        ...markObj,
        studentName: stu.name || markObj.studentId,
        group: stu.group || 'N/A',
        section: stu.section || 'N/A',
        phoneNumber: stu.phoneNumber || 'N/A'
      };
    });

    res.json({ marks: enriched, count: enriched.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Update a particular mark entry (Edit Marks)
app.put('/api/marks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rawMarks, maxMarks } = req.body || {};

    const numRaw = Number(rawMarks);
    if (isNaN(numRaw) || numRaw < 0) {
      return res.status(400).json({ error: 'Valid scored marks required' });
    }

    let existingMark;
    if (isMongoConnected) {
      existingMark = await Mark.findById(id);
    } else {
      existingMark = memoryStore.marks.find(m => String(m._id) === String(id));
    }

    if (!existingMark) {
      return res.status(404).json({ error: 'Mark record not found' });
    }

    const effectiveMax = maxMarks !== undefined ? Number(maxMarks) : existingMark.maxMarks;
    if (!ALLOWED_MAX_MARKS.includes(effectiveMax)) {
      return res.status(400).json({ error: `Allowed max marks are: 20, 25, 50, 100` });
    }

    if (numRaw > effectiveMax) {
      return res.status(400).json({ error: `Marks scored (${numRaw}) cannot exceed maximum marks (${effectiveMax})` });
    }

    const scaledMarks = calculateScaledMarks(numRaw, effectiveMax, existingMark.subject);

    let updated;
    if (isMongoConnected) {
      existingMark.rawMarks = numRaw;
      existingMark.maxMarks = effectiveMax;
      existingMark.scaledMarks = scaledMarks;
      existingMark.updatedAt = new Date();
      updated = await existingMark.save();
    } else {
      existingMark.rawMarks = numRaw;
      existingMark.maxMarks = effectiveMax;
      existingMark.scaledMarks = scaledMarks;
      existingMark.updatedAt = new Date();
      updated = existingMark;
    }

    res.json({
      success: true,
      message: 'Mark updated successfully',
      record: updated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Delete a particular mark entry (Delete Marks)
app.delete('/api/marks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const deleted = await Mark.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Mark record not found' });
      }
    } else {
      const idx = memoryStore.marks.findIndex(m => String(m._id) === String(id));
      if (idx === -1) {
        return res.status(404).json({ error: 'Mark record not found' });
      }
      memoryStore.marks.splice(idx, 1);
    }

    res.json({ success: true, message: 'Mark record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Rankings API for the 4 display ways:
// Way 1: Group-X based on rank + excel
// Way 2: Group-Y based on rank + excel
// Way 3: Group-Z based on rank + excel
// Way 4: All students (Group-X, Y, Z) based on rank + excel
app.get('/api/rankings', async (req, res) => {
  try {
    const testName = req.query.testName || 'Test-1';
    const groupFilter = req.query.group || 'all'; // 'all', 'Group-X', 'Group-Y', 'Group-Z'

    // Filter target students
    let targetStudents = MASTER_STUDENTS;
    if (groupFilter !== 'all') {
      targetStudents = MASTER_STUDENTS.filter(s => s.group === groupFilter);
    }

    // Get marks for this test
    let marksForTest = [];
    if (isMongoConnected) {
      marksForTest = await Mark.find({ testName });
    } else {
      marksForTest = memoryStore.marks.filter(m => m.testName === testName);
    }

    // Build map: studentId -> { subject -> scaledMarks, rawMarks, maxMarks }
    const marksByStudent = new Map();
    marksForTest.forEach(m => {
      const markObj = m.toObject ? m.toObject() : m;
      if (!marksByStudent.has(markObj.studentId)) {
        marksByStudent.set(markObj.studentId, {});
      }

      // Ensure Physics & Biology are scaled out of 50, others out of 100
      const targetScale = getMaxScaledForSubject(markObj.subject);
      let effectiveScaled = markObj.scaledMarks;
      if (markObj.rawMarks !== undefined && markObj.maxMarks) {
        effectiveScaled = Math.round(((markObj.rawMarks / markObj.maxMarks) * targetScale) * 100) / 100;
      } else if (targetScale === 50 && effectiveScaled > 50) {
        effectiveScaled = Math.round((effectiveScaled / 2) * 100) / 100;
      }

      marksByStudent.get(markObj.studentId)[markObj.subject] = {
        _id: markObj._id,
        rawMarks: markObj.rawMarks,
        maxMarks: markObj.maxMarks,
        scaledMarks: effectiveScaled
      };
    });

    // Compile student score cards
    const results = targetStudents.map(student => {
      const studentMarks = marksByStudent.get(student.studentId) || {};
      const subjectScores = {};
      let totalScaledMarks = 0;
      let subjectsCount = 0;

      SUBJECTS.forEach(sub => {
        if (studentMarks[sub] !== undefined) {
          const scaled = studentMarks[sub].scaledMarks;
          subjectScores[sub] = {
            markId: studentMarks[sub]._id,
            scaledMarks: scaled,
            rawMarks: studentMarks[sub].rawMarks,
            maxMarks: studentMarks[sub].maxMarks,
            hasScore: true
          };
          totalScaledMarks += scaled;
          subjectsCount += 1;
        } else {
          subjectScores[sub] = {
            markId: null,
            scaledMarks: 0,
            rawMarks: 0,
            maxMarks: null,
            hasScore: false
          };
        }
      });

      // Total subjects is 7, maximum total marks is 600 (Physics & Biology are 50M each)
      const totalMarks = Math.round(totalScaledMarks * 100) / 100;
      const percentage = Math.round((totalMarks / 600) * 100 * 10) / 10;

      return {
        studentId: student.studentId,
        name: student.name,
        group: student.group,
        section: student.section,
        phoneNumber: student.phoneNumber,
        rollNumber: student.rollNumber,
        subjectScores,
        subjectsCount,
        totalMarks,
        percentage
      };
    });

    // Sort based on totalMarks descending (Highest marks first)
    results.sort((a, b) => b.totalMarks - a.totalMarks || a.studentId.localeCompare(b.studentId));

    // Assign ranks (Rank 1 for top mark, handle ties)
    let currentRank = 1;
    for (let i = 0; i < results.length; i++) {
      if (i > 0 && results[i].totalMarks === results[i - 1].totalMarks) {
        results[i].rank = results[i - 1].rank;
      } else {
        results[i].rank = currentRank;
      }
      currentRank++;
    }

    // Compute groupRank within each group
    const groups = ['Group-X', 'Group-Y', 'Group-Z'];
    groups.forEach(grp => {
      const groupStudents = results.filter(r => r.group === grp);
      let gRank = 1;
      for (let i = 0; i < groupStudents.length; i++) {
        if (i > 0 && groupStudents[i].totalMarks === groupStudents[i - 1].totalMarks) {
          groupStudents[i].groupRank = groupStudents[i - 1].groupRank;
        } else {
          groupStudents[i].groupRank = gRank;
        }
        gRank++;
      }
    });

    res.json({
      testName,
      group: groupFilter,
      totalStudentsInView: results.length,
      rankings: results
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Student Parent View / Comprehensive Academic Report Card API
// Shows all tests subject-wise marks, total marks, percentage, overall rank, and group rank
app.get('/api/students/:studentId/report', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = MASTER_STUDENTS.find(
      s => s.studentId === studentId || s.name.toLowerCase() === studentId.toLowerCase()
    );

    if (!student) {
      return res.status(404).json({ error: `Student '${studentId}' not found in registered students.` });
    }

    // Fetch all marks from database or memory store
    let allMarks = [];
    if (isMongoConnected) {
      allMarks = await Mark.find({});
    } else {
      allMarks = memoryStore.marks;
    }

    // Group marks by testName -> Map(studentId -> { subjects: {}, totalScaled: 0, count: 0 })
    const testStudentMarks = new Map();
    allMarks.forEach(m => {
      const markObj = m.toObject ? m.toObject() : m;
      if (!testStudentMarks.has(markObj.testName)) {
        testStudentMarks.set(markObj.testName, new Map());
      }
      const sMap = testStudentMarks.get(markObj.testName);
      if (!sMap.has(markObj.studentId)) {
        sMap.set(markObj.studentId, {
          studentId: markObj.studentId,
          subjects: {},
          totalScaled: 0,
          subjectsCount: 0
        });
      }
      const entry = sMap.get(markObj.studentId);
      // Ensure Physics & Biology are scaled out of 50, others out of 100
      const targetScale = getMaxScaledForSubject(markObj.subject);
      let effectiveScaled = markObj.scaledMarks;
      if (markObj.rawMarks !== undefined && markObj.maxMarks) {
        effectiveScaled = Math.round(((markObj.rawMarks / markObj.maxMarks) * targetScale) * 100) / 100;
      } else if (targetScale === 50 && effectiveScaled > 50) {
        effectiveScaled = Math.round((effectiveScaled / 2) * 100) / 100;
      }

      entry.subjects[markObj.subject] = {
        rawMarks: markObj.rawMarks,
        maxMarks: markObj.maxMarks,
        scaledMarks: effectiveScaled
      };
      entry.totalScaled += effectiveScaled;
      entry.subjectsCount += 1;
    });

    const studentMap = new Map(MASTER_STUDENTS.map(s => [s.studentId, s]));

    const testReports = [];
    let totalTestsAttempted = 0;
    let sumPercentages = 0;
    let bestTest = null;
    let maxTestPercentage = -1;
    const subjectTotals = {};
    const subjectCounts = {};
    SUBJECTS.forEach(sub => {
      subjectTotals[sub] = 0;
      subjectCounts[sub] = 0;
    });

    TESTS.forEach(testName => {
      const sMap = testStudentMarks.get(testName);
      const studentRecord = sMap ? sMap.get(student.studentId) : null;
      const hasData = Boolean(studentRecord && studentRecord.subjectsCount > 0);

      const subjectScores = {};
      let totalMarks = 0;
      let percentage = 0;
      let overallRank = null;
      let groupRank = null;
      let totalStudentsInTest = 0;
      let totalInGroupInTest = 0;

      if (hasData) {
        totalTestsAttempted++;
        SUBJECTS.forEach(sub => {
          if (studentRecord.subjects[sub]) {
            const sc = studentRecord.subjects[sub];
            subjectScores[sub] = {
              rawMarks: sc.rawMarks,
              maxMarks: sc.maxMarks,
              scaledMarks: sc.scaledMarks,
              hasScore: true
            };
            totalMarks += sc.scaledMarks;
            subjectTotals[sub] += sc.scaledMarks;
            subjectCounts[sub] += 1;
          } else {
            subjectScores[sub] = {
              rawMarks: 0,
              maxMarks: null,
              scaledMarks: 0,
              hasScore: false
            };
          }
        });

        totalMarks = Math.round(totalMarks * 100) / 100;
        percentage = Math.round((totalMarks / 600) * 100 * 10) / 10;
        sumPercentages += percentage;

        if (percentage > maxTestPercentage) {
          maxTestPercentage = percentage;
          bestTest = testName;
        }

        // Calculate Overall Rank and Group Rank for this test
        const testParticipants = [];
        sMap.forEach((entry, sId) => {
          const sObj = studentMap.get(sId);
          if (sObj) {
            testParticipants.push({
              studentId: sId,
              group: sObj.group,
              totalScaled: Math.round(entry.totalScaled * 100) / 100
            });
          }
        });

        // Sort overall participants
        testParticipants.sort((a, b) => b.totalScaled - a.totalScaled || a.studentId.localeCompare(b.studentId));
        totalStudentsInTest = testParticipants.length;

        // Assign overall ranks
        let currOverallRank = 1;
        for (let i = 0; i < testParticipants.length; i++) {
          if (i > 0 && testParticipants[i].totalScaled === testParticipants[i - 1].totalScaled) {
            testParticipants[i].overallRank = testParticipants[i - 1].overallRank;
          } else {
            testParticipants[i].overallRank = currOverallRank;
          }
          currOverallRank++;
        }

        // Group-wise rank
        const groupParticipants = testParticipants.filter(p => p.group === student.group);
        totalInGroupInTest = groupParticipants.length;
        let currGroupRank = 1;
        for (let i = 0; i < groupParticipants.length; i++) {
          if (i > 0 && groupParticipants[i].totalScaled === groupParticipants[i - 1].totalScaled) {
            groupParticipants[i].groupRank = groupParticipants[i - 1].groupRank;
          } else {
            groupParticipants[i].groupRank = currGroupRank;
          }
          currGroupRank++;
        }

        const meOverall = testParticipants.find(p => p.studentId === student.studentId);
        const meGroup = groupParticipants.find(p => p.studentId === student.studentId);
        if (meOverall) overallRank = meOverall.overallRank;
        if (meGroup) groupRank = meGroup.groupRank;
      } else {
        SUBJECTS.forEach(sub => {
          subjectScores[sub] = {
            rawMarks: 0,
            maxMarks: null,
            scaledMarks: 0,
            hasScore: false
          };
        });
      }

      let grade = '—';
      if (hasData) {
        if (percentage >= 90) grade = 'A+ (Outstanding)';
        else if (percentage >= 75) grade = 'A (Distinction)';
        else if (percentage >= 60) grade = 'B (First Class)';
        else if (percentage >= 50) grade = 'C (Second Class)';
        else grade = 'D (Needs Improvement)';
      }

      testReports.push({
        testName,
        hasData,
        subjectScores,
        totalMarks,
        percentage,
        overallRank,
        totalStudentsInTest,
        groupRank,
        totalInGroupInTest,
        grade
      });
    });

    // Compute subject averages across conducted tests
    const subjectAverages = {};
    let highestSubAvg = -1;
    let lowestSubAvg = 999;
    let bestSubject = '—';
    let weakestSubject = '—';

    SUBJECTS.forEach(sub => {
      const count = subjectCounts[sub];
      const avg = count > 0 ? Math.round((subjectTotals[sub] / count) * 10) / 10 : 0;
      subjectAverages[sub] = avg;

      if (count > 0) {
        const targetMax = getMaxScaledForSubject(sub);
        const normalizedPct = (avg / targetMax) * 100;
        if (normalizedPct > highestSubAvg) {
          highestSubAvg = normalizedPct;
          bestSubject = `${sub} (${avg}/${targetMax})`;
        }
        if (normalizedPct < lowestSubAvg) {
          lowestSubAvg = normalizedPct;
          weakestSubject = `${sub} (${avg}/${targetMax})`;
        }
      }
    });

    const cumulativeAvg = totalTestsAttempted > 0 ? Math.round((sumPercentages / totalTestsAttempted) * 10) / 10 : 0;

    res.json({
      student,
      summary: {
        testsAttempted: totalTestsAttempted,
        totalTests: TESTS.length,
        cumulativeAverage: cumulativeAvg,
        bestTest: bestTest || 'N/A',
        bestSubject: bestSubject !== '—' ? `${bestSubject} (${highestSubAvg}%)` : 'N/A',
        weakestSubject: weakestSubject !== '—' && weakestSubject !== bestSubject ? `${weakestSubject} (${lowestSubAvg}%)` : 'N/A'
      },
      subjectAverages,
      testReports
    });
  } catch (err) {
    console.error('Error generating parent report:', err);
    res.status(500).json({ error: err.message });
  }
});

// 10. Seed/Reset marks for a test
app.post('/api/seed-test', async (req, res) => {
  try {
    const { testName } = req.body || {};
    const targetTest = testName || 'Test-1';

    const sampleMarks = [];
    MASTER_STUDENTS.forEach((student, sIdx) => {
      SUBJECTS.forEach((subject, subIdx) => {
        const maxVariants = [20, 25, 50, 100];
        const maxMarks = maxVariants[(sIdx + subIdx) % maxVariants.length];

        let baseFactor = 0.65;
        if (student.group === 'Group-X') baseFactor = 0.82;
        else if (student.group === 'Group-Y') baseFactor = 0.74;
        else baseFactor = 0.62;

        const variation = (((sIdx * 7 + subIdx * 11) % 25) - 10) / 100;
        let ratio = Math.max(0.35, Math.min(0.98, baseFactor + variation));
        let rawMarks = Math.round(ratio * maxMarks);
        if (rawMarks > maxMarks) rawMarks = maxMarks;

        const scaledMarks = calculateScaledMarks(rawMarks, maxMarks, subject);

        sampleMarks.push({
          studentId: student.studentId,
          testName: targetTest,
          subject,
          maxMarks,
          rawMarks,
          scaledMarks,
          updatedAt: new Date()
        });
      });
    });

    if (isMongoConnected) {
      await Mark.deleteMany({ testName: targetTest });
      await Mark.insertMany(sampleMarks);
    } else {
      memoryStore.marks = memoryStore.marks.filter(m => m.testName !== targetTest);
      memoryStore.marks.push(...sampleMarks.map((m, i) => ({ ...m, _id: `mem_${targetTest}_${i}` })));
    }

    res.json({
      success: true,
      message: `Successfully populated sample marks for ${targetTest} (${sampleMarks.length} records).`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;
