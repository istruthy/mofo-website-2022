// Open dialoge module
var email = "";
$(document).ready(function() {
  $("#dialog-message").dialog({
    autoOpen: false,
    width: 500,
    modal: true,
    dialogClass: 'ui-dialog-osx',
    buttons: {
      "Accept": function() {
        window.location.href = "mailto:" + email;
        $(this).dialog("close");
      },
      "Reject": function() {
        $(this).dialog("close");
      }
    }
  });
});

function openDialog(emailAddress) {
  $("#dialog-message").dialog("open");
  email = emailAddress;

    // Fixes "[MFL-157] - Email disclaimer modal is not responsive"
  (function($, viewport) {
    // The condition viewport.is('<md') will return true regardless of the active bootstrap breakpoint
    //if(viewport.is('<md')) {
      $("#dialog-message").parent()
        //.css("width", "auto")
        //.css("padding-right", "0px")
        //.css("padding-left", "0px")
        .addClass("col-sm-12")
        .addClass("col-xs-12");
    //}
  })(jQuery, ResponsiveBootstrapToolkit);
  // END OF - Fixes "[MFL-157] - Email disclaimer modal is not responsive"

}
// added functionality for reset button
$(".reset-form").click(function() {
  $('form select').prop('selectedIndex', 0);
  $("input[type=text], textarea").val("");
});

// Fixes [MFL-126] - Some email intercepts not working
$(document).ready(function() {
  $(document).on("click", 'a[href^="mailto:"]', function(event) {
    if ($(this).attr("href").indexOf("@mofo.com") !== -1) {
      event.preventDefault();
      openDialog($(this).attr("href").substr(7));
    }
  });
});

// Added a function for generating the PDF
function getPDF(link) {
  var newURL = link.replace(".html", ".pdf");
  link = newURL;

  var passedData = window.location.href;
  if (passedData.indexOf("?") >= 0) {
    passedData = passedData.substring(passedData.indexOf("?") + 1);
    if (passedData.indexOf("#") >= 0) {
      passedData = passedData.substring(0, passedData.indexOf("#"));
    }
  } else {
    passedData = "";
  }

  // Build new query string with new page number
  if (passedData != "") {
    var params = passedData.split("&");
    passedData = "";
    for (var i = 0; i < params.length; i++) {
      var elements = params[i].split("=");
      if (elements[0] != "page" && elements[0] != "debug") {
        passedData += (passedData == "" ? "" : "&") + elements[0] + "=" + elements[1];
      }
    }
  }
  // adding hte data-attributes as a query string.
  $.each($("#pdf-link").data(), function(i, v) {
    if (v != "") {
      passedData += (passedData == "" ? "" : "&") + i + "=" + v;
    }
  });
  window.open(link + '?' + passedData + "#zoom=100", '_blank');
};
// Translation (German) functionality
function switchContent(language) {
	var germanContentList = '';
	var englishContenttList = '';
	var chineseContentList = '';
	var spanishContentList = '';
	var portugueseContentList = '';
  if (language == "german") {
	//document.getElementById("english-link").classList.remove("not-active");
	document.getElementById("german-link").classList.add("not-active");
	document.getElementById("english-link").classList.remove("not-active");

    germanContentList = document.getElementsByClassName('germanContent');
	for (var i = 0; i < germanContentList.length; i++) {
		germanContentList[i].style.display = "block";
	}
    englishContenttList = document.getElementsByClassName('englishContent');
	for (var i = 0; i < englishContenttList.length; i++) {
		englishContenttList[i].style.display = "none";
	}
    handleToggleParagraphSection();
    var newURL = insertParam("language", "german");
    // document.getElementById('pdf-link').setAttribute("onclick", "getPDF('"+newURL+"'); return false;");
    history.pushState(null, null, newURL)
  } else if (language == "chinese") {

	document.getElementById("chinese-link").classList.add("not-active");
	document.getElementById("english-link").classList.remove("not-active");
	if(document.getElementById("portuguese-link")){
	  document.getElementById("portuguese-link").classList.remove("not-active");
	}
	
       if(document.getElementById("spanish-link")){
	  document.getElementById("spanish-link").classList.remove("not-active");
	}

    chineseContentList = document.getElementsByClassName('chineseContent');
	for (var i = 0; i < chineseContentList.length; i++) {
		chineseContentList[i].style.display = "block";
	}
    englishContenttList = document.getElementsByClassName('englishContent');
	for (var i = 0; i < englishContenttList.length; i++) {
		englishContenttList[i].style.display = "none";
	}
    portugueseContentList = document.getElementsByClassName('portugueseContent');
	for (var i = 0; i < portugueseContentList.length; i++) {
		portugueseContentList[i].style.display = "none";
	}
    spanishContentList = document.getElementsByClassName('spanishContent');
	for (var i = 0; i < spanishContentList.length; i++) {
		spanishContentList[i].style.display = "none";
	}	
    handleToggleParagraphSection();
    var newURL = insertParam("language", "chinese");
    // document.getElementById('pdf-link').setAttribute("onclick", "getPDF('"+newURL+"'); return false;");
    history.pushState(null, null, newURL);
  } else if (language == "spanish") {

	document.getElementById("spanish-link").classList.add("not-active");
	document.getElementById("english-link").classList.remove("not-active");
        document.getElementById("portuguese-link").classList.remove("not-active");
        
        if(document.getElementById("chinese-link")){
	  document.getElementById("chinese-link").classList.remove("not-active");
	} 
        
    spanishContentList = document.getElementsByClassName('spanishContent');
	for (var i = 0; i < spanishContentList.length; i++) {
		spanishContentList[i].style.display = "block";
	}
    portugueseContentList = document.getElementsByClassName('portugueseContent');
	for (var i = 0; i < portugueseContentList.length; i++) {
		portugueseContentList[i].style.display = "none";
	}	
    englishContenttList = document.getElementsByClassName('englishContent');
	for (var i = 0; i < englishContenttList.length; i++) {
		englishContenttList[i].style.display = "none";
	}
    chineseContentList = document.getElementsByClassName('chineseContent');
	for (var i = 0; i < chineseContentList.length; i++) {
		chineseContentList[i].style.display = "none";
	}
    handleToggleParagraphSection();
    var newURL = insertParam("language", "spanish");
    // document.getElementById('pdf-link').setAttribute("onclick", "getPDF('"+newURL+"'); return false;");
    history.pushState(null, null, newURL);
    
    } else if (language == "portuguese") {

	document.getElementById("portuguese-link").classList.add("not-active");
	document.getElementById("english-link").classList.remove("not-active");
        document.getElementById("spanish-link").classList.remove("not-active");
        
	if(document.getElementById("chinese-link")){
	  document.getElementById("chinese-link").classList.remove("not-active");
	} 
	        
    portugueseContentList = document.getElementsByClassName('portugueseContent');
	for (var i = 0; i < portugueseContentList.length; i++) {
		portugueseContentList[i].style.display = "block";
	}
    spanishContentList = document.getElementsByClassName('spanishContent');
	for (var i = 0; i < spanishContentList.length; i++) {
		spanishContentList[i].style.display = "none";
	}
    englishContenttList = document.getElementsByClassName('englishContent');
	for (var i = 0; i < englishContenttList.length; i++) {
		englishContenttList[i].style.display = "none";
	}
    chineseContentList = document.getElementsByClassName('chineseContent');
	for (var i = 0; i < chineseContentList.length; i++) {
		chineseContentList[i].style.display = "none";
	}	
    handleToggleParagraphSection();
    var newURL = insertParam("language", "portuguese");
    // document.getElementById('pdf-link').setAttribute("onclick", "getPDF('"+newURL+"'); return false;");
    history.pushState(null, null, newURL);
    
  } else if (language == "english") {
	document.getElementById("english-link").classList.add("not-active");
	
	if(document.getElementById("chinese-link")){
	  document.getElementById("chinese-link").classList.remove("not-active");
	} 
	if(document.getElementById("german-link")) {
	  document.getElementById("german-link").classList.remove("not-active");
	}
	if(document.getElementById("spanish-link")) {
	  document.getElementById("spanish-link").classList.remove("not-active");
	} 
	if(document.getElementById("portuguese-link")) {
	  document.getElementById("portuguese-link").classList.remove("not-active");
	}

    englishContenttList = document.getElementsByClassName('englishContent');
	for (var i = 0; i < englishContenttList.length; i++) {
		englishContenttList[i].style.display = "block";
	}
    germanContentList = document.getElementsByClassName('germanContent');
	for (var i = 0; i < germanContentList.length; i++) {
		germanContentList[i].style.display = "none";
	}

    chineseContentList = document.getElementsByClassName('chineseContent');
	for (var i = 0; i < chineseContentList.length; i++) {
		chineseContentList[i].style.display = "none";
	}
	
    spanishContentList = document.getElementsByClassName('spanishContent');
	for (var i = 0; i < spanishContentList.length; i++) {
		spanishContentList[i].style.display = "none";
	}
	
    portugueseContentList = document.getElementsByClassName('portugueseContent');
	for (var i = 0; i < portugueseContentList.length; i++) {
		portugueseContentList[i].style.display = "none";
	}
		
    handleToggleParagraphSection();
    if(germanContentList.length > 0) {
      var newURL = insertParam("language", "german");
    } else if (chineseContentList.length > 0) {
      var newURL = insertParam("language", "chinese");
    } else if (spanishContentList.length > 0) {
      var newURL = insertParam("language", "spanish");
    } else if (portugueseContentList.length > 0) {
      var newURL = insertParam("language", "portuguese");
    }
    // document.getElementById('pdf-link').setAttribute("onclick", "getPDF('"+newURL+"'); return false;");
    var newURL = insertParam("language", "english");
    history.pushState(null, null, newURL)
  }
}

