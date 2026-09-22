
let cookies = 0;
let cursors = 0;
let price = 10;

// Click on cookie

document.getElementById("cookie-button").onclick = function() {

    cookies++;

    update();

};

// Buy cursor

document.getElementById("buy").onclick = function() {

    if (cookies >= price) {

        cookies = cookies - price;

        cursors++;

        price = Math.ceil(price * 1.15);

        update();

    }

};

// Automatic production every second

setInterval(function() {

    cookies = cookies + cursors;

    update();

}, 1000);

// Update screen

function update() {

    document.getElementById("cookie-count").textContent = cookies;

    document.getElementById("owned").textContent = cursors;

    document.getElementById("price").textContent = price;

}

update();