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

  console.log("connected as id " + connection.threadId + "\n");
  connection.query("SELECT * FROM products", function(err, res){
      if(err){
          throw err;
      }

      console.log("Welcome to the Bamazon Store");
      console.log("Take look around");
      console.log("");

      printInventory(res);
  })
});

function printInventory(res){
  for(i = 0; i < res.length; i++){
    console.log("Product ID: " + res[i].item_id);
    console.log("Product Name: " + res[i].product_name);
    console.log("Price:  $" + res[i].price);
    console.log("Quantity Left: " + res[i].stock_quantity);
    console.log("");
  }
  
  menu(res);
}

function menu(res){
    inquirer
        .prompt([
            {
            name: "purchasedProduct",
            message: "What is the ID of the product you want to buy? "
            },

            {
                name: "purchaseQuantity",
                message: "How many would you like to buy? "
            }
        ])
        .then(function(answers){
          var chosenItem;
          var product_id = parseInt(answers.purchasedProduct);
          var volume = parseInt(answers.purchaseQuantity);

          for(i = 0; i < res.length; i++){
  
            if(res[i].item_id === product_id){
              chosenItem = res[i];
            }

          }

          if(volume > chosenItem.stock_quantity){
            console.log("");
            console.log("You are trying to order more copies of " + chosenItem.product_name +
             " then we have in stock! ");
          }

          else{
            console.log("");
            var newVolume = chosenItem.stock_quantity - volume;
            var query = ("UPDATE products SET stock_quantity = ? WHERE item_id = ?");
            connection.query(query, [newVolume, product_id]);
            console.log(volume + " copies of " + chosenItem.product_name + " will come to " + (volume * chosenItem.price));
          }

          inquirer
            .prompt([
              {
                type: "confirm",
                name: "continue",
                message: "Would you like to make another purchase? "
              }
            ])
            .then(function(answers){
              if(answers.continue === true){
                printInventory(res);
              }

              else{
                console.log("Goodbye");
                connection.end();
              }
            })
        });
}