function insertParam(key, value) {
  key = escape(key);
  value = escape(value);

  var kvp = document.location.search.substr(1).split('&');
  if (kvp == '') {
    return document.location.href + '?' + key + '=' + value;
  } else {

    var i = kvp.length;
    var x;
    while (i--) {
      x = kvp[i].split('=');

      if (x[0] == key) {
        x[1] = value;
        kvp[i] = x.join('=');
        break;
      }
    }

    if (i < 0) {
      kvp[kvp.length] = [key, value].join('=');
    }

    //this will reload the page, it's likely better to store this until finished
    //document.location.search = kvp.join('&');
    return window.location.href.split('?')[0] + "?" + kvp.join('&');
  }
}

var handleToggleParagraphSection = (function() {
  var paragraphsToLimit_Selector = "p:not(:has([data-localization-action])),ul,h1:not(.content-header),h2:not(.content-header),h3:not(.content-header),h4:not(.content-header),h5:not(.content-header)";
  var paragraphsToLimit_InBetweens_Selector = "hr";

  function getInBetweens(paragraphsToLimit) {
    var paragraphsToLimit_InBetweens =
      paragraphsToLimit
      .last()
      .prevAll(paragraphsToLimit_InBetweens_Selector);

    return paragraphsToLimit_InBetweens
      .add(paragraphsToLimit
        .last()
        .nextUntil(paragraphsToLimit_Selector, paragraphsToLimit_InBetweens_Selector));
  }

  function documentPositionComparer (a, b) {
    if (a === b) {
      return 0;
    }

    var position = a.compareDocumentPosition(b);

    if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      return -1;
    } else if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
      return 1;
    } else {
      return 0;
    }
  }

  var linkAnimating = false;
  function scrollToElement($target) {
    if (linkAnimating) {
      return;
    }

    var fixedNavHeight = 0;
    if ($('.spacer-bar-bio').length) {
      fixedNavHeight = $(window).width() > 480 ? 325 : 190;
    } else {
      fixedNavHeight = $('.sticky-hero').outerHeight() || $('.site-header').outerHeight() || 0;
      if ($('.sticky-tabs').length) {
        fixedNavHeight = fixedNavHeight + $('.sticky-tabs').outerHeight();
      }
    }

    if ($target.length) {
      var scrollPoint = $target.offset().top - fixedNavHeight;
      linkAnimating = true;
      $('body,html').animate({
        scrollTop: scrollPoint
      }, 800, 'swing', function () {
        linkAnimating = false;
      });
    }
  }

  return (function handleToggleParagraphSection() {
    var paragraphsToLimit =
      $(".toggle-paragraph:not(:has([data-localization-language]))," +
        ".toggle-paragraph [data-localization-language]:visible")
      .find(paragraphsToLimit_Selector);

    var paragraphsToLimit_InBetweens = getInBetweens(paragraphsToLimit);

    var paragraphLimit = -1;
    if ($('#paragraphLimit').length) {
      paragraphLimit = $('input#paragraphLimit').val();
      if (isNaN(parseInt(paragraphLimit, 10))) {
        paragraphLimit = -1;
      } else if (paragraphsToLimit.length <= paragraphLimit) {
        paragraphLimit = -1;
      }
    }

    var paragraphsToLimitSliced;
    var paragraphsToLimit_InBetweens_Sliced;

    // Do not hide data using "Show More/Show Less" button if URL has an anchor 
    // which would be hidden if the functionality left as is
    // [MOFO-232] - Unable to link to anchor links for anchors below "Show More" on bios/capability pages]
    if(location.hash && location.hash.length > 1) {
      var hashNormalized = location.hash.substr(1);
      var elementToScrollTo = $("#" + hashNormalized);
      if(elementToScrollTo.length == 0) {
        elementToScrollTo = $("[name='" + hashNormalized + "']");
      }
      if(elementToScrollTo.length) {
        if(paragraphsToLimit.length || paragraphsToLimit_InBetweens.length) {
          scrollToElement(elementToScrollTo);
        }
        if(paragraphLimit >= 0) {
          paragraphsToLimitSliced = paragraphsToLimit.slice(paragraphLimit);
          paragraphsToLimit_InBetweens_Sliced = getInBetweens(paragraphsToLimitSliced);
          if(paragraphsToLimitSliced.length) {
            if(documentPositionComparer(paragraphsToLimitSliced[0], elementToScrollTo[0]) <= 0) {
              return;
            }
          }
          if(paragraphsToLimit_InBetweens_Sliced.length) {
            if(documentPositionComparer(paragraphsToLimit_InBetweens_Sliced[0], elementToScrollTo[0]) <= 0) {
              return;
            }
          }  
        }
      }
    }

    paragraphsToLimit.hide();
    paragraphsToLimit_InBetweens.hide();
    //paragraphsToLimit.slice(0, (paragraphLimit < 0 ? paragraphsToLimit.length : paragraphLimit)).show();
    //$('.toggle-paragraph p:lt('+(paragraphLimit < 0 ? $('.toggle-paragraph p').length : paragraphLimit)+')').show();
    if (paragraphLimit < 0) {
      $('#showMore').hide();
      paragraphsToLimit.show();
      paragraphsToLimit_InBetweens.show();
      //$('.toggle-paragraph p:lt('+ $('.toggle-paragraph p').length + ')').show();
    } else {
      $('#showMore').text('SHOW MORE');
      $('#showMore').show();
      paragraphsToLimitSliced = paragraphsToLimit.slice(0, paragraphLimit);
      paragraphsToLimitSliced.show();
      paragraphsToLimit_InBetweens_Sliced = getInBetweens(paragraphsToLimitSliced);
      paragraphsToLimit_InBetweens_Sliced.show();
      $('#showMore').off("click");
      $('#showMore').click(function() {
        if ($('#showMore').text().toUpperCase() == 'SHOW MORE') {
          $('#showMore').text('SHOW LESS');
          paragraphsToLimit.show();
          paragraphsToLimit_InBetweens.show();
          //$('.toggle-paragraph p:lt('+$(".toggle-paragraph p").length+')').show();
        } else {
          $('#showMore').text('SHOW MORE');
          paragraphsToLimitSliced = paragraphsToLimit.slice(paragraphLimit);
          paragraphsToLimitSliced.hide();
          paragraphsToLimit_InBetweens_Sliced = getInBetweens(paragraphsToLimitSliced);
          paragraphsToLimit_InBetweens_Sliced.show();
          //$('.toggle-paragraph p').not(':lt('+paragraphLimit+')').hide();
        }
      });
    }
  });
})();

// paragraph show more function
$(document).ready(function() {
  handleToggleParagraphSection();

  /* Accordion toggle the default is shwoing the top first 10 item then if show more will show the remians */
  $('.accordion-toggle').find('ul > li:lt(10)').show();
  $('.accordion-showMore').click(function() {
    if ($(this).text().toUpperCase() == 'SHOW MORE') {
      $(this).text('SHOW LESS');
      $(this).parent('.accordion-toggle').find('ul > li:lt(' + $(this).parent('.accordion-toggle').find('ul > li').length + ')').show();
      /* $(this).parent('.accordion-toggle ul>li:lt('+$(this).parent('.accordion-toggle').find('ul > li').length+')').show(); */
    } else {
      $(this).text('SHOW MORE');
      $(this).parent('.accordion-toggle').find('ul > li').not(':lt(10)').hide();
    }

  });
});

