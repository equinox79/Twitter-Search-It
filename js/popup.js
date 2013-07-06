/*
 *
 *  Twitter Search It / popup.js
 *
 */

window.onload = function(){
  chrome.tabs.getSelected(null, function(tab) {

    // Add Tweet Button
    var twbtn = document.getElementById('twbtn');
    twbtn.appendChild(function(){
      var elm = document.createElement("a");
      elm.setAttribute("href",       "https://twitter.com/share");
      elm.setAttribute("class",      "twitter-share-button");
      elm.setAttribute("data-count", "horizontal");
      elm.setAttribute("data-url",   tab.url);
      elm.setAttribute("data-text",  tab.title);
      elm.setAttribute("data-lang",  "ja");
      elm.setAttribute("target", "_new");
      elm.innerHTML = 'Tweet';
      return elm;
    }());
    twbtn.appendChild(function(){
      var scr = document.createElement("script");
      scr.setAttribute("type", "text/javascript");
      scr.setAttribute("charset", "utf-8");
      scr.setAttribute("src",  "https://platform.twitter.com/widgets.js");
      return scr;
    }());

    // Add Feed Reader Button
    var cmdlist = document.getElementById('cmdlist'); 
    var service = [
        {
            name : 'Twitterで検索',
            icon : 'https://twitter.com/favicon.ico',
            url  : 'https://twitter.com/search/realtime?q=' + encodeURIComponent(tab.url)
        },    
        {
            name : 'Topsyで検索',
            icon : 'http://topsy.com/favicon.ico',
            url  : "http://topsy.com/" + tab.url.replace(/^[a-z]{3,}:\/\//, '')
        }
    ];

    for(var i=0; i<service.length; i++){
        cmdlist.appendChild(function(){

            var list = document.createElement("li");
            list.setAttribute("class", 'services');

            var elm = document.createElement("a");
            elm.setAttribute("href",   service[i].url);
            elm.setAttribute("target", '_new');
            elm.setAttribute("class", 'services');

            var srvicon = document.createElement("img");
            srvicon.setAttribute('src', service[i].icon);

            var desc = document.createElement("span");
            desc.setAttribute('style', 'font-size:95%;');
            desc.appendChild( document.createTextNode(service[i].name) );

            elm.appendChild( srvicon );
            elm.appendChild( desc );

            list.appendChild( elm );

            return list;
        }());
    }
  });
};
