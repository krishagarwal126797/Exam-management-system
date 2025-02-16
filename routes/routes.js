import express from 'express';
const router = express.Router();
router.get("/", async (req, res) => {
 
   
    res.render('Login', { title: 'Login Page' });

  
});
export default router;