// Handling type Ahead
$(document).ready(function() {
  $('[data-typeahead-type="people-landing"]').each(function(index, item) {
    var isLoading = false;
    var loaded = false;
    var attempts = 0;
    var maxAttempts = 3;
    var spinner = $(".lawyer-search-load");
    spinner.hide();
    function populatePeopleLandingTypeAhead() {
      if (!loaded && !isLoading) {
        isLoading = true;
        $(item).attr("disabled", true);
        spinner.show();
        jQuery.ajax({
          type: "GET",
          url: '/templates/mofo-redesign_people_search_typeahead_ajax',
          dataType: 'json',
          data: {},
          success: function(data) {
            var engine = new Bloodhound({
              datumTokenizer: function(q) {
                var tokens = [];
                for (var i = 0; i < q.tokens.length; i++) {
                  tokens = tokens.concat(datumTokens(q.tokens[i]));
                }
                return tokens;
              },
              queryTokenizer: Bloodhound.tokenizers.whitespace,
              local: data,
              limit: 10,
              sorter: function(a, b) {
                //get input text
                var inputString = $.trim($(item).val());

                //Check if Array.sort uses an unstable algorithm (e.g. Chrome browser)
                //and react accordingly. 
                var isStableSortAlgorithmUsed = (a.count == Math.min(parseInt(a.count, 10), parseInt(b.count)));

                //give position rank the highest priority
                if(a.positionrank < b.positionrank && (isStableSortAlgorithmUsed || !(a.positionrank > b.positionrank))) { return -1; }
                if(a.positionrank > b.positionrank) { return  1; }

                //then firstname
                if(a.firstname == inputString && (isStableSortAlgorithmUsed || !(b.firstname == inputString))) { return -1; }
                if(b.firstname == inputString) { return  1; }

                //then firstname case-insensitive
                if(a.firstname.toLowerCase() == inputString.toLowerCase() && (isStableSortAlgorithmUsed || !(b.firstname.toLowerCase() == inputString.toLowerCase()))) { return -1; }
                if(b.firstname.toLowerCase() == inputString.toLowerCase()) { return  1; }

                //then partial firstname
                if(a.firstname.indexOf(inputString) > -1 && (isStableSortAlgorithmUsed || !(b.firstname.indexOf(inputString) > -1))) { return -1; }
                if(b.firstname.indexOf(inputString) > -1) { return  1; }

                //then partial firstname case-insensitive
                if(a.firstname.toLowerCase().indexOf(inputString.toLowerCase()) > -1 && (isStableSortAlgorithmUsed || !(b.firstname.toLowerCase().indexOf(inputString.toLowerCase()) > -1))) { return -1; }
                if(b.firstname.toLowerCase().indexOf(inputString.toLowerCase()) > -1) { return  1; }

                //then lastname
                if(a.lastname == inputString && (isStableSortAlgorithmUsed || !(b.lastname == inputString))) { return -1; }
                if(b.lastname == inputString) { return  1; }

                //then lastname case-insensitive
                if(a.lastname.toLowerCase() == inputString.toLowerCase() && (isStableSortAlgorithmUsed || !(b.lastname.toLowerCase() == inputString.toLowerCase()))) { return -1; }
                if(b.lastname.toLowerCase() == inputString.toLowerCase()) { return  1; }

                //then partial lastname
                if(a.lastname.indexOf(inputString) > -1 && (isStableSortAlgorithmUsed || !(b.lastname.indexOf(inputString) > -1))) { return -1; }
                if(b.lastname.indexOf(inputString) > -1) { return  1; }

                //then partial lastname case-insensitive
                if(a.lastname.toLowerCase().indexOf(inputString.toLowerCase()) > -1 && (isStableSortAlgorithmUsed || !(b.lastname.toLowerCase().indexOf(inputString.toLowerCase()) > -1))) { return -1; }
                if(b.lastname.toLowerCase().indexOf(inputString.toLowerCase()) > -1) { return  1; }

                //then middlename
                if(a.middlename == inputString && (isStableSortAlgorithmUsed || !(b.middlename == inputString))) { return -1; }
                if(b.middlename == inputString) { return  1; }

                //then middlename case-insensitive
                if(a.middlename.toLowerCase() == inputString.toLowerCase() && (isStableSortAlgorithmUsed || !(b.middlename.toLowerCase() == inputString.toLowerCase()))) { return -1; }
                if(b.middlename.toLowerCase() == inputString.toLowerCase()) { return  1; }

                //then partial middlename
                if(a.middlename.indexOf(inputString) > -1 && (isStableSortAlgorithmUsed || !(b.middlename.indexOf(inputString) > -1))) { return -1; }
                if(b.middlename.indexOf(inputString) > -1) { return  1; }

                //then partial middlename case-insensitive
                if(a.middlename.toLowerCase().indexOf(inputString.toLowerCase()) > -1 && (isStableSortAlgorithmUsed || !(b.middlename.toLowerCase().indexOf(inputString.toLowerCase()) > -1))) { return -1; }
                if(b.middlename.toLowerCase().indexOf(inputString.toLowerCase()) > -1) { return  1; }

                //then value (fullname)
                if(a.value == inputString && (isStableSortAlgorithmUsed || !(b.value == inputString))) { return -1; }
                if(b.value == inputString) { return  1; }

                //then value (fullname) case-insensitive
                if(a.value.toLowerCase() == inputString.toLowerCase() && (isStableSortAlgorithmUsed || !(b.value.toLowerCase() == inputString.toLowerCase()))) { return -1; }
                if(b.value.toLowerCase() == inputString.toLowerCase()) { return  1; }

                //then partial value (fullname)
                if(a.value.indexOf(inputString) > -1 && (isStableSortAlgorithmUsed || !(b.value.indexOf(inputString) > -1))) { return -1; }
                if(b.value.indexOf(inputString) > -1) { return  1; }

                //then partial value (fullname) case-insensitive
                if(a.value.toLowerCase().indexOf(inputString.toLowerCase()) > -1 && (isStableSortAlgorithmUsed || !(b.value.toLowerCase().indexOf(inputString.toLowerCase()) > -1))) { return -1; }
                if(b.value.toLowerCase().indexOf(inputString.toLowerCase()) > -1) { return  1; }

                //then metadata
                if(a.metadata == inputString && (isStableSortAlgorithmUsed || !(b.metadata == inputString))) { return -1; }
                if(b.metadata == inputString) { return  1; }

                //then metadata case-insensitive
                if(a.metadata.toLowerCase() == inputString.toLowerCase() && (isStableSortAlgorithmUsed || !(b.metadata.toLowerCase() == inputString.toLowerCase()))) { return -1; }
                if(b.metadata.toLowerCase() == inputString.toLowerCase()) { return  1; }

                //then partial metadata
                if(a.metadata.indexOf(inputString) > -1 && (isStableSortAlgorithmUsed || !(b.metadata.indexOf(inputString) > -1))) { return -1; }
                if(b.metadata.indexOf(inputString) > -1) { return  1; }

                //then partial metadata case-insensitive
                if(a.metadata.toLowerCase().indexOf(inputString.toLowerCase()) > -1 && (isStableSortAlgorithmUsed || !(b.metadata.toLowerCase().indexOf(inputString.toLowerCase()) > -1))) { return -1; }
                if(b.metadata.toLowerCase().indexOf(inputString.toLowerCase()) > -1) { return  1; }

                //then metadata2
                if(a.metadata2 == inputString && (isStableSortAlgorithmUsed || !(b.metadata2 == inputString))) { return -1; }
                if(b.metadata2 == inputString) { return  1; }

                //then metadata2 case-insensitive
                if(a.metadata2.toLowerCase() == inputString.toLowerCase() && (isStableSortAlgorithmUsed || !(b.metadata2.toLowerCase() == inputString.toLowerCase()))) { return -1; }
                if(b.metadata2.toLowerCase() == inputString.toLowerCase()) { return  1; }

                //then partial metadata2
                if(a.metadata2.indexOf(inputString) > -1 && (isStableSortAlgorithmUsed || !(b.metadata2.indexOf(inputString) > -1))) { return -1; }
                if(b.metadata2.indexOf(inputString) > -1) { return  1; }

                //then partial metadata2 case-insensitive
                if(a.metadata2.toLowerCase().indexOf(inputString.toLowerCase()) > -1 && (isStableSortAlgorithmUsed || !(b.metadata2.toLowerCase().indexOf(inputString.toLowerCase()) > -1))) { return -1; }
                if(b.metadata2.toLowerCase().indexOf(inputString.toLowerCase()) > -1) { return  1; }

                return (parseInt(a.count, 10) - parseInt(b.count, 10));
              }
            });
            engine.initialize();
            spinner.hide();
            $(item).attr("disabled", false);
            loaded = true;
            $(item).typeahead({
                hint: false,
                highlight: true,
                minLength: 2
              }, {
                name: 'engine',
                displayKey: 'value',
                source: engine.ttAdapter(),
                templates: {
                  suggestion: function(data) {
                    return '<div class="tt-suggestion tt-selectable"><a href="' + data.url + '" class="result" >' + data.value + '</a></div>';
                  }
                },
                limit: 10
              }
            );
          },
          error: function(jqXHR, textStatus, errorThrown) {
            spinner.hide();
            $(item).attr("disabled", false);
            loaded = false;
          }
        });
        // Prevent infinite attempts to get the typeahead list
        if(++attempts == maxAttempts) {
          spinner.hide();
          $(item).attr("disabled", false);
          loaded = true;
        }
        isLoading = false;
      }
    }

    populatePeopleLandingTypeAhead();
    $(item).click(function() {
      populatePeopleLandingTypeAhead();
    });
  });

  var charMap = {
    "á": "a",
    "à": "a",
    "â": "a",
    'ä': 'a',
    "é": "e",
    "è": "e",
    "ê": "e",
    "ë": "e",
    "ï": "i",
    "î": "i",
    "í": 'i',
    "ô": "o",
    "ö": "o",
    "ó": 'o',
    "û": "u",
    "ù": "u",
    'ü': 'u',
    "ú": 'u',
    'ß': 's',
    'ç': 'c',
    'ñ': 'n',
    'Ł': 'l',
  };
  var datumTokens = function(q) {
    var tokens = [q];
    jQuery.each(charMap, function(character, value) {
      if (q.indexOf(character) > -1) {
        tokens = tokens.concat(q.replace(character, value));
      }
    });
    return tokens;
  };
});

