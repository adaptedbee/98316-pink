(function() {
    var time = document.querySelector(".storyform__pm-number--time");
    var timeminus = document.querySelector("#time>.storyform__pm-number-button--minus");
    var timeplus = document.querySelector("#time>.storyform__pm-number-button--plus");

    // var timeValue = Number(time.value);

    timeminus.addEventListener("click", function() {
      // event.preventDefault();
      if (Number(time.value) > 0){
        time.value=Number(time.value)-1;
      }
    });

    timeplus.addEventListener("click", function() {
      // event.preventDefault();
      if (Number(time.value)<365){
        time.value=Number(time.value)+1;
      }
    });

    var companions = document.querySelector(".storyform__pm-number--companions");
    var compminus = document.querySelector("#companions>.storyform__pm-number-button--minus");
    var compplus = document.querySelector("#companions>.storyform__pm-number-button--plus");

    compminus.addEventListener("click", function() {
      // event.preventDefault();
      if (parseInt(companions.value,10) > 0){
        companions.value=(parseInt(companions.value,10)-1)+" чел";
      }
    });

    compplus.addEventListener("click", function() {
      // event.preventDefault();
      if (parseInt(companions.value,10) < 10){
        companions.value=(parseInt(companions.value,10)+1)+" чел";
      }
    });


})();