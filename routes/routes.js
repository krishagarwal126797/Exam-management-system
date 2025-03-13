import express from 'express';
const router = express.Router();
router.get("/", async (req, res) => {
 
   
    res.render('Login', { title: 'Login Page' });

  
}


);
router.get("/Register", async (req, res) => {
 
   
    res.render('Register', { title: 'Register Page' });

  
});
router.get("/Dashboard", async (req, res) => {
 
   
    res.render('Dashboard', { title: 'Dashboard Page' });

  
});
router.get("/Menu", async (req, res) => {
 
   
    res.render('Menu', { title: 'Menu Page' });

  
});
router.get("/Manageexams", async (req, res) => {
 
   
    res.render('Manageexams', { title: 'Manageexams Page' });

  
});
router.get("/Managestudents", async (req, res) => {
 
   
    res.render('ManageStudents', { title: 'Managestudents Page' });

  
});
router.get("/Manageresults", async (req, res) => {
 
   
    res.render('Manageresults', { title: 'Manageresults Page' });

  
});

router.get("/UserManagement", async (req, res) => {
 
   
    res.render('Usermanagement', { title: 'Usermanagement Page' });

  
});

router.get("/Settings", async (req, res) => {
 
   
    res.render('Settings', { title: 'Settings Page' });

  
});

export default router;