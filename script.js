// ---------------------------------
// GENERAL GAME VARIABLES
// ---------------------------------

let cookies = 0;
let cookieBeginnerUnlocked = false;


// ---------------------------------
// HTML ELEMENTS
// ---------------------------------

const cookieDisplay =
    document.getElementById("cookie-count");

const cookieButton =
    document.getElementById("cookie-button");

const cpsDisplay =
    document.getElementById("cps");

const goldenCookie =
    document.getElementById("golden-cookies");

const resetButton =
    document.getElementById("reset-game");

const darkModeButton =
    document.getElementById("dark-mode");

const cookieBeginnerDisplay =
    document.getElementById("cookie-beginner");


// ---------------------------------
// CLICK ON COOKIE
// ---------------------------------

cookieButton.addEventListener("click", function() {

    // Add one cookie
    cookies = cookies + 1;

    // Update cookie counter
    cookieDisplay.textContent = cookies;

     // Call function to check achievements
    checkAchievements();

});

// ---------------------------------
// Achievements
// ---------------------------------

function checkAchievements() {
    if (cookies >= 100 && cookieBeginnerUnlocked == false){

        cookieBeginnerUnlocked = true;

        cookies = cookies + 50;

        cookieDisplay.textContent = cookies;

        cookieBeginnerDisplay.textContent = "Cookie Beginner Unlocked (+50 Cookies)";

         saveGame();
    }
}


// ---------------------------------
// PRODUCTION UNIT CLASS
// ---------------------------------

class ProductionUnit {

    constructor(
        name,
        price,
        production,
        displayId,
        buttonId,
        priceId
    ) {

        this.name = name;

        // Current price
        this.price = price;

        // Production per second
        this.production = production;

        // Number of units owned
        this.amount = 0;

        // Production multiplier
        this.multiplier = 1;


        // Owned amount in HTML
        this.display =
            document.getElementById(displayId);


        // Buy button
        this.button =
            document.getElementById(buttonId);


        // Price in HTML
        this.priceDisplay =
            document.getElementById(priceId);


        // Buy unit when button is clicked
        this.button.addEventListener("click", () => {

            this.buy();

        });

    }


    // ---------------------------------
    // BUY PRODUCTION UNIT
    // ---------------------------------

    buy() {

        // Check if player has enough cookies
        if (cookies >= this.price) {

            // Pay cookies
            cookies =
                cookies - this.price;


            // Increase owned amount
            this.amount =
                this.amount + 1;


            // Increase price by 15%
            this.price =
                Math.ceil(
                    this.price * 1.15
                );


            // Update cookie counter
            cookieDisplay.textContent =
                cookies;


            // Update owned amount
            this.display.textContent =
                this.amount;


            // Update price
            this.priceDisplay.textContent =
                this.price;


            // Update cookies per second
            updateCPS();


            // Save after buying
            saveGame();

        } else {

            alert("Not enough cookies!");

        }

    }


    // ---------------------------------
    // PRODUCTION PER SECOND
    // ---------------------------------

    getProductionPerSecond() {

        return (
            this.amount
            * this.production
            * this.multiplier
        );

    }

}


// ---------------------------------
// CREATE PRODUCTION UNITS
// ---------------------------------

const cursor =
    new ProductionUnit(
        "Cursor",
        10,
        1,
        "owned",
        "buy",
        "price"
    );


const grandma =
    new ProductionUnit(
        "Grandma",
        50,
        5,
        "grandma-owned",
        "buy-grandma",
        "grandma-price"
    );


const farm =
    new ProductionUnit(
        "Farm",
        100,
        10,
        "farm-owned",
        "buy-farm",
        "farm-price"
    );


const factory =
    new ProductionUnit(
        "Factory",
        500,
        50,
        "factory-owned",
        "buy-factory",
        "factory-price"
    );


const mine =
    new ProductionUnit(
        "Mine",
        1000,
        100,
        "mine-owned",
        "buy-mine",
        "mine-price"
    );