// Handling "form" attributes
$(document).ready(function() {
  var formFieldsPerForm = {};
  var hashKeyPrefix = "form_";
  $("[name][name!=''][form][form!='']").each(function(fieldIndex, field) {
    var formId = $(field).attr("form");
    var hashKey = hashKeyPrefix + formId;
    if(!formFieldsPerForm.hasOwnProperty(hashKey)) {
      formFieldsPerForm[hashKey] = [];
    }
    formFieldsPerForm[hashKey].push(field);
  });

  for(var hashKey in formFieldsPerForm) {
    if(formFieldsPerForm.hasOwnProperty(hashKey)) {
      var formId = hashKey.substr(hashKeyPrefix.length);
      var form = $("#" + formId);
      $(form).submit(function(e) {
        $(formFieldsPerForm[hashKey]).each(function(fieldIndex, field) {
          var fieldForm = $(field).closest("form");
          var isFieldChildOfForm = (fieldForm) && (fieldForm.length > 0) && (fieldForm[0] == $(this)[0]);
          if(isFieldChildOfForm) {
            $(field).removeAttr("form");
          } else {
            $(field).removeAttr("form");

            var allAttributes = [
              { 'name': 'type',  'value': 'hidden' },
              { 'name': 'name',  'value': $(field).attr("name") },
              { 'name': 'value', 'value': $(field).val() }
            ];
            var dataAttributes = $(field.attributes).filter(function(attrIndex, attr) {
              // this.attributes is not a plain object, but an array
              // of attribute nodes, which contain both the name and value
              if(attr.specified) {
                if (attr.name.indexOf("data-") == 0) {
                  return true;
                }
              }
              return false;
            }).map(function(attrIndex, attr) {
              return ({ 'name': attr.name, 'value': attr.value });
            }).toArray();

            allAttributes = allAttributes.concat(dataAttributes);

            var newInput = $('<input />');

            $(allAttributes).each(function(attrIndex, attr) {
              newInput.attr(attr.name, attr.value);
            });

            newInput.appendTo(form);
          }
        });
        return true;
      });
    }
  }
});

// Handle people landing advanced search
(function() {
  $(document).ready(function() {
    var container = $(".toggleable-filters-container");
    var advancedSearchInputs = container.find(":input,select");
    var parentSection = container.closest("section");
    var form = parentSection.find("form");
    var allSearchInputs = parentSection.find(':input[name][name!=""], select[name][name!=""]');
    var resetableSearchInputs = allSearchInputs.filter(function(index, input) { return $(input).is("[data-originalvalue]"); });
    var noSubmitAttrName = "nosubmit";

    $(form).on("submit", function(e) {
      allSearchInputs = parentSection.find(':input[name][name!=""], select[name][name!=""]');
      allSearchInputs.filter(function(index, input) {
        return $(input).is("[data-" + noSubmitAttrName + "='true']");
      }).each(function(index, input) {
        // Prevent fields with attribute [data-nosubmit='true'] from contributing to
        // the form submission data by removing the name attribute.
        $(input).attr("old-name", $(input).attr("name")).removeAttr("name");
      });
    });

    $("#peopleLandingAdvancedSearchButton").on("click", function(e) {
      container.toggleClass("hidden");
      var isAdvancedSearchHidden = container.is(".hidden");

      /*
      advancedSearchInputs
        .data(noSubmitAttrName, isAdvancedSearchHidden)
        .attr("data-" + noSubmitAttrName, isAdvancedSearchHidden.toString());
      */

      $(e.target)
        .text(isAdvancedSearchHidden ? "More Search Options" : "Fewer Search Options");
    });

    $("#peopleLandingSearchButton").on("click", function(e) {
      $(form).submit();
    });

    $("#peopleLandingResetButton").on("click", function(e) {
      resetableSearchInputs.each(function(index, input) { $(input).val($(input).attr("data-originalvalue")); });
    });
  });
})();

// Handle bookmarkable anchors
(function() {
  var hashArray = location.hash
  .split("#")
  .filter(function(index, item) { return item != ""; });

  var allBookmarkableTabs = $("[data-bookmarkable-type='tab-link']");
  var allBookmarkableLinks = $("[data-bookmarkable-type='normal-link']");

  function filterBookmarkables(bIndex, bItem) {
    var bookmarkableFound = false;
    $(hashArray).each(function(hIndex, hItem) {
      if($(bItem).is("#" + hItem) || $(bItem).is("[href='#" + hItem + "']")) {
        bookmarkableFound = true;
      }
    });
    return bookmarkableFound;
  }

  var bookmarkableTabs = allBookmarkableTabs.filter(filterBookmarkables);
  var bookmarkableLinks = allBookmarkableLinks.filter(filterBookmarkables);

  function scrollBookmarkablesIntoView(bookmarkableTabs, bookmarkableLinks) {
    //bookmarkableTabs.click();
    bookmarkableTabs.addClass("active");
    bookmarkableLinks.click();
    bookmarkableLinks.closest(".mofo-vr-tabs").find(".mofo-tab-content").each(function(index, item) {
      item.scrollIntoView(false);
    });
  }

  // Prevent scrolling due to the hash part of the URL as we are
  // going to perform custom scroll
  if (hashArray.length > 0 && ((bookmarkableTabs.length + bookmarkableLinks.length) > 0)) {
    if(bookmarkableLinks.length == 0) {
      bookmarkableLinks = $("#" + bookmarkableTabs.eq(0).attr("href").substr(1)).find("[data-bookmarkable-type='normal-link']").eq(0);
    }

    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1);

    // When the document is ready, perform the custom scroll
    $(function() {
      scrollBookmarkablesIntoView(bookmarkableTabs, bookmarkableLinks);
    });
  }

  // Handle Offices Landing / Detail Page Views
  function updateBookmarkableLocation(activeLocation, activeOffice) {
    if(!(activeLocation && activeLocation.length)) {
      activeLocation = $('.tab-slide a[href*="#"].active');
    }

    if(!(activeOffice && activeOffice.length)) {
      activeOffice = $('.mofo-vr-tabs .mofo-tab-link.active a');
      if(!activeOffice.length) {
        activeOffice = $('.mofo-vr-tabs .mofo-tab-link a').first();
      }
    }

    if(activeLocation.length && activeOffice.length) {
      history.replaceState(({
          "location": activeLocation.attr("href"),
          "office": activeOffice.attr("id")
        })
        , activeLocation.text().trim() + " -> " + activeOffice.text().trim()
        , activeLocation.attr("href") + "#" + activeOffice.attr("id")
      );
    }
  }

  $(function() {
    if(window["officesPageView"] == "Detail Page") {
      // Remove all custom clicks from offices links as we want to use them as normal links
      $('.mofo-vr-tabs .mofo-tab-link').off('click');
      scrollBookmarkablesIntoView($('.tab-slide a[href*="#"].active'), $('.mofo-vr-tabs .mofo-tab-link.active a'));
    } else if(window["officesPageView"] == "Landing Page") {
      //updateBookmarkableLocation();
      $('.mofo-vr-tabs .mofo-tab-link').on('click', function(e) {
        updateBookmarkableLocation($('.tab-slide a[href="#' + $(e.target).closest("section").attr("id") + '"]'), $(e.target));
      });
    }
  });
})();

