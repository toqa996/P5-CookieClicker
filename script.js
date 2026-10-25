// ---------------------------------
// GENERAL GAME VARIABLES
// ---------------------------------

let cookies = 0;

let cookieBeginnerUnlocked = false; 

let totalCookiesEarned = 0; // total cookies earned, including cookies lost when resetting

let totalPlaytime = 0; // total time spent playing, in seconds

let prestigeLevel = 0; 

let prestigeBonus = 0; // bonus to cookies earned from prestige


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

const totalCookiesDisplay =
    document.getElementById("total-cookies-earned");

const totalPlaytimeDisplay =
    document.getElementById("total-playtime");

const prestigeLevelDisplay =
    document.getElementById("prestige-level");

const prestigeButton =
    document.getElementById("prestige-button");

const messageBox = document.getElementById("message");


// ---------------------------------
// CLICK ON COOKIE
// ---------------------------------

cookieButton.addEventListener("click", function() {

    // Add one cookie
    cookies = cookies + 1;
    
    totalCookiesEarned = totalCookiesEarned + 1; 

    // Update cookie counter
    cookieDisplay.textContent = cookies;

     // Call function to check achievements
    checkAchievements();

    // Update statistics
    updateStatistics();

});

// ---------------------------------
// show message 
// ---------------------------------

function clearMessage() {
    
document.getElementById("message").textContent = "";

}

setInterval (clearMessage, 5000);



// ---------------------------------
// Achievements
// ---------------------------------

function checkAchievements() {

    if (cookies >= 100 && cookieBeginnerUnlocked == false){

        cookieBeginnerUnlocked = true;

        // Achievement reward
        cookies = cookies + 50;

        totalCookiesEarned = totalCookiesEarned + 50;

        // Update cookie counter
        cookieDisplay.textContent = cookies;

        // Show achievement
        cookieBeginnerDisplay.textContent = "Cookie Beginner Unlocked (+50 Cookies)";

         // Update statistics
        updateStatistics();

        // Save achievement
        saveGame();
    }
}

// ---------------------------------
// Update Total Cookies Earned
// ---------------------------------
function updateStatistics() {

    totalCookiesDisplay.textContent = totalCookiesEarned;
    
    totalPlaytimeDisplay.textContent = totalPlaytime;
}

