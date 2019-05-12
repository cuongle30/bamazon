var mysql = require('mysql')
var inquirer = require('inquirer')

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'nodeuser',

  // Your password
  password: '',
  database: 'bamazon'
})

connection.connect(function (err) {
  if (err) throw err
  console.log('connected as id ' + connection.threadId + '\n')
  showItems();
  connection.end();
})

function showItems () {
    // query the database for all items being auctioned
    connection.query('SELECT * FROM products', function (err, results) {
      
                if (err) throw err
                for (var i = 0; i < results.length; i++) {
                  console.log('Product: ' + results[i].product_name + ' || Price: ' + results[i].price + ' || Quantity: ' + results[i].stock_quantity)
            }
          })
        }
    
    




