//Business Logic
function Order() {
  this.pizzas = [];
  this.price = 0;
}
Order.prototype.setPrice = function() {
  let runningTotal = 0;
  this.pizzas.forEach(function(pizza) {
    runningTotal += pizza.price;
  });
  runningTotal *= ((this.pizzas.length > 7) 1.18 : 1.00); //automatic 18% gratuity when ordering 8 or more pizzas

  runningTotal.toFixed(2);
  this.price = runningTotal;
  return runningTotal;
}
Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
  this.setPrice();
}

function CustomPizza(dough, sauce, proteins, veggies, others, size, count) {
  this.dough = dough;
  this.sauce = sauce;
  this.proteins = proteins;
  this.veggies = veggies;
  this.others = others;
  this.size = size;
  this.count = count;
  this.price = 0;
}
CustomPizza.prototype.setPrice = function() {
  let runningTotal = 0; //dough and cheese selection do not factor in to price
  switch (this.sauce) {
    case "Rustic Marinara Sauce":
      runningTotal += 7.00;
      break;
    case "Olive Oil":
      runningTotal += 5.50;
      break;
    case "House-made Pesto Sauce":
      runningTotal += 6.50;
      break;
    case "Mushroom Cream Sauce":
      runningTotal += 7.00;
      break;
    case "NO Sauce":
      runningTotal += 4.50;
      break;
  }
  this.proteins.forEach(function(protein) {
    runningTotal += 1.00;
    if (protein === "Prosciutto") runningTotal += 1.00; //Prosciutto totals to $2.00
    if (protein === "Egg") runningTotal -= 0.25; //Egg totals to $0.75
  });
  this.veggies.forEach(function(veggie) {
    runningTotal += 0.25;
    if (veggie === "Kimchi") runningTotal += 0.50; //Kimchi totals to $0.75
  });
  this.others.forEach(function(other) {
    runningTotal += 0.15;
  });
  runningTotal *= (this.size/10);
  runningTotal *= (this.count * ((this.count > 1) ? 0.9 : 1)); //multiple Za's of the same kind are discounted.

  runningTotal.toFixed(2);
  this.price = runningTotal;
  return runningTotal;
}

//UI Logic
let fullOrder = new Order();
$(document).ready(function() {
  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();

    let userProteins = [];
    let userVeggies = [];
    let userOthers = [];

    $("input:checkbox[name=proteins]:checked").each(function() {
      const protein = $(this).val();
      userProteins.push(protein);
    });
    $("input:checkbox[name=veggies]:checked").each(function() {
      const veggie = $(this).val();
      userVeggies.push(veggie);
    });
    $("input:checkbox[name=others]:checked").each(function() {
      const other = $(this).val();
      userOthers.push(other);
    });

    let newPizza = new CustomPizza(false, "Olive Oil", userProteins, userVeggies, userOthers, 8, 1);
    newPizza.setPrice();
    fullOrder.addPizza(newPizza);
  });
});
