var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",

  password: "root",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  homePage();
});

function homePage() {

  console.log("Welcome to Bamazon.\nPlease choose an option.\n");

  inquirer
    .prompt([
      {
        name: "Option",
        type: "list",
        choices: ["Show Products", "Purchase", "Quit"]
      }
  ]).then(function(user) {

    switch(user.Option) {
      case "Show Products":
        productList();
        return;
      case "Purchase":
      console.log("Run puchase.\n");
        purchase();
        return;
      case "Quit":
        console.log("Thank you for visiting Bamazon.\n");
        connection.end();
    }
    

  })

  };

function productList() {
  var query = connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    homePage();
  })
};

function purchase() {
  var query = connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].product_name);
            }
            return choiceArray;
          },
          message: "What item would you like to purchase?"
        },
        {
          name: "amount",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function (answer) {
        var chosenItem;
        var chosenAmount = answer.amount;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === answer.choice) {
            chosenItem = res[i];
          }
        }

        if (chosenItem.stock >= parseInt(answer.amount) && chosenItem.stock != 0) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock: (chosenItem.stock) - (chosenAmount)
              },
              {
                id: chosenItem.id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("\nItem purchase successful.\n");
              homePage();
            }
          );

        }

        else {
          console.log("\nPurchase unsuccessful. Requested amount exceeds amount in stock.\n");
          homePage();
        }
      });
    });
}