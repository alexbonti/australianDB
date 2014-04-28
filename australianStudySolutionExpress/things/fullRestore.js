//
// mongo_db_setup.js
//
// The script for creating the database and the collections that
// will contain the data of the application.
//




// this command creates a new mongoDB database
// named admp_eva_ui.
use australiaStudySolutionsDB;

// this command creates a user with read-write permissions
// to the database we just created.


// this command creates a users collection that contains the profile of each user
db.dropDatabase();
use australiaStudySolutionsDB;
db.createCollection("students");

db.students.insert({ "id" :0, "name" : "alessio","lastName" : "bonti","dob":"1983-05-01", "email" : "alexbonti83@hotmail.com","address" : "302/380 little lonsdale street","mobile":0414277649,"note":"chiama se hai problemi","reminder":"2015-05-01","referralType":"somereferral","referralName":"someone","currentVisa":"Student","visaExpiry":"2015-05-01","interested":"somebullshit"});
db.students.insert({ "id" :1, "name" : "sergio","lastName" : "fucile","dob":"1980-05-01", "email" : "alexbonti83@hotmail.com","address" : "302/380 little lonsdale street","mobile":0414277649,"note":"chiama se hai problemi","reminder":"2015-05-01","referralType":"somereferral","referralName":"someone","currentVisa":"Tourist","visaExpiry":"2015-05-01","interested":"somebullshit"});
db.students.insert({ "id" :0, "name" : "alessandro","lastName" : "bonti","dob":"1975-05-01", "email" : "alexbonti83@hotmail.com","address" : "302/380 little lonsdale street","mobile":0414277649,"note":"chiama se hai problemi","reminder":"2015-05-01","referralType":"somereferral","referralName":"someone","currentVisa":"Work/Holiday","visaExpiry":"2015-05-01","interested":"somebullshit"});
