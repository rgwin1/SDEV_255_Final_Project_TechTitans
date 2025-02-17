const express = require('express')
const router = express.Router();

//create mainpage route here
router.get('/courses', (req, res) => {
    res.send('This is the courses page');

});

router.get('/addcourse', (req, res) => {
    res.send('This is the add a course page');
})

router.get('/viewcourse', (req, res) => {
    res.send('This is the view a course page');
});

router.get('/editcourse', (req, res) => {
    res.send('This is the edit a course page');
});

router.get('/teacherpage', (req, res) => {
    res.send('This is the teacher page');
});

router.get('/studentpage', (req, res) => {
    res.send('This is the student page');
})

router.get('/*', (req, res) => {
    res.send('404: Page not found');
})
module.exports = router;