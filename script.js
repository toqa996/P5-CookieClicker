
let cookies = 0;

// Cursor
let cursors = 0;
let price = 10;

// Grandma
let grandmas = 0;
let grandmaPrice = 50;


// Click on cookie

document.getElementById("cookie-button").onclick = function() {

    cookies++;

    update();

};


// Buy Cursor

document.getElementById("buy").onclick = function() {

    if (cookies >= price) {

        cookies = cookies - price;

        cursors++;

        price = Math.ceil(price * 1.15);

        update();

    }

};


// Buy Grandma

document.getElementById("buy-grandma").onclick = function() {

    if (cookies >= grandmaPrice) {

        cookies = cookies - grandmaPrice;

        grandmas++;

        grandmaPrice = Math.ceil(grandmaPrice * 1.15);

        update();

    }

};


// Automatic production

setInterval(function() {

    cookies = cookies + cursors + (grandmas * 5);

    update();

}, 1000);


// Update screen

function update() {

    document.getElementById("cookie-count").textContent = cookies;

    document.getElementById("owned").textContent = cursors;

    document.getElementById("price").textContent = price;

    document.getElementById("grandma-owned").textContent = grandmas;

    document.getElementById("grandma-price").textContent = grandmaPrice;

}

update();