// ---------------------------------
// Increase Playtime
// ---------------------------------
setInterval(function() {

    totalPlaytime = totalPlaytime + 1;

    updateStatistics();

},1000);


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

        // Original price
        this.startPrice = price;

        // Production per second
        this.production = production;

        // Number of units owned
        this.amount = 0;

        // Production multiplier
        this.multiplier = 1;


        // Owned amount in HTML
        this.display = document.getElementById(displayId);


        // Buy button
        this.button = document.getElementById(buttonId);


        // Price in HTML
        this.priceDisplay = document.getElementById(priceId);

        this.priceDisplay.textContent = this.price;

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
            cookies = cookies - this.price;


            // Increase owned amount
            this.amount = this.amount + 1;


            // Increase price by 15%
            this.price = Math.ceil(this.price * 1.15);


            // Update cookie counter
            cookieDisplay.textContent = cookies;


            // Update owned amount
            this.display.textContent = this.amount;


            // Update price
            this.priceDisplay.textContent = this.price;


            // Update cookies per second
            updateCPS();


            // Save after buying
            saveGame();

        } else {

            // Show error message
            messageBox.textContent = "You don't have enough cookies!";

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
// LOAD PRODUCTION UNITS FROM JSON
// ---------------------------------

const productionUnits = [];

let cursor;
let grandma;
let farm;
let factory;
let mine;
let bank;
let temple;
let tower;

let grandmaBonus;

let upgrades = [];


fetch("productionUnits.json").then(function(response){

        return response.json();

    }).then(function(data) {

        // Create all production units
        data.forEach(function(unitData) {

            const unit = new ProductionUnit(
                    unitData.name,
                    unitData.price,
                    unitData.production,
                    unitData.displayId,
                    unitData.buttonId,
                    unitData.priceId
                );

            productionUnits.push(unit);

            

        });

        // Find each production unit by name

        cursor = productionUnits.find(function(unit) {

                return unit.name === "cursor";

            });


        grandma = productionUnits.find(function(unit) {

                return unit.name === "grandma";

            });


        farm = productionUnits.find(function(unit) {

                return unit.name === "farm";

            });


        factory = productionUnits.find(function(unit) {

                return unit.name === "factory";

            });


        mine = productionUnits.find(function(unit) {

                return unit.name === "mine";

            });


        bank = productionUnits.find(function(unit) {

                return unit.name === "bank";

            });


        temple = productionUnits.find(function(unit) {

                return unit.name === "temple";

            });


        tower = productionUnits.find(function(unit) {

                return unit.name === "tower";

            });

fetch("upgradeUnits.json").then(function(response) {

        return response.json();

    }).then(function(upgradeData) {

        upgradeData.forEach(function(data) {

            // MULTIPLIER UPGRADE

            if (data.type === "multiplier") {

                const unit = productionUnits.find(function(productionUnit) {

                        return productionUnit.name === data.productionUnit;

                    });

                const upgrade = new Upgrade(
                        data.price, data.buttonId,
                        function() {
                            unit.multiplier =  unit.multiplier * data.value;
                            updateCPS();
                        }
                    );

                upgrades.push(upgrade);
            }

            // DISCOUNT UPGRADE

            if (data.type === "discount") {

                const unit = productionUnits.find(function(productionUnit) {

                        return productionUnit.name === data.productionUnit;

                    });

                const upgrade = new Upgrade(
                        data.price, data.buttonId,
                        function() {

                            unit.price = Math.ceil(unit.price * (1 - data.value) );

                            unit.priceDisplay.textContent = unit.price;
                        }
                    );
                upgrades.push(upgrade);
            }

            // BONUS UPGRADE

            if (data.type === "bonus") {

                const upgrade = new Upgrade(
                        data.price, data.buttonId,
                        function() {
                            updateCPS();
                        }
                    );

                upgrade.bonus = data.value;

                grandmaBonus = upgrade;

                upgrades.push(upgrade);
            }

        });

        // Load saved game only after
        // all upgrades are created
        loadGame();

    });

    });


        console.log(productionUnits);

      



// ---------------------------------
// BASE UPGRADE CLASS
// ---------------------------------

class Upgrade {

    constructor(
        price,
        buttonId,
        effect
    ) {

        this.price = price;

        // Upgrade is not purchased yet
        this.purchased = false;

        this.effect = effect;

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

        if (cookies >= this.price &&
            this.purchased === false ) {

            // Pay cookies
            cookies = cookies - this.price;

            // Mark as purchased
            this.purchased = true;

            // Update cookie counter
            cookieDisplay.textContent = cookies;

            // Disable button
            this.button.disabled = true;

            // Show that the upgrade was purchased
            this.button.textContent = "Purchased";

            if (this.effect){
                this.effect();
            }
            saveGame();

            // Purchase successful    
            return true;

        }


        return false;

    }

}

// ---------------------------------
// CPS CALCULATOR
// ---------------------------------

function calculateCPS() {

    let grandmaProduction = grandma.getProductionPerSecond();

    if (grandmaBonus.purchased) {
        grandmaProduction = grandma.amount *
          (grandma.production + farm.amount * grandmaBonus.bonus)
            * grandma.multiplier;
        }

    const normalCPS =
        cursor.getProductionPerSecond()
        + grandmaProduction
        + farm.getProductionPerSecond()
        + factory.getProductionPerSecond()
        + mine.getProductionPerSecond()
        + bank.getProductionPerSecond()
        + temple.getProductionPerSecond()
        + tower.getProductionPerSecond();

    // Add Prestige bonus
    const finalCPS = normalCPS
        * (1 + prestigeBonus);

     // No decimal numbers
    return Math.round(finalCPS);

}

// ---------------------------------
// UPDATE CPS
// ---------------------------------

function updateCPS() {

    cpsDisplay.textContent = calculateCPS();

}


// ---------------------------------
// AUTOMATIC PRODUCTION
// ---------------------------------

setInterval(function() {

    const earnedCookies = calculateCPS();

    // Add automatic production
    cookies = cookies + earnedCookies;

    // Add only earned cookies to statistics
    totalCookiesEarned =
        totalCookiesEarned + earnedCookies;


    // Update cookie counter
    cookieDisplay.textContent = cookies;

    // Update statistics  
    updateStatistics();

    // Check for achievements
    checkAchievements();

    // Update CPS
    updateCPS();

}, 1000);


// ---------------------------------
// GOLDEN COOKIE
// ---------------------------------

function showGoldenCookie() {

    goldenCookie.style.display = "block";

}


function hideGoldenCookie() {

    goldenCookie.style.display = "none";

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

        cookies =  cookies + 100;

        totalCookiesEarned = totalCookiesEarned + 100;

        // Update counter
        cookieDisplay.textContent = cookies;

        updateStatistics();

        checkAchievements();

        // Hide Golden Cookie
        hideGoldenCookie();


        // Save bonus
        saveGame();

    }
);

