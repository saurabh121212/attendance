const express = require('express');

const morgan = require('morgan');
const cors = require('cors');

// endware
const {handleResponse} = require("./endwares/response");

// path identifiers
global.__models = __dirname + "/models/init-models.js";
global.__helpers = __dirname + "/helpers";
global.__middlewares = __dirname + "/middlewares";


// routers
const userRouter = require("./modules/user/router");
const leaveTypeRouter = require("./modules/leavetype/router");
const attendanceRouter = require("./modules/attendance/router");
const holidaysRouter = require("./modules/holidays/router");
const leaveRouter = require("./modules/leave/router");
const odRouter = require("./modules/od/router");
const adminRouter = require("./modules/admin/router");


const app = express();
app.enable('trust proxy');

//Development logging
if (process.env.NODE_ENV === 'DEVELOPMENT') {
	console.log('Logging enabled');
  app.use(morgan('dev'));
}

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// handle cors [default allow from all domain to all endpoints with all methods]
app.use((req, res, next) => {
	console.log("query:", req.query);
  console.log("body:", req.body);
	next();
},
cors()
);


// handle root route
app.get('/', (req, res) => {
    res.status(200).json({
      version: 1.0,
      msg: "Attendance Management System API built on NodeJs"
    })
  })
  

app.use("/api/user", userRouter);
app.use("/api/leavetype", leaveTypeRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/holidays", holidaysRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/od", odRouter);
app.use("/api/admin", adminRouter);


app.use(handleResponse);
module.exports = app;
