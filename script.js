
let cookies = 0;

const cookieButton =
    document.getElementById("cookie-button");

const cookieCount =
    document.getElementById("cookie-count");

cookieButton.addEventListener("click", function() {

    cookies++;

    cookieCount.textContent = cookies;

});