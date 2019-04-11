var mysql = require("mysql");

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
  }

  console.log("connected as id " + connection.threadId + "\n");
  connection.query("SELECT * FROM products", function(err, res){
      if(err){
          throw err;
      }

      console.log("Welcome to the Bamazon Store");
      console.log("Take look around");
      console.log("");

      for(i = 0; i < res.length; i++){
        console.log("Product ID: " + res[i].item_id);
        console.log("Product Name: " + res[i].product_name);
        console.log("Price:  $" + res[i].price);
        console.log("");
      }
      
      connection.end();
  })
});