const bank =
    new ProductionUnit(
        "Bank",
        1500,
        150,
        "bank-owned",
        "buy-bank",
        "bank-price"
    );


const temple =
    new ProductionUnit(
        "Temple",
        2000,
        200,
        "temple-owned",
        "buy-temple",
        "temple-price"
    );


const tower =
    new ProductionUnit(
        "Tower",
        2500,
        250,
        "tower-owned",
        "buy-tower",
        "tower-price"
    );


// ---------------------------------
// BASE UPGRADE CLASS
// ---------------------------------

class Upgrade {

    constructor(
        price,
        buttonId
    ) {

        this.price = price;

        // Upgrade is not purchased yet
        this.purchased = false;


        // Upgrade button
        this.button =
            document.getElementById(buttonId);


        // Buy upgrade when clicked
        this.button.addEventListener("click", () => {

            this.buy();

        });

    }


    // ---------------------------------
    // GENERAL BUY METHOD
    // ---------------------------------

    buy() {

        if (
            cookies >= this.price
            &&
            this.purchased === false
        ) {

            // Pay cookies
            cookies =
                cookies - this.price;


            // Mark as purchased
            this.purchased =
                true;


            // Update cookie counter
            cookieDisplay.textContent =
                cookies;


            // Disable button
            this.button.disabled =
                true;

            // Show that the upgrade was purchased
            this.button.textContent = "Purchased";

            // Purchase successful    
            return true;

        }


        return false;

    }

}


// ---------------------------------
// PRODUCTION UPGRADE CLASS
// ---------------------------------

class ProductionUpgrade extends Upgrade {

    constructor(
        price,
        buttonId,
        productionUnit,
        multiplier
    ) {

        // Use constructor from Upgrade
        super(
            price,
            buttonId
        );


        // Unit affected by upgrade
        this.productionUnit =
            productionUnit;


        // Example: 2 = x2
        this.multiplier =
            multiplier;

    }


    // ---------------------------------
    // BUY PRODUCTION UPGRADE
    // ---------------------------------

    buy() {

        // Use buy method from Upgrade
        const success =
            super.buy();


        if (success) {

            // Multiply production
            this.productionUnit.multiplier =
                this.productionUnit.multiplier
                * this.multiplier;


            // Update CPS immediately
            updateCPS();


            // Save after buying upgrade
            saveGame();

        } else if (this.purchased === false) {

            alert("Not enough cookies!");

        }

    }

}

// ---------------------------------
// DiscountUpgrade
// ---------------------------------

class DiscountUpgrade extends Upgrade {

    constructor(
        price,
        buttonId,
        productionUnit,
        discount
    ) {

        // Use constructor from Upgrade
        super(
            price,
            buttonId
        );


        // Unit affected by upgrade
        this.productionUnit =
            productionUnit;


        // Example: 0.2 = 20% discount
        this.discount =
            discount;

    }

    buy() {

        const success = super.buy();


        if (success) {

            // Apply discount
            this.productionUnit.price = Math.ceil(
                this.productionUnit.price
                * (1 - this.discount) 
            );


           // Update the price on the screen
           this.productionUnit.priceDisplay.textContent =
              this.productionUnit.price;


            // Save after buying upgrade
            saveGame();

        } else if (this.purchased === false) {

            alert("Not enough cookies!");
    }
  }
}

// ---------------------------------
// GrandmaBonusUpgrade
// ---------------------------------

class GrandmaBonusUpgrade extends Upgrade {

    constructor(
        price,
        buttonId,
        grandmaUnit,
        farmUnit,
        bonus
    ) {

        super(
            price,
            buttonId
    )

     this.grandmaUnit =
            grandmaUnit;


        this.farmUnit =
            farmUnit;


        this.bonus =
            bonus;
    }

    buy() {
        const success = super.buy();

    if (success) {

        updateCPS();

        saveGame();

    } else if (this.purchased === false) {

        alert("Not enough cookies!");
    }
    }

}






// ---------------------------------
// CREATE Discouts UPGRADES
// ---------------------------------

