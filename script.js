var data_links;

window.addEventListener('DOMContentLoaded', init);

function init() {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", showInfo);
  oReq.open("GET", "data/links.json");
  oReq.overrideMimeType("application/json");
  oReq.send();
}

function showInfo() {
  console.log(JSON.parse(this.responseText));
  data_links = JSON.parse(this.responseText);

  var nested = d3.nest()
    .key(function(d) {
      return d.Function;
    })
    .key(function(d) {
      return d.Featured;
    })
    .entries(data_links);

  console.log(nested);

  nested.forEach((function, i) => {
    item.forEach((featured, j) => {
      
    });

  });


  setTimeout(function() {
    // for(i=0; i<data_links.length; i++) {
    for (i = 0; i < 5; i++) {
      (function(i) {
        setTimeout(function() {
          gettingData(i);
        }, 100 * i);
      })(i);
    }
  });
}

function gettingData(i) {
  var link = data_links[data_links.length - (i + 1)]['FULL_ONS_URL'];
  makeCorsRequest(link);
}

// Make the actual CORS request.
function makeCorsRequest(link) {
  // This is a sample server that supports CORS.
  var url = link + '/data';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    return;
  }
  xhr.addEventListener('load', processResponse);

  // Response handlers.
  xhr.onload = function() {
    var text = 'success';
  };

  xhr.send();
}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }

  return xhr;
}

//     // Function that will process the response from the API
var processResponse = function() {
  var data = JSON.parse(this.response);

  // place holders
  var element = document.getElementById("page");
  var container = document.createElement('div');
  container.className = 'container';

  //image
  var img = document.createElement('img');
  var divImage = document.createElement("div");
  var imageLink = document.createElement('a');
  divImage.className = 'thumbnail';
  if (data.imageUri === '') {
    img.src = 'generic.png';
  } else if (data.imageUri === undefined) {
    img.src = 'generic.png';
  } else {
    img.src = 'https://www.ons.gov.uk/resource?uri=' + data.imageUri;

  }
  imageLink.appendChild(img);
  imageLink.href = 'https://www.ons.gov.uk' + data.uri;
  imageLink.target = "_blank";
  divImage.appendChild(imageLink);
  container.appendChild(divImage);
  element.appendChild(container);

  //title + link
  var divTitle = document.createElement('div');
  divTitle.className = 'title';
  var link = document.createElement('a');
  var node = document.createTextNode(data.description.title);
  var title = document.createElement('p');
  title.appendChild(node);
  link.appendChild(title);
  link.href = 'https://www.ons.gov.uk' + data.uri;
  link.target = "_blank";
  divTitle.appendChild(link);
  container.appendChild(divTitle);
  element.appendChild(container);

  // pub date
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  var divDate = document.createElement('div');
  divDate.className = 'date';
  var dateNode = document.createTextNode(new Date(data.description.releaseDate).toLocaleDateString('en-GB', options));
  var date = document.createElement('p');
  date.appendChild(dateNode);
  divDate.appendChild(date);
  container.appendChild(divDate);
  element.appendChild(container);

  // keywords
  var divKey = document.createElement('div');
  divKey.className = 'keyword';
  if (data.description.keywords && data.description.keywords.length > 1) {
    for (j = 0; j < data.description.keywords.length; j++) {
      if (data.description.keywords[j] === "") {
        continue;
      } else {
        var keyword = data.description.keywords[j] + " | ";
      }
      var keyNode = document.createTextNode(keyword);
      divKey.appendChild(keyNode);
    }
    container.appendChild(divKey);
    element.appendChild(container);
  }



}