// Handle offices maps
(function() {
  function loadOfficeMap() {
    var officesMapsContainers1 =
      $('.mofo-vr-tabs .mofo-tab-link.active')
        .closest('.mofo-vr-tabs')
        .find('.mofo-tab-content');

    var officesMapsContainers2 = $(".mofo-vr-tabs .mofo-tab-link.active").find(".tab-pane");
        
    function initializeGoogleMap(mapContainerIndex, mapContainer) {
      var mapParams = $(mapContainer).find(".map-params");
      if(mapParams.length) {
        //calculate lat, long
        var latlong = mapParams.find(".latlong").val();
        var officeName = mapParams.find(".officeName").val();
        var street = mapParams.find(".street").val();
        var city = mapParams.find(".city").val();
        var state = mapParams.find(".state").val();
        var postalCode = mapParams.find(".postalCode").val();
        var lattitude = 0;
        var longitude = 0;
        var geocoder = new google.maps.Geocoder();
        var googleAddress;

        var latlongArray = latlong.split(',');
        if (latlongArray.length == 2) {
          lattitude = parseFloat(latlongArray[0]);
          longitude = parseFloat(latlongArray[1]);
        }

        var latlng = new google.maps.LatLng(lattitude, longitude);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            googleAddress = results[0].formatted_address.replace("'","");
          } else {
              googleAddress = street + ",+" + city + ",+" + state;
          }
        });

        var mapDiv = $(mapContainer).find('.map-embeds')[0];
        var mapOptions = {
          center: new google.maps.LatLng(lattitude, longitude),
          zoom: 16,
          minZoom: 2,
          maxZoom: 20,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: true,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP
          }
        };

        var map = new google.maps.Map(mapDiv, mapOptions);
        infowindow = new google.maps.InfoWindow();
        createOfficeMarker();

        $(mapContainer).find(".btn-map-search").off("click").click(function () {
          Search();
        });
        ////MAP SEARCH

        var map;
        var infowindow;

        function Search() {
          var office = new google.maps.LatLng(lattitude, longitude);

          map = new google.maps.Map($(mapContainer).find('.map-embeds')[0], {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: office,
            zoom: 15
          });

          createOfficeMarker();
          var request = {
            location: office,
            radius: 500,
            query: $(mapContainer).find(".txt-map-search").val()
          };

          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.textSearch(request, callback);
        }

        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }

        function createOfficeMarker() {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lattitude, longitude),
            map: map,
            title: officeName,
            zIndex: 1,
            icon: '//www.google.com/mapfiles/gadget/arrowSmall80.png'
          });

          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(buildInfoWindow());
            infowindow.open(map, this);
          });
        }

        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });

          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
        }

        function buildInfoWindow() {
          var content = officeName + "<br />" + street + "<br />" + city + ", " + state + " " + postalCode
          content += "<br />Get directions: <a href='https://www.google.com/maps?source=uds&daddr=" + googleAddress + "&iwstate1=dir:to'>To here</a>"
          content += " - <a href='https://www.google.com/maps?source=uds&saddr=" + street + ",+" + city + ",+" + state + "+%" + lattitude + "," + longitude + "&iwstate1=dir:from'>From here</a>"
          return content;
        }

        //google.maps.event.addDomListener(window, 'load', initialize);
      }
    }

    officesMapsContainers2.each(initializeGoogleMap);
    setTimeout(function() {
    officesMapsContainers1.each(initializeGoogleMap);
    }, 2000);
  }

  $(function() {
    if(window["officesPageView"] == "Detail Page") {
      loadOfficeMap();
    } else if(window["officesPageView"] == "Landing Page") {
      loadOfficeMap();
      $('.mofo-vr-tabs .mofo-tab-link').on('click', function(e) {
        loadOfficeMap();
      });
    }
  });
})();

// Handle custom anchors (footnotes)
(function() {
  var linkAnimating = false;

  /** Smooth Scroll Anchor Links */
  $('section#insights').add("section#overview").on('click', 'a[href^="#"]', function (e) {
    if (linkAnimating) {
      e.preventDefault();
      return;
    }

    var targetArray = e.currentTarget.href.split('#');
    if (!!targetArray[1]) {
      var fixedNavHeight = 0;
      if ($('.spacer-bar-bio').length) {
        fixedNavHeight = $(window).width() > 480 ? 325 : 190;
      } else {
        fixedNavHeight = $('.sticky-hero').outerHeight() || $('.site-header').outerHeight() || 0;
        if ($('.sticky-tabs').length) {
          fixedNavHeight = fixedNavHeight + $('.sticky-tabs').outerHeight();
        }
      }

      var $target = $('#' + targetArray[1]);
      if(!$target.length) {
        $target = $('[name="' + targetArray[1] + '"]');
      }
      if ($target.length) {
        if(!$target.is(":visible")) {
          $("#showMore").click();
        }

        var scrollPoint = $target.offset().top - fixedNavHeight;
        linkAnimating = true;
        $('body,html').animate({
          scrollTop: scrollPoint
        }, 800, 'swing', function () {
          linkAnimating = false;
        });
      }
    }
  });
})();

