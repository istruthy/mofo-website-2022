var getUrlParam = function(e){var t = new RegExp("[?&]" + e.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"),a = t.exec(window.location.href);return a && a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : ""};
var setup = function(w,d,x,a,e,s,c,r){s = [];var b=function(){s.push(arguments);},q="ui";b.arr=s;w[a]=w[a]||[];w[a][q]=w[a][q]||[];w[a][q].push(b);c=d.createElement(x);c.async=1;c.src=e;r=d.getElementsByTagName(x)[0];r.parentNode.insertBefore(c,r);return b;};
if(document.getElementById("results-search-box") && document.getElementById("results-search-response")) {
  var searchInterface = setup(window, document, "script", "sajari", "https://cdn.sajari.net/js/integrations/website-search-1.3.0.js?dasdasdasdas");
  searchInterface("inline", {
    project: "1518570288423094576", // Set this to your project.
    collection: "www-mofo-com", // Set this to your collection.
    pipeline: "website",     // Set the search pipeline.
    instantPipeline: "autocomplete", // Set the instant pipeline.
    attachSearchBox: document.getElementById("results-search-box"), // DOM element to render search box.
    attachSearchResponse: document.getElementById("results-search-response"), // DOM element to render search results.
    inputPlaceholder: "Search www.mofo.com", // Placeholder text for the search box.
    inputAutoFocus: false, // Focus the input element on render.
    maxSuggestions: 10, // Maximum number of suggestions to show.
    results: {"showImages": true}, // Configure the results.
    values: {"q.override": true,"resultsPerPage": "10","q": getUrlParam("q")}, // Set default values.
    tabFilters: {defaultTab:"All",tabs:[{title:"All",filter:""},{title:"People",filter:"url~'/people/'"},{title:"Capabilities",filter:"url~'/capabilities/'"},{title:"Offices",filter:"url~'/offices/'"},{title:"Resources",filter:"(url~'.pdf' OR url~'/resources/')"}]} // User selectable filters
  });
}

var searchBox = setup(window, document, "script", "sajari", "https://cdn.sajari.net/js/integrations/website-search-1.3.0.js?dasdasdadasdassdasd");
searchBox("search-box", {
  project: "1518570288423094576", // Set this to your project.
  collection: "www-mofo-com", // Set this to your collection.
  instantPipeline: "autocomplete", // Pipeline used as you type
  // inputPlaceholder: "", // Input element placeholder
  maxSuggestions: 10, // Maximum number of suggestions to show
  attachSearchBox: document.getElementById("nav-search-box") // DOM element to attach to
});
searchBox("sub", "pipeline.search-sent", function (_, query) {
  window.location = "//www.mofo.com/search?q=" + encodeURIComponent(query.q);
});

var searchBox1 = setup(window, document, "script", "sajari", "https://cdn.sajari.net/js/integrations/website-search-1.3.0.js?dasdasdadasdassdasd123123");
searchBox1("search-box", {
  project: "1518570288423094576", // Set this to your project.
  collection: "www-mofo-com", // Set this to your collection.
  instantPipeline: "autocomplete", // Pipeline used as you type
  // inputPlaceholder: "", // Input element placeholder
  maxSuggestions: 10, // Maximum number of suggestions to show
  attachSearchBox: document.getElementById("nav-search-box-1") // DOM element to attach to
});
searchBox1("sub", "pipeline.search-sent", function (_, query) {
  window.location = "//www.mofo.com/search?q=" + encodeURIComponent(query.q);
});
