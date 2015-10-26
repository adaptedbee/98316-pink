(function() {

  if (!("FormData" in window)) {
    return;
  }

  var form = document.querySelector(".storyform");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(form);
    request(data, function(response) {
      console.log(response);
    });
  });

  // function request(data, fn) {... }
  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();
    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });
    xhr.send(data);
  }

  // if ("FileReader" in window) {... }
  if ("FileReader" in window) {
    var area = document.querySelector(".photo-previews");
    form.querySelector(".storyform__uploadbutton").addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
    });
    // function preview(file) { ... }
    function preview(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();
        reader.addEventListener("load", function(event) {
          var img = document.createElement("img");
          img.src = event.target.result;
          img.alt = file.name;
          area.appendChild(img);
        });
        reader.readAsDataURL(file);
      }
    }
  }

})();