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

  menu();
});

function viewInventory(){
    console.log("Here are our products")
    console.log("");
    connection.query("SELECT * FROM products", function(err, res){
      if(err){
        console.log("An error has occured");
        throw err;
      }

      printInventory(res);
      menu();
    })
}

function getLow(){
    console.log("Here are our products that we are running low on");
    console.log("");

    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res){
      if(err){
        console.log("An error has occured");
        throw err;
      }

      printInventory(res);
      menu();
    })
}

function updateInventory(){
    console.log("What product would you like to add more of?");
    console.log("");

    inquirer
   .prompt([
     {
       name: "product_id",
       message: "What is the id of the product you want to change the volume of? "
     },

     {
       name: "volume",
       message: "How many copies would you like there to be?"
     }
    ])
    .then(function(answers){
      connection.query("SELECT * FROM products", function(err, res){
      var chosenItem;
          for(i = 0; i < res.length; i++){
  
            if(res[i].item_id == answers.product_id){
              chosenItem = res[i];
            }

          }

      var query = ("UPDATE products SET stock_quantity = ? WHERE item_id = ?");
      connection.query(query, [answers.volume, answers.product_id]);

      console.log("There are now " + answers.volume + " copies of " + chosenItem.product_name);
      menu();
      })

    })
  }

function addNewProduct(){
    console.log("Please enter the details of the product you would like to add.");

    inquirer
      .prompt([
        {
          name: "name",
          message: "What is the new product's name?"
        },

        {
          name: "price",
          message: "What is this product's price?"
        },

        {
          name: "stock",
          message: "How many should we put in stock?"
        }
      ])
      .then(function(answers){

        var product_name = answers.name;
        var price = answers.price;
        var stock = answers.stock;

        var query = "INSERT INTO products (product_name,price,stock_quantity) VALUES(?,?,?)"
        connection.query(query, [product_name, price, stock]);

        connection.query("SELECT * FROM products", function(err, res){
          if(err){
            console.log("An error has occured");
            throw err;
          }

        printInventory(res);
        menu();
      })
    })

}

function menu(){
  inquirer
    .prompt([
        {
            type: "list",
            name: "option",
            choices: ["View Products For Sale", "View Low Inventory", "Change Inventory Volume", "Add New Product", "Remove Product", "Exit"]
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

            case "Change Inventory Volume":
              updateInventory();
              break;

            case "Add New Product":
              addNewProduct();
              break;
            
            case "Remove Product":
               removeProduct();
               break;

            case "Exit":
              leaveMenu();
              break;

            default:
              console.log("Something went wrong.");
              connection.end();
        }
    });
}

function removeProduct(){
  inquirer
   .prompt([
     {
       name: "product_id",
       message: "What is the id of the product you want to remove? "
     }
    ])
     .then(function(answers){

       var query = "DELETE FROM products WHERE ?"
      connection.query(query, {item_id: answers.product_id});

       connection.query("SELECT * FROM products", function(err, res){
        if(err){
          console.log("An error has occured");
          throw err;
        }

        printInventory(res);
        menu();
     })
    })
}

function printInventory(res){
  for(i = 0; i < res.length; i++){
    console.log("Product ID: " + res[i].item_id);
    console.log("Product Name: " + res[i].product_name);
    console.log("Price:  $" + res[i].price);
    console.log("Quantity Left: " + res[i].stock_quantity);
    console.log("");
  }
}

function leaveMenu(){
    console.log("Goodbye");
    connection.end();
}