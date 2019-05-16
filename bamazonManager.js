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
    showOptions();
})

function showOptions(){
    inquirer.prompt({
        name: 'options',
        type: 'list',
        message: 'Main Menu:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }).then(function (value){
        if(value.options === 'View Products for Sale'){
            viewProducts() 
        }
        
    })
}


function viewProducts() {
    // query the database for all items being auctioned
    connection.query('SELECT sku,product_name,price,stock_quantity FROM products', function (err, results) {
        if (err) throw err
        console.table(results)
        connection.end()
        
    }) 
    
}