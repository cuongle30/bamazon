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
//Display Main Menu for avaialble options
function showOptions() {
    inquirer.prompt({
        name: 'options',
        type: 'list',
        message: 'Main Menu:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }).then(function (value) {
        if (value.options === 'View Products for Sale') {
            viewProducts();
        } else if (value.options === 'View Low Inventory') {
            viewLowInv();
        } else if (value.options === 'Add to Inventory') {
            addInv();
        } else if (value.options === 'Add New Product') {
            addNewInv();
        }
    })
}
//Open table of available products
function viewProducts() {
    // query the database for all items being auctioned
    connection.query('SELECT sku,product_name,price,stock_quantity FROM products', function (err, results) {
        if (err) throw err
        console.table(results)
        connection.end()
    })
}
//Function to view inventory under preset amount, 20.
function viewLowInv() {
    connection.query('SELECT sku,product_name,price,stock_quantity FROM products WHERE stock_quantity <=20', function (err, results) {
        if (err) throw err
        console.table(results)
        connection.end()
    })
}
//Adding to Add to Inventory
function addInv() {
    connection.query('SELECT sku,product_name,price,stock_quantity FROM products', function (err, results) {
        inquirer.prompt([
            {
                name: 'addSku',
                message: 'Enter Sku to be added:'
            },
            {
                name: 'quantity',
                message: 'How many?'
            }
        ]).then(function (value) {
            //Select sku to add
            connection.query('SELECT sku,product_name,price,stock_quantity FROM products WHERE sku=?', function (err, results) {
                if (err) throw err

                //Update stock_quantity for added sku 
                connection.query('SELECT sku,product_name,price,stock_quantity FROM products WHERE sku=?', function (err, results) {
                    if (err) throw err
                    //Add user entered stock quantity to current stock quantity
                    var addedInv = value.parseInt(results[0].stock_quantity + parseInt(value.quantity))
                    console.log(`${addedInv} added to ${results[0].product_name}`)
                    connection.end();
                })
            })
        })

    })
}
//Adding new inventory
function addNewInv() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'Enter product name: ',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter department for product: ',
        },
        {
            type: 'input',
            name: 'price',
            message: 'Enter price for unit: ',
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'Enter quantity: '
        }
        //Display user input and ask for confirmation
    ]).then(function (input) {
        console.log('')
        console.log(`Product Name: ${input.product_name}`)
        console.log(`Department Name:  ${input.department_name}`)
        console.log(`Price: ${input.price}`)
        console.log(`Quantity ${input.stock_quantity}`)
        console.log('')
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Is this correct?',
            }
        ]).then(function (user) {
            if (user.confirm) {
                //add new product, shows added confirmation, and open product table
                connection.query('INSERT INTO products SET ?', input, function (err, results) {
                    if (err) throw err;
                    console.log('')
                    console.log(`${input.product_name} has been added.`);
                    console.log('')
                    viewProducts();
                })
                //Will display main menu if user select no on confirmation
            } else {
                showOptions();
            }
        })
    })
}

