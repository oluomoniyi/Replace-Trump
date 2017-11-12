chrome.storage.sync.get("value", function(obj) {
  if (!chrome.runtime.error) {
    obj.value = obj.value || "default";
    document.getElementById("replacedText").value = obj.value;
  }
});

function saveChanges() {
  // Get a value saved in a form.
  var theValue = document.getElementById("replacedText").value;
  // Check that there's some code there.
  if (!theValue) {
    console.log("Error: No value specified");
    return;
  }
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({ value: theValue }, function() {
    // Notify that we saved.
    //console.log("Settings saved");
  });
  document.getElementById("Message").innerHTML =
    "Congratulations, you have successfully replaced Trump on the Internet with <mark>" +
    theValue +
    "</mark>.";
}

var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    };

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  };
};

function loadQoutes() {
  var client = new HttpClient();
  client.get("https://api.tronalddump.io/random/quote", function(response) {
    // do something with response
    responseJSON = JSON.parse(response);
    document.getElementById("qoute").textContent =
      "'" + responseJSON.value + "'";
    document.getElementById("tags").textContent = responseJSON.tags;
    document.getElementById("author").textContent =
      responseJSON._embedded.author[0].name;
    document.getElementById("source").textContent =
      responseJSON._embedded.source[0].url;
    //console.log("response", responseJSON);
  });
}

loadQoutes();
document.getElementById("replacedText").addEventListener("change", saveChanges);
