const jwt = require('jsonwebtoken');


module.exports = {
	generateJWT,
	checkMissingFields,
	removeFalseFields,
	camelToSnakeCase,
	checkAllowedFields,
	getSequelizeConnection,
  generateRandomPoints,
  calculateDistance,
  getDateTime
};


function generateJWT(payload, secretKey) {
	return jwt.sign(payload, secretKey, {
		expiresIn: "2 days",
	});

}

function checkMissingFields(obj, fieldsList) {

	let missingFields = [];

	fieldsList.forEach(el => {
		if(!Object.keys(obj).includes(el)) missingFields.push(el);
	});

	return missingFields;

}

function removeFalseFields(obj, ...exceptions) {

	for(let key in obj) {
    if(exceptions.includes(key)) {
      obj[key] = Boolean(obj[key])
    } else if(!obj[key] || obj[key]=="[]") {
        delete obj[key]
    }
  }

	return obj;

}

function camelToSnakeCase(obj) {

	function toSnakeCase(str) {

		let newStr = "";
		for(let char of str) {
			if(char.match(/[A-Z]/) != null)
				newStr += "_";
			newStr += char.toLowerCase();
		}

		return newStr;

	}

	let newObj = {};
	for(let key in obj)
		newObj[toSnakeCase(key)] = obj[key];

	return newObj;

}

function checkAllowedFields(obj, fieldsAllowed=[]) {

	let extraFields = [];

	Object.keys(obj).forEach(key => {
		if(!fieldsAllowed.includes(key)) extraFields.push(key);
	})

	return extraFields;

}

function getSequelizeConnection() {

  require('dotenv').config({path: __dirname + "/../config.env"})
  
	return new (require('sequelize').Sequelize)(process.env.PSQL_DATABASE, process.env.PSQL_USER, process.env.PSQL_PASSWORD, {
		host: process.env.PSQL_HOST,
		dialect: 'postgres',
		logging: process.env.NODE_ENV.toLowerCase()!="production" ? console.log : false,
		// logging: false
	});

}

function generateRandomPoints(center, radius, count) {
  var points = [];
  for (var i=0; i<count; i++) {
    let point = generateRandomPoint(center, radius)
    point.distanceInKms = calculateDistance(center.lat, center.lng, point.lat, point.lng).toFixed(2)
    points.push(point);
  }
  return points;
}

function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius/111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x/Math.cos(y0);

  // Resulting point.
  return {'lat': y+y0, 'lng': xp+x0};
}

function calculateDistance(lat1, lon1, lat2, lon2, unit="K") {
  if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}


function getDateTime() {

	let date_ob = new Date();

	// current date
	// adjust 0 before single digit date
	let date = ("0" + date_ob.getDate()).slice(-2);

	// current month
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

	// current year
	let year = date_ob.getFullYear();

	// current hours
	let hours = date_ob.getHours();

	// current minutes
	let minutes = date_ob.getMinutes();

	// current seconds
	let seconds = date_ob.getSeconds();

	// // prints date in YYYY-MM-DD format
	// console.log(year + "-" + month + "-" + date);

	// // prints date & time in YYYY-MM-DD HH:MM:SS format
	// console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

	// // prints time in HH:MM format
	// console.log(hours + ":" + minutes);

	return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds).trim();

}