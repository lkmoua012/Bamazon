var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    homePage();
  });

  function homePage(){

    console.log("Welcome to Bamazon.\n Here are a list of items available for purchase.\n");

    connection.end();

  };