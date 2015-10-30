(function() {
    var time = document.querySelector(".storyform__pm-number--time");
    var timeminus = document.querySelector("#time>.storyform__pm-number-button--minus");
    var timeplus = document.querySelector("#time>.storyform__pm-number-button--plus");
    var startdate = document.querySelector("#startdate");
    var finishdate = document.querySelector("#finishdate");
    var newdate=moment();

    timeminus.addEventListener("click", function() {
      if (Number(time.value) > 0){
        time.value=Number(time.value)-1;
        newdate = moment(startdate.value);
        if (newdate.isValid()) {
          newdate.add(time.value, 'days');
          finishdate.value = newdate.format('YYYY-MM-DD');
        }
      }
    });

    timeplus.addEventListener("click", function() {
      if (Number(time.value)<365){
        time.value=Number(time.value)+1;
        newdate = moment(startdate.value);
        if (newdate.isValid()) {
          newdate.add(time.value, 'days');
          finishdate.value = newdate.format('YYYY-MM-DD');
        }
      }
    });

    startdate.addEventListener("change", function() {
      newdate = moment(startdate.value);
      if (newdate.isValid()) {
        newdate.add(time.value, 'days');
        finishdate.value = newdate.format('YYYY-MM-DD');
      }
    });

    var companions = document.querySelector(".storyform__pm-number--companions");
    var compminus = document.querySelector("#companions>.storyform__pm-number-button--minus");
    var compplus = document.querySelector("#companions>.storyform__pm-number-button--plus");

    var comparea = document.querySelector(".companions");

    var template = document.querySelector("#companion-template").innerHTML;
    var queue = [];

    compminus.addEventListener("click", function() {
      if (parseInt(companions.value,10) > 0){
        companions.value=(parseInt(companions.value,10)-1)+" чел";
        //console.log(queue.length+" человек");
        queue.splice(queue.length-1);
        //console.log(queue.length+" человек осталось");
        var currentcomps = comparea.querySelectorAll("#comptable");
        // var lastcompid = 0;
        // if (currentcomps%2==0) {
        //   lastcompid=currentcomps.length/2;
        // } else {
        //   lastcompid=Math.floor(currentcomps.length/2);
        // }
        //console.log(currentcomps.length+" блоков");
        //console.log(lastcompid+" блоков на самом деле");
        //var lastcomp = currentcomps[lastcompid];
        var lastcomp = currentcomps[currentcomps.length-1];
        //console.log(String(lastcomp));
        //lastcomp.parentNode.removeChild(lastcomp);
        lastcomp.parentNode.removeChild(lastcomp);
        //console.log(currentcomps.length+" блоков осталось");
        //console.log("----------------------");
      }
    });

    compplus.addEventListener("click", function() {
      if (parseInt(companions.value,10) < 10){
        companions.value=(parseInt(companions.value,10)+1)+" чел";
        addComp(parseInt(companions.value,10));
      }
    });

    function addComp(value) {
      var html = Mustache.render(template, {
        "id": value
      });
      var div = document.createElement("div");
      div.classList.add("companion-table");
      div.classList.add("clearfix");
      div.innerHTML = html;
      comparea.appendChild(div);
      div.querySelector(".companion-table__delete").addEventListener("click",
      function(event) {
        event.preventDefault();
        removeComp(div);
      });
      queue.push({
        "div": div
      });
    }

    function removeComp(div) {
      queue = queue.filter(function(element) {
        return element.div != div;
      });
      div.parentNode.removeChild(div);
    }

})();