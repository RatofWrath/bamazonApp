var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonSchema"
});

connection.connect(function(err) {
  if (err){
   throw err;
   connection.end();
  }

  console.log("Welcome to the Bamazon Manager menu");
  console.log("Please select an option from the menu below.");

  inquirer
    .prompt([
        {
            type: "list",
            name: "option",
            choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ])
    .then(function(answers){
        var command = answers.option;

        switch(command){
            case "View Products For Sale":
              viewInventory();
              break;

            case "View Low Inventory":
              getLow();
              break;

            case "Add to Inventory":
              updateInventory();
              break;

            case "Add New Product":
              addNewProduct();
              break;

            case "Exit":
              leaveMenu();
              break;

            default:
              console.log("Something went wrong.");
              connection.end();
        }
    });
});

function viewInventory(){
    console.log("Here are our products")
    connection.end();
}

function getLow(){
    console.log("Here are our products that we are running low on")
    connection.end();
}

function updateInventory(){
    console.log("What product would you like to add more of?");
    connection.end();
}

function addNewProduct(){
    console.log("Please enter the details of the product you would like to add.");
    connection.end();
}

function leaveMenu(){
    console.log("Goodbye");
    connection.end();
}