// Handle lazy loading
(function() {
  var ajaxXHR = null;
  var ajaxInProgress = false;

  var fragmentNameRegEx = (/fragment-(\d+)/i);

  var params;
  var fragments;
  var url;
  var containers;
  var estimatedPages;

  function processParamServiceURL(name, value) {
    if(name == "url") {
      url = value;
      return true;
    }
    return false;
  }

  function processParamFragment(name, value, mode, update) {
    if(fragmentNameRegEx.exec(name)) {
      if(fragments.hasOwnProperty(name) && !update) {
        console.warn("[LazyLoading][Warning]: The selector '" + fragments[name].selector + "' has been already passed to the fragment '" + name + "' so the additional selector '" + value + "' can not be passed to the same fragment.");
      } else {
        fragments[name] = ({ "selector": value, "mode": mode });
      }
      return true;
    }
    return false;
  }

  function processParamContainers(name, value) {
    if(name == "containers") {
      containers = value;
      return true;
    }
    return false;
  }

  function processParamEstimatedPages(name, value) {
    if(name == "estimatedpages") {
      estimatedPages = value;
      return true;
    }
    return false;
  }

  window.processLazyLoading = function processLazyLoading(container, overrideParamCallback, preprocessNewDataCallback, onAfterAjaxSuccessCallback, force) {
    function cleanUpAll(ajaxSuccess, forceAbort) {
      function cleanUp() {
        $(container).find(".section-auction-block").find(".lazy-loading-inline-wait-message").remove();

        if(ajaxXHR && forceAbort) {
          ajaxXHR.abort();
        }
        ajaxXHR = null;
        ajaxInProgress = false;

        if(ajaxSuccess) {
          if(onAfterAjaxSuccessCallback) {
            onAfterAjaxSuccessCallback();
          }
        }
      }

      if($(container).data("blockUI.isBlocked") == 1) {
        $(container).unblock({
          onUnblock: cleanUp
        });
      } else {
        cleanUp();
      }
    }

    if(ajaxInProgress && force) {
      cleanUpAll(false, true);
    }

    if(!ajaxInProgress) {
      params = ({});
      fragments = ({});
      url = window.location.href;

      $(container).find(".lazy-loading-params").find("input:hidden").each(function(index, item) {
        var name = $(item).attr("name");
        var value = $(item).attr("value");
        // The supported values for [data-mode] currently are:
        //   1- "replace" which replaces the whole fragment with the new one
        //   2- "append-children" which append the children of the new fragment to the old one
        //   3- "replace-append-children" which prepend the children of the old fragment to the new one
        // The default is [data-mode="replace"] and does not need to be specified explicitly
        var mode = $(item).attr("data-mode");
        if(!mode || !mode.trim()) {
          mode = "replace";
        }

        if(!processParamServiceURL(name, value) && !processParamFragment(name, value, mode, false) && !processParamContainers(name, value) && !processParamEstimatedPages(name, value)) {
          if(params.hasOwnProperty(name)) {
            console.warn("[LazyLoading][Warning]: The value '" + params[name] + "' has been already passed to the parameter '" + name + "' so the additional value '" + value + "' can not be passed to the same parameter.");
          } else {
            if(overrideParamCallback) {
              params[name] = overrideParamCallback(name, value);
            } else {
              params[name] = value;
            }
          }
        }
      });

      var lazyLoadingWaitMessage = $(container).find('.lazy-loading-wait-message');
      var lazyLoadingInlineWaitMessage = $(container).find('.lazy-loading-inline-wait-message');
      ajaxXHR = $.ajax({
        async : true,
        beforeSend: function(jqXHR, settings) {
          ajaxInProgress = true;

          if(lazyLoadingInlineWaitMessage.length) {
            $(lazyLoadingInlineWaitMessage[0].outerHTML).prependTo($(container).find(".section-auction-block")).show();
          }

          if(lazyLoadingWaitMessage.length) {
            $(container).block({ message: lazyLoadingWaitMessage });
          }
        },
        cache: true,
        context: container,
        data: params,
        dataType: "html",
        method: "GET",
        type: "GET",
        url: url
      }).done(function(data, textStatus, jqXHR) {
        var frags = [];
        for(var frag in fragments) {
          if(fragments.hasOwnProperty(frag)) {
            frags.push(frag);
          }
        }
        frags = frags.sort(function(x, y) {
          if(x > y) return 1;
          if(x < y) return -1;
          return 0;
        });

        var newData = $("<div>" + data + "</div>");

        if(preprocessNewDataCallback) {
          newData = preprocessNewDataCallback(newData);
        }

        // Update fragments meta data
        newData.find(".lazy-loading-params").find("input:hidden").each(function(index, item) {
          var name = $(item).attr("name");
          var value = $(item).attr("value");
          // The supported values for [data-mode] currently are:
          //   1- "replace" which replaces the whole fragment with the new one
          //   2- "append-children" which append the children of the new fragment to the old one
          //   3- "replace-append-children" which prepend the children of the old fragment to the new one
          // The default is [data-mode="replace"] and does not need to be specified explicitly
          var mode = $(item).attr("data-mode");
          if(!mode || !mode.trim()) {
            mode = "replace";
          }
          processParamFragment(name, value, mode, true);
        });

        $(frags).each(function(indexFrag, frag) {
          var fragment = fragments[frag];
          var newDataFragment = newData.find(fragment.selector);
          if(newDataFragment.length) {
            $(container).add(containers).find(fragment.selector).each(function(index, item) {
              switch (fragment.mode) {
                case "replace":
                  $(item).replaceWith(newDataFragment.eq(index)[0].outerHTML);
                  break;
                case "append-children":
                  $(item).html($(item).html() + newDataFragment.eq(index).html());
                  break;
                case "replace-append-children":
                  var newDataFragmentClone = $(newDataFragment.eq(index)[0].outerHTML);
                  newDataFragmentClone.html($(item).html() + newDataFragment.eq(index).html());
                  $(item).replaceWith(newDataFragmentClone);
                  break;
                default:
                  $(item).replaceWith(newDataFragment.eq(index));
                  break;
              }
            });
          } else {
            $(container).find(fragment.selector).remove();
          }
        });
      }).fail(function(jqXHR, textStatus, errorThrown) {

      }).always(function(data_jqXHR, textStatus, jqXHR_errorThrown) {
        cleanUpAll(textStatus == "success");
      });
    }
  }

  $(document).ready(function() {
    function overrideParamCallback(name, value) {
      if(name == "page") {
        var newValue = parseInt(value, 10);
        if(!newValue) {
          return 1;
        }
        return newValue + 1;
      }
      return value;
    }

    $(".btn-see-more-lazy").closest(".lazy-loading-container").on("click", ".btn-see-more-lazy", function(e) {
      var container = e.delegateTarget;
      $(".btn-see-more-lazy").add(".btn-see-all-lazy").hide();
      processLazyLoading(container, overrideParamCallback);
    });

    var isSeeAllLazyInitialized = false;
    $(".btn-see-all-lazy").closest(".lazy-loading-container").on("click", ".btn-see-all-lazy", function(e) {
      var btnSeeAllLazy = e.currentTarget;
      var container = e.delegateTarget;

      var force = $(btnSeeAllLazy).data("force");
      $(btnSeeAllLazy).removeAttr("data-force").removeData("force");

      var grabMoreData = false;
      var isLastLazyLoadingDone = false;

      function preprocessNewDataCallback(newData) {
        var btnSeeMoreLazy = newData.find(".btn-see-more-lazy");
        var btnSeeAllLazy = newData.find(".btn-see-all-lazy");
        grabMoreData = false;

        if((btnSeeMoreLazy && btnSeeMoreLazy.length && btnSeeMoreLazy.css("display") != "none") ||
            (btnSeeAllLazy && btnSeeAllLazy.length && btnSeeAllLazy.css("display") != "none")) {

          var parents = btnSeeMoreLazy.hide().replaceAll($(".btn-see-more-lazy", newData)).parents();
          parents = parents.eq(parents.length - 1);
          parents = btnSeeAllLazy.hide().replaceAll($(".btn-see-all-lazy", newData)).parents();
          parents = parents.eq(parents.length - 1);
          newData = parents;

          grabMoreData = true;
        }

        return newData;
      }

      function onAfterAjaxSuccessCallback() {
        if(grabMoreData) {
          //processLazyLoading(container, overrideParamCallback, preprocessNewDataCallback, onAfterAjaxSuccessCallback);
          isLastLazyLoadingDone = true;
        }
      }

      function debounce(func, wait, immediate) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      }

      if(!isSeeAllLazyInitialized) {
        isSeeAllLazyInitialized = true;
        $(window).on("scroll", debounce(function(ev) {
          var scrollTopThreshold = $(document).height() - $(window).height() - $(".section-auction-block").outerHeight() / 2 - $(".footer").parent().outerHeight();
          var scrollingElement = document.scrollingElement || document.documentElement;
          if(scrollingElement.scrollTop >= scrollTopThreshold) {
            if(grabMoreData && isLastLazyLoadingDone) {
              isLastLazyLoadingDone = false;
              processLazyLoading(container, overrideParamCallback, preprocessNewDataCallback, onAfterAjaxSuccessCallback);
            }
          }
        }, 500));
      }

      $(".btn-see-more-lazy").add(".btn-see-all-lazy").hide();
      processLazyLoading(container, overrideParamCallback, preprocessNewDataCallback, onAfterAjaxSuccessCallback, force);
    });

    $(".btn-see-all-lazy").click();
  });
})();

// Handle insights landing page filters
(function() {
  $(document).ready(function() {
    $(".filter-section").on("click", ".btn-filter-clear", function(e) {
      // Use the following commented line instead of the one following it if you decided to reset all filters instead of the visible set of filters only
      //$(e.delegateTarget).find(":checkbox[name][name!='']").each(function(index, item) {
      $(e.target).closest("form").find("[name][name!='']").each(function(index, item) {
        if($(item).is(":checkbox")) {
          var value = false;
          if($(item).is("[data-originalvalue]")) {
            value = ($(item).attr("data-originalvalue").toLowerCase() == "true");
          }
          $(item).prop("checked", value);
        } else {
          if($(item).is("[data-originalvalue]")) {
            $(item).val($(item).attr("data-originalvalue"));
          } else {
            $(item).val("");
          }
        }
      });
    });

    $(".filter-section").on("click", ".btn-filter-apply", function(e) {
      var data = ({});
      var namePrefix = "param_";

      $(e.delegateTarget).find("[name][name!='']").each(function(index, item) {
        var key = namePrefix + $(item).attr("name");
        if(!data.hasOwnProperty(key)) {
          data[key] = [];
        }
        if(!$(item).is(":checkbox") || $(item).prop("checked")) {
          data[key].push($(item).val());
        }
      });

      var paramsContainer = $(".lazy-loading-params");
      paramsContainer.find("[name='page']").val("");
      paramsContainer.find("[name='pagesize']").val("");
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var name = key.substr(namePrefix.length);
          var value = data[key].join(",");
          paramsContainer.find("[name='"+ name +"']").val(value);
        }
      }
      var closeButtonToClick = $(e.currentTarget).closest(".filters-wrap").find(".btn-close:visible");
      if(!closeButtonToClick.length) {
        closeButtonToClick = $(".filter-mb-toggle").find(".btn-close:visible:has(.icon.mofo-icon-close)");
      }
      closeButtonToClick.click();
      $(".btn-see-all-lazy")
        .attr("data-force", "true")
        .data("force", true)
        .click();
      $('html, body').animate({ scrollTop: 0 }, 'slow', 'swing');
      //processLazyLoading(paramsContainer.closest(".lazy-loading-container")[0], null, null, function() {
      //  $(".btn-see-all-lazy").click();
      //}, true);
    });
  });
})();

