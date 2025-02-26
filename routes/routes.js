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
export default router;