// ---------------------------------
// SAVE GAME
// ---------------------------------

function saveGame() {

    // Save cookies
    localStorage.setItem("cookies", cookies);

    // Save all production units
    productionUnits.forEach(function(unit) {

        // Save amount
        localStorage.setItem(
            unit.name + "Amount",
            unit.amount);


        // Save current price
        localStorage.setItem(
            unit.name + "Price",
            unit.price);

        localStorage.setItem(
        unit.name + "StartPrice",
        unit.startPrice);

        localStorage.setItem(
        unit.name + "Multiplier",
        unit.multiplier);


 });

    // Save upgrades
    upgrades.forEach(function(upgrade) {

        localStorage.setItem(
            upgrade.button.id + "Purchased",
            upgrade.purchased);

    });

    // Save dark mode
    localStorage.setItem("darkMode",
        document.body.classList.contains("dark-mode"));


    // Save achievement
    localStorage.setItem("cookieBeginnerUnlocked", 
        cookieBeginnerUnlocked);

    // Save total cookies earned
    localStorage.setItem("totalCookiesEarned",
         totalCookiesEarned); 

    //save total playtime
    localStorage.setItem("totalPlaytime",
         totalPlaytime);

    // Save Prestige Level
    localStorage.setItem("prestigeLevel", 
        prestigeLevel);

    // Save Prestige Bonus
    localStorage.setItem("prestigeBonus", 
        prestigeBonus);
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

        cookies =Number(savedCookies);

        cookieDisplay.textContent = cookies;
    }

    // ---------------------------------
    // LOAD PRODUCTION UNITS
    // ---------------------------------

    productionUnits.forEach(function(unit) {

        const savedAmount =
            localStorage.getItem(unit.name + "Amount");

        const savedPrice =
            localStorage.getItem(unit.name + "Price");

        const savedStartPrice = localStorage.getItem(
            unit.name + "StartPrice");

        const savedMultiplier = localStorage.getItem(
            unit.name + "Multiplier");

        // Restore amount
        if (savedAmount !== null) {

            unit.amount =Number(savedAmount);

            unit.display.textContent = unit.amount;
        }

        // Restore price
       if ( savedStartPrice !== null &&
        Number(savedStartPrice) === unit.startPrice
    ) {
        unit.price = Number(savedPrice);

    } else {
        unit.price = unit.startPrice;
    }

    if (savedMultiplier !== null) {
           unit.multiplier = Number(savedMultiplier);
}


    unit.priceDisplay.textContent =
        unit.price;

    });

    // ---------------------------------
    // LOAD UPGRADES
    // ---------------------------------

    upgrades.forEach(function(upgrade) {

        const savedPurchased =
            localStorage.getItem(
                upgrade.button.id + "Purchased"
            );


        if (savedPurchased === "true") {

            // Mark as purchased
            upgrade.purchased = true;

            // Disable button
            upgrade.button.disabled = true;

            // Change button text
            upgrade.button.textContent ="Purchased";

        }
    });


    // ---------------------------------
    // LOAD DARK MODE
    // ---------------------------------

    const savedDarkMode =
        localStorage.getItem("darkMode");

    if (savedDarkMode === "true") {

        document.body.classList.add("dark-mode");

        darkModeButton.textContent = "Light Mode";

    } else {

        document.body.classList.remove("dark-mode");

        darkModeButton.textContent = "Dark Mode";
    }
    // ---------------------------------
    // LOAD ACHIEVEMENT
    // ---------------------------------

    const savedAchievement =
        localStorage.getItem("cookieBeginnerUnlocked");


    if (savedAchievement === "true") {

        cookieBeginnerUnlocked = true;

        cookieBeginnerDisplay.textContent =
            "Cookie Beginner: Unlocked (+50 Cookies)";
    }

    // ---------------------------------
    // LOAD TOTAL COOKIES EARNED
    // ---------------------------------

    const savedTotalCookies =
        localStorage.getItem("totalCookiesEarned");


    if (savedTotalCookies !== null) {

        totalCookiesEarned = Number(savedTotalCookies);
    }
    // ---------------------------------
    // LOAD TOTAL PLAYTIME
    // ---------------------------------

    const savedPlaytime =
        localStorage.getItem("totalPlaytime");


    if (savedPlaytime !== null) {

        totalPlaytime = Number(savedPlaytime);
    }

    // ---------------------------------
    // LOAD PRESTIGE LEVEL
    // ---------------------------------

    const savedPrestigeLevel =
        localStorage.getItem("prestigeLevel");


    if (savedPrestigeLevel !== null) {

        prestigeLevel = Number(savedPrestigeLevel);

        prestigeLevelDisplay.textContent = prestigeLevel;
    }

    // ---------------------------------
    // LOAD PRESTIGE BONUS
    // ---------------------------------

    const savedPrestigeBonus =
        localStorage.getItem("prestigeBonus");


    if (savedPrestigeBonus !== null) {

        prestigeBonus = Number(savedPrestigeBonus);
    }

    // ---------------------------------
    // UPDATE SCREEN AFTER LOADING
    // ---------------------------------

    updateStatistics();

    updateCPS();
}


