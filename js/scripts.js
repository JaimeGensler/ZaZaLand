$(document).ready(function() {
  $("form#custom-za").submit(function(event) {
    event.preventDefault();

    let userProteins = [];
    let userVeggies = [];
    let userOthers = [];

    $("input:checkbox[name=proteins]:checked").each(function() {
      const protein = $(this).val();
      userProteins.push(protein);
    });
    $("input:checkbox[name=proteins]:checked").each(function() {
      const veggie = $(this).val();
      userVeggies.push(veggie);
    });
    $("input:checkbox[name=proteins]:checked").each(function() {
      const other = $(this).val();
      userOthers.push(other);
    });

    console.log(userProteins, userVeggies, userOthers);
  });
});
