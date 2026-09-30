
 // ---------------------------------
 // GENERAL GAME VARIABLES
 // ---------------------------------

 let cookies = 0;


 // ---------------------------------
 // HTML ELEMENTS
 // ---------------------------------

 const cookieDisplay =
     document.getElementById("cookie-count");

 const cookieButton =
     document.getElementById("cookie-button");

 const cpsDisplay =
     document.getElementById("cps");

const goldenCookie = document.getElementById("golden-cookies");



 // ---------------------------------
 // CLICK ON COOKIE
 // ---------------------------------

 cookieButton.addEventListener("click", function() {

     cookies = cookies + 1;

     cookieDisplay.textContent = cookies;

 });


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

         this.price = price;

         this.production = production;

         this.amount = 0;

         this.multiplier = 1;

         this.display =
             document.getElementById(displayId);

         this.button =
             document.getElementById(buttonId);

         this.priceDisplay =
             document.getElementById(priceId);

         this.button.addEventListener("click", () => {

             this.buy();

         });

     }


     // ---------------------------------
     // BUY PRODUCTION UNIT
     // ---------------------------------

     buy() {

         if (cookies >= this.price) {

             // Pay cookies

             cookies = cookies - this.price;

             // Increase owned amount

             this.amount = this.amount + 1;

             // Increase price by 15%

             this.price =
                 Math.ceil(this.price * 1.15);

             // Update cookie counter

             cookieDisplay.textContent = cookies;

             // Update owned amount

             this.display.textContent = this.amount;

             // Update new price

             this.priceDisplay.textContent = this.price;

             updateCPS();

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

 const cursor = new ProductionUnit(
     "Cursor",
     10,
     1,
     "owned",
     "buy",
     "price"
 );


 const grandma = new ProductionUnit(
     "Grandma",
     50,
     5,
     "grandma-owned",
     "buy-grandma",
     "grandma-price"
 );


 const farm = new ProductionUnit(
     "Farm",
     100,
     10,
     "farm-owned",
     "buy-farm",
     "farm-price"
 );


 const factory = new ProductionUnit(
     "Factory",
     500,
     50,
     "factory-owned",
     "buy-factory",
     "factory-price"
 );


 const mine = new ProductionUnit(
     "Mine",
     1000,
     100,
     "mine-owned",
     "buy-mine",
     "mine-price"
 );


 const bank = new ProductionUnit(
     "Bank",
     1500,
     150,
     "bank-owned",
     "buy-bank",
     "bank-price"
 );


 const temple = new ProductionUnit(
     "Temple",
     2000,
     200,
     "temple-owned",
     "buy-temple",
     "temple-price"
 );


 const tower = new ProductionUnit(
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

         // Upgrade has not been purchased

         this.purchased = false;

         // Find HTML button

         this.button =
             document.getElementById(buttonId);

         // Listen for click

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

             cookies = cookies - this.price;

             // Mark upgrade as purchased

             this.purchased = true;

             // Update cookie counter

             cookieDisplay.textContent = cookies;

             // Disable button

             this.button.disabled = true;

             // Purchase successful

             return true;

         }

         // Purchase failed

         return false;

     }

 }


 // ---------------------------------
 // PRODUCTION UPGRADE CLASS
 // INHERITS FROM UPGRADE
 // ---------------------------------

 class ProductionUpgrade extends Upgrade {

     constructor(
         price,
         buttonId,
         productionUnit,
         multiplier
     ) {

         // Call parent constructor

         super(
             price,
             buttonId
         );

         // Specific properties

         this.productionUnit =
             productionUnit;

         this.multiplier =
             multiplier;

     }


     // ---------------------------------
     // OVERRIDE BUY METHOD
     // ---------------------------------

     buy() {

         // Use general buy method

         const success = super.buy();

         // Apply effect if purchase succeeded

      if (success) {

        this.productionUnit.multiplier =
        this.productionUnit.multiplier
        * this.multiplier;

        updateCPS();

}

     }

 }


 // ---------------------------------
 // CREATE UPGRADE OBJECTS
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
 // CPS Calculator
 // ---------------------------------

         function calculateCPS() {
            return (
                cursor.getProductionPerSecond() +
                grandma.getProductionPerSecond() +
                farm.getProductionPerSecond() +
                factory.getProductionPerSecond() +
                mine.getProductionPerSecond() +
                bank.getProductionPerSecond() +
                temple.getProductionPerSecond() +   
                tower.getProductionPerSecond() 
                
            );
         }


         function updateCPS() {
             cpsDisplay.textContent = calculateCPS();
         }


 // ---------------------------------
 // AUTOMATIC PRODUCTION
 // ---------------------------------

 setInterval(function() {

     cookies =
         cookies
         + calculateCPS();

     cookieDisplay.textContent = cookies;
     updateCPS();

 }, 1000);


 // ---------------------------------
 // Golden Cookies 

 function showGoldenCookie() {
     goldenCookie.style.display = "block";
 }
function hideGoldenCookie() {
     goldenCookie.style.display = "none";
}

 setInterval(function() {

   showGoldenCookie();

   setTimeout(function() {

     hideGoldenCookie();

   }, 5000);

 }, 15000);

 goldenCookie.addEventListener("click", function() {
     cookies = cookies + 100;
     cookieDisplay.textContent = cookies;
     hideGoldenCookie();
 })


