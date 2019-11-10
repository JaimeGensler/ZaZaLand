//Full Order Logic
function Order() {
  this.pizzas = [];
  this.totalCount = 0;
  this.price = 0;
}
Order.prototype.setPrice = function() {
  let runningTotal = 0;
  this.pizzas.forEach(function(pizza) {
    runningTotal += pizza.price;
  });

  runningTotal *= ((this.totalCount > 7) ? 1.18 : 1.00); //automatic 18% gratuity when ordering 8 or more pizzas

  this.price = runningTotal;
  return runningTotal.toFixed(2);
}
Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
  this.totalCount += pizza.count;
  this.setPrice();
}

//Individual Pizza Logic
function CustomPizza(size, cheese, sauce, proteins, veggies, others, count) {
  this.size = size;
  this.cheese = cheese;
  this.sauce = sauce;
  this.proteins = proteins;
  this.veggies = veggies;
  this.others = others;
  this.count = count;
  this.price = 0;
}
CustomPizza.prototype.setPrice = function() {
  let runningTotal = Math.floor((this.size/2) + 1); //cheese selection does not factor in to price

  switch (this.sauce) {
    case "Rustic Marinara Sauce":
      runningTotal += 2.00;
      break;
    case "Olive Oil":
      runningTotal += 0.50;
      break;
    case "House-made Pesto Sauce":
      runningTotal += 1.50;
      break;
    case "Mushroom Cream Sauce":
      runningTotal += 2.00;
      break;
    case "NO Sauce":
      runningTotal += 0;
      break;
  }

  runningTotal += (this.proteins.length * 0.75);
  runningTotal += (this.veggies.length * 0.25);
  runningTotal += (this.others.length * 0.15);

  if (this.proteins.includes("Prosciutto")) runningTotal += 0.75;
  if (this.proteins.includes("Egg")) runningTotal -= 0.25;
  if (this.veggies.includes("Kimchi")) runningTotal += 0.50;

  const discount = ((this.count > 1) ? 0.9 : 1); //multiple pizzas of the same kind are discounted by 10%
  runningTotal *= (this.count * discount);

  this.price = runningTotal;
  return runningTotal.toFixed(2);
}


//UI Logic
$(document).ready(function() {
  let fullOrder = new Order();

  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();

    const userSize = parseInt($("select#size").val());
    const userCheese = $("select#cheese").val();
    const userSauce = $("select#sauce").val();
    let userProteins = [];
      $("input:checkbox[name=proteins]:checked").each(function() {
        const protein = $(this).val();
        userProteins.push(protein);
      });
    let userVeggies = [];
      $("input:checkbox[name=veggies]:checked").each(function() {
        const veggie = $(this).val();
        userVeggies.push(veggie);
      });
    let userOthers = [];
      $("input:checkbox[name=others]:checked").each(function() {
        const other = $(this).val();
        userOthers.push(other);
      });
    const userCount = parseInt($("input#count").val())

    const newPizza = new CustomPizza(userSize, userCheese, userSauce, userProteins, userVeggies, userOthers, userCount);
    newPizza.setPrice();
    fullOrder.addPizza(newPizza);

    $("div#new-pizza").hide();
  });

  //open/close modal
  $("p#create-pizza").click(function() {
    // $("#audio").get(0).play();
    $("div#new-pizza").css("display", "flex");
  });
  $("div#exit").click(function() {
    $("div#new-pizza").hide();
  });

  //checkbox display
  $("input[type='checkbox']").on("change", function() {
    $(this).parent().toggleClass("selected");
  });
});
