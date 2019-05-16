var mysql = require('mysql')
var inquirer = require('inquirer')

var stock_quantity = [];

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
})

function showItems() {
    // query the database for all items being auctioned
    connection.query('SELECT sku,product_name,price,stock_quantity FROM products', function (err, results) {
        if (err) throw err
        console.table(results)
        console.log('----------------------------------------------------------------------')
        purchaseOption();
    })

}
//Ask for what item and how much to purchase
function purchaseOption() {
    inquirer
        .prompt([
            {
                name: 'itemSku',
                type: 'input',
                message: 'Enter Sku of item you would like to purchase: '
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'How many of this item would like to purchase? '
            }
        ])
        .then(function (value) {
            connection.query('SELECT * FROM products WHERE sku=?', value.itemSku, function (err, results) {
                if (err) throw err
                //Check to see if quantity selected if available for purchase
                if (value.quantity >= results[0].stock_quantity) {
                    console.log(`Not enough ${results[0].product_name} in stock`)
                } else {
                    console.log(`Purchased ${value.quantity} ${results[0].product_name}`)
                    console.log(`Your total is ${value.quantity * results[0].price} `)

                    //Update Quantity
                    var stockDiff = results[0].stock_quantity - value.quantity
                    connection.query('UPDATE products SET stock_quantity=? WHERE sku=?', [stockDiff, value.itemSku], function (err, results) {
                        if (err) throw err
                        connection.end();
                    })
                }
            })
        })
}