const grandmaDiscount =
    new DiscountUpgrade(
        400,
        "discount-grandma",
        grandma,
        0.2);


// ---------------------------------
// CREATE GrandmaBonus 
// ---------------------------------

const grandmaBonus = 
    new GrandmaBonusUpgrade(
        500,
        "grandma-bonus",
        grandma,
        farm,
        1);

// ---------------------------------
// CREATE UPGRADES
// ---------------------------------

const cursorUpgrade =
    new ProductionUpgrade(
        100,
        "upgrade-cursor",
        cursor,
        2
    );


const grandmaUpgrade =
    new ProductionUpgrade(
        150,
        "upgrade-grandma",
        grandma,
        2
    );


const farmUpgrade =
    new ProductionUpgrade(
        200,
        "upgrade-farm",
        farm,
        2
    );


const factoryUpgrade =
    new ProductionUpgrade(
        250,
        "upgrade-factory",
        factory,
        2
    );


const mineUpgrade =
    new ProductionUpgrade(
        300,
        "upgrade-mine",
        mine,
        2
    );


// ---------------------------------
// CPS CALCULATOR
// ---------------------------------

function calculateCPS() {

    let grandmaProduction = 
    grandma.getProductionPerSecond();

    if(grandmaBonus.purchased) {
        grandmaProduction =
          grandma.amount *
          (grandma.production
            + farm.amount * grandmaBonus.bonus)
            * grandma.multiplier;
        }

    return (

        cursor.getProductionPerSecond()
        + grandmaProduction
        + farm.getProductionPerSecond()
        + factory.getProductionPerSecond()
        + mine.getProductionPerSecond()
        + bank.getProductionPerSecond()
        + temple.getProductionPerSecond()
        + tower.getProductionPerSecond()

    );

}


function updateCPS() {

    cpsDisplay.textContent =
        calculateCPS();

}


// ---------------------------------
// AUTOMATIC PRODUCTION
// ---------------------------------

setInterval(function() {

    // Add automatic production
    cookies = cookies + calculateCPS();


    // Update cookie counter
    cookieDisplay.textContent = cookies;

    //Check for achievements
    checkAchievements(); 

    // Update CPS
    updateCPS();

}, 1000);


// ---------------------------------
// GOLDEN COOKIE
// ---------------------------------

function showGoldenCookie() {

    goldenCookie.style.display =
        "block";

}


function hideGoldenCookie() {

    goldenCookie.style.display =
        "none";

}


// Show Golden Cookie every 15 seconds
setInterval(function() {

    showGoldenCookie();


    // Hide after 5 seconds
    setTimeout(function() {

        hideGoldenCookie();

    }, 5000);

}, 15000);


// Golden Cookie gives 100 cookies
goldenCookie.addEventListener( "click", function() {

        cookies =
            cookies + 100;


        // Update counter
        cookieDisplay.textContent =
            cookies;


        // Hide Golden Cookie
        hideGoldenCookie();


        // Save bonus
        saveGame();

    }
);


// ---------------------------------
// ARRAYS
// ---------------------------------

// All production units
const productionUnits = [

    cursor,
    grandma,
    farm,
    factory,
    mine,
    bank,
    temple,
    tower

];


// All upgrades
const upgrades = [

    cursorUpgrade,
    grandmaUpgrade,
    farmUpgrade,
    factoryUpgrade,
    mineUpgrade,
    grandmaDiscount,
    grandmaBonus

];


// ---------------------------------
// SAVE GAME
// ---------------------------------

function saveGame() {

    // Save cookies
    localStorage.setItem(
        "cookies",
        cookies
    );


    // Save all production units
    productionUnits.forEach(function(unit) {

        // Save amount
        localStorage.setItem(
            unit.name + "Amount",
            unit.amount
        );


        // Save current price
        localStorage.setItem(
            unit.name + "Price",
            unit.price);
 });

    // Save upgrades
    upgrades.forEach(function(upgrade) {

        localStorage.setItem(
            upgrade.button.id + "Purchased",
            upgrade.purchased);

    });


    // Save dark mode
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );


    // Save cookie beginner unlocked
    localStorage.setItem(
        "cookieBeginnerUnlocked",
        cookieBeginnerUnlocked
    );

}