// ---------------------------------
// AUTO SAVE
// Save every second
// Store interval inside autoSave
// so we can stop it when resetting

const autoSave = setInterval( saveGame, 1000
    );


// ---------------------------------
// RESET GAME
// ---------------------------------

resetButton.addEventListener("click", function() {

        // Ask before resetting
        const confirmReset = confirm("Are you sure you want to reset the game?" );

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

darkModeButton.addEventListener("click", function() {

        // Add/remove dark mode
        document.body.classList.toggle("dark-mode");

        // Change button text
        if (document.body.classList.contains("dark-mode")
        ) {

            darkModeButton.textContent = "Light Mode";

        } else {

            darkModeButton.textContent = "Dark Mode";

        }


        // Save selected mode
        saveGame();

    }
);

// ---------------------------------
// PRESTIGE SYSTEM
// ---------------------------------

prestigeButton.addEventListener("click", function() {

    if (cookies >= 100) {

        // Increase Prestige Level
        prestigeLevel =
            prestigeLevel + 1;


        // Every Prestige Level gives 10% bonus
        prestigeBonus =
            prestigeLevel * 0.10;


        // Reset current cookies
        cookies = 0;


        // Reset all production units
        productionUnits.forEach(function(unit) {

            // Reset owned amount
            unit.amount = 0;

            // Reset price to original price
            unit.price =
                unit.startPrice;

            // Remove production upgrade multiplier
            unit.multiplier = 1;

            // Update owned amount on screen
            unit.display.textContent =
                unit.amount;

            // Update price on screen
            unit.priceDisplay.textContent =
                unit.price;
        });


        // Reset all upgrades
        upgrades.forEach(function(upgrade) {

            upgrade.purchased = false;

            upgrade.button.disabled = false;
        });


        // Update Prestige Level on screen
        prestigeLevelDisplay.textContent =
            prestigeLevel;


        // Update cookie counter
        cookieDisplay.textContent =
            cookies;


        // Update CPS
        updateCPS();


        // IMPORTANT:
        // Save AFTER resetting everything
        saveGame();

    } else {

        // Show error message
            messageBox.textContent = "You don't have enough cookies!";
    }
}); 



