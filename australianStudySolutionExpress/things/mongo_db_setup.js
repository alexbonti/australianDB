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
db.createCollection("students");




