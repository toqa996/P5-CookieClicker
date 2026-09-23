
let cookies = 0;

const cookieCount = document.getElementById('cookie-count');

const cookieButton = document.getElementById('cookie-button');


// Click on cookie

cookieButton.addEventListener('click', () => {

    cookies = cookies + 1;

    cookieCount.textContent = cookies;

});


// Production Unit Class

class ProductionUnit {

    constructor(name, price, production, displayId, buttonId, priceId) {

        this.name = name;

        this.price = price;

        this.production = production;

        this.amount = 0;

        this.display = document.getElementById(displayId);

        this.button = document.getElementById(buttonId);

        this.priceDisplay = document.getElementById(priceId);

        this.button.addEventListener('click', () => {

            this.buy();

        });

    }


    // Buy production unit

    buy() {

        if (cookies >= this.price) {

            cookies = cookies - this.price;

            this.amount = this.amount + 1;

            this.price = Math.ceil(this.price * 1.05);

            cookieCount.textContent = cookies;

            this.display.textContent = this.amount;

            this.priceDisplay.textContent = this.price;

        }

    }


    // Calculate production

    getProductionPerSecond() {

        return this.amount * this.production;

    }

}


// Create Cursor

const cursor = new ProductionUnit(
    'Cursor',
    10,
    1,
    'owned',
    'buy',
    'price'
);


// Create Grandma

const grandma = new ProductionUnit(
    'Grandma',
    50,
    5,
    'grandma-owned',
    'buy-grandma',
    'grandma-price'
);


//create Farm
const farm = new ProductionUnit(
    'farm',
    100,
    10,
    'farm-owned',
    'buy-farm',
    'farm-price'
);

// Automatic production

setInterval(function() {

    cookies = cookies
        + cursor.getProductionPerSecond()
        + grandma.getProductionPerSecond();
    + farm.getProductionPerSecond();

    cookieCount.textContent = cookies;

}, 1000);