// Handle filters badges
(function() {
  function removeFilterBadge(link) {
    var parent = $(link).closest("[data-relatedfilter][data-relatedfilter!='']");
    var container = $(link).closest(".filter-badges");

    var checkbox = $("#" + parent.attr("data-relatedfilter"));
    var value = false;
    if(checkbox.is("[data-originalvalue]")) {
      value = (checkbox.attr("data-originalvalue").toLowerCase() == "true");
    }
    checkbox.prop("checked", value);
    parent.parent().remove();
    // If only "Clear All" link remains, hide the filter badges component
    if(container.find("li").length == 1) {
      container.hide();
    }
  }

  $(document).ready(function() {
    $(".filter-badges").closest(".section-prime").on("click", ".filter-badges .badge.badge-filter[data-relatedfilter][data-relatedfilter!=''] a", function(e) {
      removeFilterBadge(e.currentTarget);
      $(".filter-section").find(".btn-filter-apply").click();
    });

    $(".filter-badges").closest(".section-prime").on("click", ".filter-badges .badge-filter-clearall", function(e) {
      var filterBadgesContainer = $(e.target).closest(".filter-badges");
      filterBadgesContainer.find(".badge.badge-filter[data-relatedfilter][data-relatedfilter!=''] a").each(function(index, item) {
        removeFilterBadge(item);
      });
      $(".filter-section").find(".btn-filter-apply").click();
    });
  });
})();

/* add the privacy popup*/
$(document).ready(function () {
  var popupKey = 'popupAccepted';

  $('.acceptbtn').click(function (event) {
    event.preventDefault();
    $('.privacyPU').css('display', 'none');
    $(".pagetext").slideToggle();
    $.cookie(popupKey, 'true');
  });

  $('.rejectBtn').click(function() {
    location.href = '/';
  });

  if (String($.cookie(popupKey)) != "true") {
    $(".pagetext").hide();
    $(".privacyPU").show();
  }
});


// Sajari Search Initializations - DOM Mutations Observer
/**
* Even though it is not recommended to use "Mutation Events" nor "Mutation Observer"
* in general, we have to do so here to handle sajari search initialization properly.
*
* Here, we opted to use "Mutation Observer" as it is the modern approach and most performant,
* but we fallback to "Mutation Events" if needed as it is more adopted.
*
* In all cases, our approach here should be performant regardless of the method
* because we are going to make the usage of these APIs at minimum and disconnet from
* them as soon as we are done.
*/
(function() {
  var navSearchBoxSelector = "#nav-search-box,#nav-search-box-1";
  if($(navSearchBoxSelector).length == 0) {
    return;
  }

  function isMutationEventSupported() {
    return ("MutationEvent" in window);
  }
  function isMutationObserverSupported() {
    return ("MutationObserver" in window);
  }
  function copyClasses(source, destination) {
    $(destination).addClass($(source).attr("class"));
  }
  function copyAttributes(source, destination) {
    var excludedAttributes = ["class", "style"];
    $($(source).prop("attributes"))
      .filter(function(index, attribute) {
        return excludedAttributes.indexOf(attribute.name) == -1;
      }).each(function(index, attribute) {
        $(destination).attr(attribute.name, attribute.value);
    });
  }
  function copyEvents(source, destination) {
    // Get source events
    var events = $._data($(source)[0], "events");

    // Iterate through all event types
    $.each(events, function(eventType, eventArray) {
      // Iterate through every bound handler
      $.each(eventArray, function(index, event) {
        // Take event namespaces into account
        var eventToBind = event.namespace.length > 0
          ? (event.type + '.' + event.namespace)
          : (event.type);

        // Bind event
        $(destination).bind(eventToBind, event.data, event.handler);
      });
    });
  }

  function initialize_SjSearchBarInputCommon(input) {
    var destination = $(input);
    var searchForm = destination.closest(".search-form");
    var source = searchForm.find(".search-input");
    var sjSearchHolderOuter = destination.closest(".sj-search-holder-outer");

    /**
    * Change handlers for "focus" and "blur" events from the search input field
    * as they are going to be replaced with Sajari's input field which has different
    * DOM hierarchy (e.g. it is not a direct child of the form which prevents the resizing on focus)
    */
    source
      .off("focus").focus(function () {
        searchForm.addClass("active");
      })
      .off("blur").blur(function () {
        if(searchForm.find(".sj-suggestions").length == 0) {
          searchForm.removeClass("active");
        }
      });

    copyClasses(source, destination);
    copyAttributes(source, destination);
    copyEvents(source, destination);
  }

  if(isMutationObserverSupported()) {
    // Modern approach first!

    function mutationObserverCallBack(mutations, observer) {
      $.each(mutations, function (index, mutation) {
        var target = mutation.target;

        switch (mutation.type) {
          case 'childList':
            initialize_SjSearchBarInputCommon($(mutation.addedNodes).find(".sj-search-bar-input-common"));
            observer.disconnect();
            break;
        }
      });
    }

    $(navSearchBoxSelector).each(function(navSearchBoxIndex, navSearchBox) {
      var mutationObserver = new MutationObserver(mutationObserverCallBack);
      mutationObserver.observe(navSearchBox, {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false,
      });
    });

  } else if(isMutationEventSupported()) {
    // Fallback to the old, more supported one!

    // The callback MUST not be an anonymous function as we need a reference
    // to it to remove the event listener when we are done; as anonymous functions
    // are just different function instances!
    function navSearchBox_DOMNodeInserted(ev) {
      var insertedNode = ev.target;

      initialize_SjSearchBarInputCommon($(insertedNode).find(".sj-search-bar-input-common"));

      // Preserve the performance by removing unneeded mutation event
      $(insertedNode)
        .closest(navSearchBoxSelector)[0]
        .removeEventListener("DOMNodeInserted", navSearchBox_DOMNodeInserted, false);
    }

    $(navSearchBoxSelector).each(function(navSearchBoxIndex, navSearchBox) {
      navSearchBox.addEventListener("DOMNodeInserted", navSearchBox_DOMNodeInserted, false);
    });

  } else {
    var message = "[Sajari Search][Warning]: This browser does not support MutationObserver nor MutationEvent APIs!";
    if(console.warn) {
      console.warn(message);
    } else {
      console.log(message);
    }
  }
})();


// Handle sajari search
(function() {
  // added to place the onclick function on the button
  $('.sj-search-button').click(function() {
    location.href = '//www.mofo.com/search?q=' + $('.sj-search-bar-input-common').val();
  });
})();

// Handle insights responsive filters
(function() {
  $(document).ready(function() {
    $(".filter-mb-toggle .btn-close").on("click", function(ev) {
      //if($('.filter-mb-toggle-content').is(":visible")) {
        // We have to check for height too here because of the smoothing animation that might have been started
        var isFilterContentVisible = $('.filter-mb-toggle-content').is(":visible") && $('.filter-mb-toggle-content').height() > 5;
        $(ev.currentTarget)
          .closest(".filter-mb-toggle")
          .find(".btn-close")
          .find(".icon")
          .toggleClass("mofo-icon-close", !isFilterContentVisible)
          .toggleClass("mofo-icon-filter", isFilterContentVisible);
      //}
    });
  });
})();


$(document).ready(function() {
  $(document).on("click", ".open-profile", function () {
    $.ajax({
      type: "GET",
      url: '/templates/people-widget.json?bioType='+$(this).data('biocategory')+'&id='+$(this).data('id'),
      dataType: 'json',
      success: function(data) {
        htmlData = '<div class="row"><div class="col-md-12">' + data.biography +'</div></div><div class="row"><div class="col-md-6"><p>' + data.viewProfile + '<br />' + data.email +'<br />' + data.officeLine + '<br />' + data.vcard + '</p></div><div class="col-md-6"><strong>Primary Practices</strong>' + data.practices + '</div></div>';
        $("#myModal").find('.modal-body').html(htmlData);
        $('#myModal').modal('show')
      }
    });
  return false;
  });
});


$(document).ready(function() {
  $(document).on("click", ".open-location", function () {
    $.ajax({
      type: "GET",
      url: '/templates/careers-widget.json?id='+$(this).data('id'),
      dataType: 'json',
      success: function(data) {
        htmlData = '<div class="row"><div id="career-content" class="col-md-12">' + data.careerContent + '</div></div>'; 
        $("#myModal").find('.modal-body').html(htmlData);
        $('#myModal').modal('show')
      }
    });
  return false;
  });
});

