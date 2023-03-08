const express = require('express');
const router = express.Router()
const getaAdminId = require('../controller/adminController.js');
const getUsers = require('../controller/user_controller.js').getUsers;
const getUserId = require('../controller/user_controller.js').getUserId;
const gettools = require('../controller/toolsController.js').gettools;

// a variable to save a session
var session;

/**step 1 */

//หน้าที่ check ว่า ต้อง มีการ auth ป่าว หรือว่าไม่ต้อง auth ละ
router.get('/', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.redirect('/dashboard');
    } else {
        res.render('login.ejs'); // the most beutiful login ever (may be)
    }
});

/**step 2 */
//login api ไม่สามารถ get ปกติได้
router.post('/login', async (req, res) => {
    //console.log("in the session :",req.session);
    //if (req.body.username == myusername && req.body.password == mypassword) { // ไว้เเเบบ ไม่มี database
    let id = await getUserId(req.body.username, req.body.password)
    //console.log(id);
    if (id) {
        session = req.session;
        session.userid = id;
        console.log(session.userid, "has loged in\n");
        res.redirect('/dashboard');
    }
    else {
        res.render('login.ejs');
    }
})

router.get('/dashboard',
    (req, res, next) => { //after dashboard
        session = req.session;
        if (session.userid) {
            //res.send('now loading dashboard . . .');
            next();//เข้าสู่ dashboard จริงๆ
        } else {
            //res.send('U must login before use dashboard<br> <a href="/">login</a>'); // ปัญญาออ่นไป
            res.redirect('/');
        }
    },
    async (req, res) => {/**if has log in yet */
        session = req.session;
        const user = (await getUsers({ _id: session.userid }))[0];
        const tools = await gettools({});
        const borrowed = user.borrowed;
        console.log(borrowed);
        res.render("dashboard.ejs", {
            data: {
                user: user,
                tools: tools,
                borrowed:borrowed
            }
        })
    });

router.get('/admin', async (req, res) => { /**for render login page */

    res.render('adminLogin.ejs');
});

router.post('/login/admin',  /**for recive data from login form */
    async (req, res) => {
        let id = await getaAdminId(req.body.username, req.body.password);
        if (id === "") {
            /** log in fail */
            res.redirect('/admin');
        } else {
            /**login passed */
            session = req.session;
            session.adminid = id;
            console.log('admin', session.adminid, 'loged in');
            res.redirect('/adminboard');
        }
    });

router.get('/adminboard', (req, res, next) => {
    session = req.session
    if (session.adminid) {
        /**has loged in yet */
        next()
    } else {
        /**not has login before */
        res.redirect('/admin');
    }
}, async (req, res) => {
    res.render('adminboard.ejs');
});

router.get('/user/borrow', (req, res, next) => {
    session = req.session;
    if (session.userid) {
        next();
    }
    else {
        res.redirect('/');
    }
},
async (req, res) => {
    const tools = await gettools({});
    res.render('borrow.ejs', {
        data: {
            tools: tools
        }
    });
});

router.post('/user/borrow', (req, res, next) => {
    session = req.session;
    if (session.userid) {
        next();
    }
    else {
        res.redirect('/');
    }
},
    async (req, res) => {
        const id = req.session.userid;
        let borrow_data = req.body;
        for (const [key, value] of Object.entries(borrow_data)) {
            console.log(`${key}: ${value}`);
            /**function ยืมของต้องมาทำต่อ */
        }
        console.log([id, items, amounts], "has borrowed item");
    });


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;