// ---------------------------------
// LOAD GAME
// ---------------------------------

function loadGame() {

    // ---------------------------------
    // LOAD COOKIES
    // ---------------------------------

    const savedCookies =
        localStorage.getItem("cookies");


    if (savedCookies !== null) {

        cookies =
            Number(savedCookies);


        cookieDisplay.textContent =
            cookies;

    }


    // ---------------------------------
    // LOAD PRODUCTION UNITS
    // ---------------------------------

    productionUnits.forEach(function(unit) {

        const savedAmount =
            localStorage.getItem(
                unit.name + "Amount"
            );


        const savedPrice =
            localStorage.getItem(
                unit.name + "Price"
            );


        // Restore amount
        if (savedAmount !== null) {

            unit.amount =
                Number(savedAmount);


            unit.display.textContent =
                unit.amount;

        }


        // Restore price
        if (savedPrice !== null) {

            unit.price =
                Number(savedPrice);


            unit.priceDisplay.textContent =
                unit.price;

        }

    });


    // Reset all multipliers before restoring upgrades
    productionUnits.forEach(function(unit) {

        unit.multiplier = 1;

    });


    // ---------------------------------
    // LOAD UPGRADES
    // ---------------------------------

    upgrades.forEach(function(upgrade) {

        const savedPurchased =
            localStorage.getItem(
                upgrade.button.id
                + "Purchased"
            );


        if (savedPurchased === "true") {

            // Mark as purchased
            upgrade.purchased =
                true;


            // Disable button
            upgrade.button.disabled =
                true;

            // Change button text
            upgrade.button.textContent = "Purchased";


            // Restore upgrade effect
            upgrade.productionUnit.multiplier =
                upgrade.productionUnit.multiplier
                * upgrade.multiplier;

        }

    });


    // ---------------------------------
    // LOAD DARK MODE
    // ---------------------------------

    const savedDarkMode =
        localStorage.getItem(
            "darkMode"
        );


    if (savedDarkMode === "true") {

        document.body.classList.add(
            "dark-mode"
        );


        darkModeButton.textContent =
            "Light Mode";

    } else {

        document.body.classList.remove(
            "dark-mode"
        );


        darkModeButton.textContent =
            "Dark Mode";

    }


    // Update CPS after loading
    updateCPS();


    
    const savedAchievement =
    localStorage.getItem("cookieBeginnerUnlocked");

      if (savedAchievement === "true") {

         cookieBeginnerUnlocked = true;

         cookieBeginnerDisplay.textContent =
        "Cookie Beginner: Unlocked (+50 Cookies)";
}




}


// ---------------------------------
// AUTO SAVE
// ---------------------------------

// Save every second
// Store interval inside autoSave
// so we can stop it when resetting

const autoSave =
    setInterval(
        saveGame,
        1000
    );


// ---------------------------------
// RESET GAME
// ---------------------------------

resetButton.addEventListener(
    "click",
    function() {

        // Ask before resetting
        const confirmReset =
            confirm(
                "Are you sure you want to reset the game?"
            );


        if (confirmReset) {

            // Stop automatic saving
            clearInterval(autoSave);


            // Delete all saved data
            localStorage.clear();


            // Reload page
            location.reload();

        }

    }
);


// ---------------------------------
// DARK MODE
// ---------------------------------

darkModeButton.addEventListener(
    "click",
    function() {

        // Add/remove dark mode
        document.body.classList.toggle(
            "dark-mode"
        );


        // Change button text
        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            darkModeButton.textContent =
                "Light Mode";

        } else {

            darkModeButton.textContent =
                "Dark Mode";

        }


        // Save selected mode
        saveGame();

    }
);


// ---------------------------------
// START GAME
// ---------------------------------

// Load saved progress
loadGame();