// Fix "[MOFO-143] - Issue when subnavigation elements exceed length of available space"
/*
(function() {
  $(document).ready(function() {
    // Force showing only 1 slide at a time for the change focus on scroll to work properly
    $(".tab-slide").slick("slickSetOption", "slidesToShow", 1, true);

    // Force showing the slick carousel arrows, only if there are enough slides
    var totalSlickSlideWidth = $(".tab-slide")
      .find(".slick-slide")
      .toArray()
      .reduce(function(total, currentValue, currentIndex, arr) {
        return total + $(currentValue).width();
      }, 0);

    var slickListWidth = $(".tab-slide").find(".slick-list").width();

    if(totalSlickSlideWidth > slickListWidth) {
      $(".tab-slide").slick("slickSetOption", "arrows", true, true);
    }
  });
})();
*/

// Fix both "[MOFO-143] - Issue when subnavigation elements exceed length of available space"
// and "[MOFO-157] - Issue with subnavigation elements being hidden from view after scrolling through them"
/*(function() {
  // Compensate a little bit for the fact that we are using "slidesToShow = 1"
  // by preventing the slick carousel from going next when it is not needed
  function canSlickGoNext($slick) {
    var $slickList = $slick.find(".slick-list");
    var $slickSlides = $slick.find(".slick-slide");
    var slickCurrentSlide = $slick.slick("slickCurrentSlide");
    var slickSlidesCount = $slickSlides.length;

    var totalWidths = 0;
    $slickSlides.filter(function(index, item) {
      return slickCurrentSlide <= index && index <= (slickSlidesCount-1);
    }).each(function(index, item) {
      totalWidths += $(item).outerWidth(true);
    });

    return (totalWidths > $slickList.width());
  }

  $(document).ready(function() {
    // We will fix these issues by providing our own carats (arrows)

    // First, we need to make sure that the builtin arrows are not showing in any case
    $(".tab-slide").slick("slickSetOption", "arrows", false, true);

    // Second, unfortunately we must set the number of slides to show to 1
    // Otherwise, we will not be able to scroll when the slides are few but with
    // lengthy lables
    $(".tab-slide").slick("slickSetOption", "slidesToShow", 1, true);

    // Third, create the previous arrow
    var currentSlide = $(".tab-slide").slick("slickCurrentSlide");
    var slidesCount = $(".tab-slide").find(".slick-slide").length;

    var $prevArrow = $("<button></button>")
      .addClass("slick-prev slick-arrow" + ((currentSlide == 0) ? " slick-disabled" : ""))
      .attr("aria-label", "Previous")
      .attr("type", "button")
      .text("Previous")
      .attr("aria-disabled", (currentSlide == 0) ? "true" : "false")
      .on("click", function(ev) {
        $(".tab-slide").slick('slickPrev');
      });

    var canGoNext = canSlickGoNext($(".tab-slide"));
    var $nextArrow = $("<button></button>")
      //.addClass("slick-next slick-arrow" + ((currentSlide == (slidesCount - 1)) ? " slick-disabled" : ""))
      .addClass("slick-next slick-arrow" + ((!canGoNext) ? " slick-disabled" : ""))
      .attr("aria-label", "Next")
      .attr("type", "button")
      .text("Next")
      //.attr("aria-disabled", (currentSlide == (slidesCount - 1)) ? "true" : "false")
      .attr("aria-disabled", (!canGoNext) ? "true" : "false")
      .on("click", function(ev) {
        $(".tab-slide").slick('slickNext');
      });

    $(".tab-slide")
      .prepend($prevArrow)
      .append($nextArrow)
      .on('afterChange', function(event, slick, currentSlide){
        $prevArrow
          .toggleClass("slick-disabled", currentSlide == 0)
          .attr("aria-disabled", (currentSlide == 0) ? "true" : "false");

        var canGoNext = canSlickGoNext($(".tab-slide"));
        $nextArrow
          //.toggleClass("slick-disabled", (currentSlide == (slidesCount - 1)))
          .toggleClass("slick-disabled", (!canGoNext))
          //.attr("aria-disabled", (currentSlide == (slidesCount - 1)) ? "true" : "false");
          .attr("aria-disabled", (!canGoNext) ? "true" : "false");
      });
  });
})();
*/


// VR Tabs with videos
(function() {
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  function displayVrTabs(vrTabsYT) {
    var $allLinks = $(vrTabsYT).find('.mofo-tab-link-yt'),
    $activeLink = $(vrTabsYT).find('.mofo-tab-link-yt.active'),
    $pane = $activeLink.find('.tab-pane-yt'),
    $tabContent = $(vrTabsYT).find('.mofo-tab-content-yt');

    if($allLinks.length) {
      if($tabContent.is(':visible')) {
        $tabContent.hide();
        $activeLink.each(function(alIndex, alItem) {
          $($(alItem).data("content")).show();
        });
      } else {
        $pane.slideDown();
        $activeLink.siblings().find('.tab-pane-yt').slideUp();
      }
    }
  }

  $(document).ready(function() {
    $(".mofo-vr-tabs-yt").each(function(index, vrTabsYT) {
      var links = $(vrTabsYT).find(".mofo-vr-tab-list-yt .mofo-tab-link-yt");
      var contents = $(vrTabsYT).find(".mofo-tab-content-yt");

      if(links.length != contents.length) {
        var errorMessage = "[WARNING]: The number of VR Tabs does not match the number of the corresponding contents!";
        if(console.warn) {
          console.warn(errorMessage);
        } else {
          console.log(errorMessage);
        }
      }

      displayVrTabs(vrTabsYT);
      var debouncedVrTabsResize = debounce(function() { displayVrTabs(vrTabsYT); }, 500);
      window.addEventListener('resize', debouncedVrTabsResize);

      $(vrTabsYT).on("click", ".mofo-vr-tab-list-yt .mofo-tab-link-yt", function(ev) {
        var $currentLink = $(this);
        $currentLink.siblings().removeClass('active');
        $currentLink.addClass('active');
        displayVrTabs(vrTabsYT);
      });
    });
  });
})();

// Handle Modal Form
(function() {
  $(document).ready(function() {
    $(document).on('click', '.js-toggle-form-modal-custom', function(e) {
      e.preventDefault();
      var $modal = $($(this).attr("data-form"));
      if (!$modal.length) return;
      if($modal.hasClass('active')) {
        $modal.removeClass('active');
      } else {
        $modal.addClass('active');
      }
      // Make sure to trigger resize events (both native and jQuery) to force some
      // components to refresh to the new state (e.g. "VR Tabs" component)
      //$(window).trigger('resize');
      //window.dispatchEvent(new Event('resize'));
    });
    function onFullModalFormSubmit(e) {
      var $form = $(this).closest("form");
      var $modal = $form.closest(".full-modal");
      var $fields = $form.find(":input");
      var $requiredFields = $fields.filter("[required]");
      var $errorMessages = $form.find(".alert");
      var $recaptchaField = $form.find(":input").filter("[name='cmfarecaptcha']");

      // Reset error messages as we are going to perform another round of validations
      $errorMessages.hide();

      // Populate recaptcha field
      $recaptchaField.val(grecaptcha.getResponse());

      // Validated fields
      var validform = true;
      $requiredFields.each(function(index, field) {
        if(!$.trim($(field).val())) {
          validform = false;
          $("#" + $modal.attr("id") + "-" + $(field).attr("name") + "_error_message").show();
        }
      });

      if(!validform) {
        e.preventDefault();
        return false;
      }

      if($form.attr("data-useajax") && $form.attr("data-useajax").toLowerCase() == "true") {
        $.post($form.attr("action"), $form.serialize())
          .done(function(data, textStatus, jqXHR) {
            $form.closest(".full-modal").removeClass("active");
          });
        e.preventDefault();
        return false;
      }
    }
    $(document).on("submit", ".full-modal form", onFullModalFormSubmit);
    $(document).on("click touchstart", ".full-modal form :submit", onFullModalFormSubmit);
  });
})();

// This is used to exclude hte triggerd attached the custom toggle functionlity that Vitaliy implemented in his script file and
// this mean the default toggle fn will be applied from Lib.js file.
var filter   = Array.prototype.filter,
    triggers = filter.call( triggers, function( node ) {
        return !node.querySelectorAll('[class="excludeBootstrapAction"]');
    });


// Global Functions used across all pages
// Fire the date picker
  $(function() {
	$(".datepicker").datepicker();
  });

// End of Global Functions
