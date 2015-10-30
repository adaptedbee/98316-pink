(function() {

  if (!("FormData" in window) || !("FileReader" in window)) {
    return;
  }

  var form = document.querySelector(".storyform");
  var area = form.querySelector(".photo-previews__list");

  var template = document.querySelector("#image-template").innerHTML;
  var queue = [];

  var popupsuccess = document.querySelector(".popup--success");
  var popupclose = document.querySelector(".popup__close");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(form);
    queue.forEach(function(element) {
      data.append("images", element.file);
    });
    request(data, function(response) {
      console.log(response);
    });
    popupsuccess.classList.add("popup--active");
  });

  popupclose.addEventListener("click", function(event) {
      // event.preventDefault();
      popup.classList.remove("modal-content-show");
  });

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

  form.querySelector(".storyform__uploadbutton-label").addEventListener("click", function() {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
      preview(files[i]);
    }
  });

  function preview(file) {
    var reader = new FileReader();
    reader.addEventListener("load", function(event) {
      var html = Mustache.render(template, {
        "image": event.target.result,
        "name": file.name,
        "id": queue.length+1
      });
      var li = document.createElement("li");
      li.classList.add("photo-previews__item");
      li.innerHTML = html;
      area.appendChild(li);
      li.querySelector(".photo-preview__close").addEventListener("click",
      function(event) {
        event.preventDefault();
        removePreview(li);
      });
      queue.push({
        "file": file,
        "li": li
      });

    });
    reader.readAsDataURL(file);
  }

  function removePreview(li) {
    queue = queue.filter(function(element) {
      return element.li != li;
    });
    li.parentNode.removeChild(li);
  }

})();