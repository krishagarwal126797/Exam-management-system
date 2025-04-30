import express from 'express';
import Teacher from '../models/Teacher.js';
import bcrypt from 'bcryptjs';
import Exam from '../models/Exams.js';
import Student from '../models/studentModel.js';
import Result from '../models/result.js';
import User from '../models/User.js';
const router = express.Router();

// Render Pages
router.get("/", (req, res) => res.render('Login', { title: 'Login Page' }));
router.get("/Register", (req, res) => res.render('Register', { title: 'Register Page' }));
router.get("/Dashboard", (req, res) => res.render('Dashboard', { title: 'Dashboard Page' }));
router.get("/Menu", (req, res) => res.render('Menu', { title: 'Menu Page' }));

//router.get("/Managestudents", (req, res) => res.render('ManageStudents', { title: 'Managestudents Page' }));
router.get("/Manageresults", (req, res) => res.render('Manageresults', { title: 'Manageresults Page' }));
router.get("/UserManagement", (req, res) => res.render('Usermanagement', { title: 'Usermanagement Page' }));
router.get("/Settings", (req, res) => res.render('Settings', { title: 'Settings Page' }));

// Handle Registration Form POST
router.post("/Register", async (req, res) => {
  const { username, password, email, Facuilty } = req.body;

  try {
    const existingUser = await Teacher.findOne({ email });
    if (existingUser) {
      return res.render('Register', { title: 'Register Page', error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new Teacher({
      username,
      password: hashedPassword,
      email,
      faculty: Facuilty
    });

    await newTeacher.save();
    res.redirect('/Menu'); // Or wherever you want to redirect after registration
  } catch (err) {
    console.error(err);
    res.render('Register', { title: 'Register Page', error: 'Registration failed' });
  }
});
// Handle Login Form POST
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ username });

    if (!teacher) {
      return res.render('Login', { title: 'Login Page', error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res.render('Login', { title: 'Login Page', error: 'Invalid username or password' });
    }

    // Save user in session
    req.session.teacher = {
      id: teacher._id,
      username: teacher.username
    };

    res.redirect("/Menu");
  } catch (err) {
    console.error(err);
    res.render('Login', { title: 'Login Page', error: 'Login failed' });
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect("/");
  });
});
router.get('/Manageexams', async (req, res) => {
  try {
    const exams = await Exam.find(); // Fetch the exams from the database
    if (!exams || exams.length === 0) {
      return res.render('Manageexams', { title: 'Exams List', error: 'No exams found' });
    }
    res.render('Manageexams', { title: 'Exams List', exams }); // Pass exams data to the view
  } catch (err) {
    console.error('Error fetching exams:', err);
    res.render('Manageexams', { title: 'Exams List', error: 'Failed to fetch exams' });
  }
});


// Route to render the add exam form
router.get('/exams/add', (req, res) => {
  res.render('addExam', { title: 'Add Exam' });
});

// Route to handle add exam form submission
router.post('/exams/add', async (req, res) => {
  const { examId, title, subject, classLevel, date, startTime, endTime, totalMarks, passingMarks, location, invigilator, status } = req.body;

  try {
    const newExam = new Exam({
      examId,
      title,
      subject,
      classLevel,
      date,
      startTime,
      endTime,
      totalMarks,
      passingMarks,
      location,
      invigilator,
      status,
      createdAt: new Date(), // Set createdAt timestamp
      updatedAt: new Date(), // Set updatedAt timestamp
    });

    await newExam.save();

    res.status(200).json({ message: 'Exam added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add exam' });
  }
});

// Route to render the update exam form
router.get('/exams/update/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findById(id);

    if (!exam) {
      return res.render('exams', { title: 'Exams List', error: 'Exam not found' });
    }

    res.render('updateExam', { title: 'Update Exam', exam });
  } catch (err) {
    console.error(err);
    res.render('exams', { title: 'Exams List', error: 'Failed to fetch exam details' });
  }
});

// Route to handle update exam form submission
router.post('/exams/update/:id', async (req, res) => {
  const { id } = req.params;
  const { examId, title, subject, classLevel, date, startTime, endTime, totalMarks, passingMarks, location, invigilator, status } = req.body;

  try {
    const updatedExam = await Exam.findByIdAndUpdate(id, {
      examId,
      title,
      subject,
      classLevel,
      date,
      startTime,
      endTime,
      totalMarks,
      passingMarks,
      location,
      invigilator,
      status,
      updatedAt: new Date(),
    }, { new: true });

    if (!updatedExam) {
      return res.render('exams', { title: 'Exams List', error: 'Failed to update exam' });
    }

    res.redirect('/exams');
  } catch (err) {
    console.error(err);
    res.render('updateExam', { title: 'Update Exam', error: 'Update failed' });
  }
});

// Route to handle deleting an exam
router.get('/exams/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExam = await Exam.findByIdAndDelete(id);

    if (!deletedExam) {
      return res.render('exams', { title: 'Exams List', error: 'Failed to delete exam' });
    }

    res.redirect('/exams');
  } catch (err) {
    console.error(err);
    res.render('exams', { title: 'Exams List', error: 'Delete failed' });
  }
});





// GET all students
router.get('/Managestudents', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

// POST add student
router.post('/Managestudents', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add student' });
  }
});

// PUT update student
router.put('/Managestudents/:id', async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update student' });
  }
});

// DELETE student
router.delete('/Managestudents/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student' });
  }
});




// Get all results
router.get('/Manageresults', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});

// Add a result
router.post('/Manageresults', async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add result' });
  }
});

// Update a result
router.put('/Manageresults/:id', async (req, res) => {
  try {
    const updated = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update result' });
  }
});

// Delete a result
router.delete('/Manageresults/:id', async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ message: 'Result deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete result' });
  }
});



router.post('/Settings', async (req, res) => {
  try {
    const newSettings = new Settings(req.body);
    await newSettings.save();
    res.status(201).json(newSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get settings (retrieve the current settings)
router.get('/Settings', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update existing settings
router.put('/Settings:id', async (req, res) => {
  try {
    const updatedSettings = await Settings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSettings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete settings
router.delete('/Settings:id', async (req, res) => {
  try {
    const deletedSettings = await Settings.findByIdAndDelete(req.params.id);
    if (!deletedSettings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.status(200).json({ message: 'Settings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





// CREATE
router.post('/UserManagement/add', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.json({ success: true, user: saved });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// READ
router.get('/UserManagement/all', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE
router.put('/users/update/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, user: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE
router.delete('/UserManagement/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});




export default router;
