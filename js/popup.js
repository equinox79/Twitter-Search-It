/*
 *
 *  Twitter Search It / popup.js
 *
 */

var Tsi = function () {
   //this.init();
};

//Tsi.prototype = 

window.onload = function(){
  chrome.tabs.getSelected(null, function(tab) {

    //add_tweet_button('twbtn');
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
            name : 'Twitter Search',
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAByklEQVQ4T2NkoBAwUqifAW7Au3fv+IWEhD6iGwgSn3/jfeKHH78EFfg57icbKy4AiYHUgdTDDfBbeXqjv4rIepACZEP0Zx6+cPE3pz4DEwsDw++fDPZ8vw88+PxTsdZGtSnFSG4e3AC7bY9OHbr93DRejm1Bv718Acj0U0/eG5gd+HKegYMbYebXjwz8XJxf9tly+xtL8O6DGzDv9ue6pIu/Gxk+vGLgf/fwfYCq2EZ+Xo6vkz6IZ6N7a505Z2WgDMcURkbGL3AD7FdfO3qQUcIKrPjvHwaGz+8gtLAURjj/DxYUBWp+A5KAG3D21bcwp6Pf5378y8iDL2YM+JnuXHAVUIWpgRvw//9/nrrLXydPuvszBJ8hc/RZm1JUeesxDAAJ7Hn0Ibz42p+Wi1+YVLC5AmT7eRd+W6DzX2A1AOgK/rNvvns33/yTsfHFH1tkQ0Ca99twpwhysh5EFgd7AZQwCg8+nLDhxjP/j0wcggxicgwMvMJwdXFybNsn6rJ3CnCwHAHa/hfDAKDNzEBB1XNvf1tsePHbEaZAnpP5hYMY4zllHraLQLHb6JpRYgHEAQUkkEJYzcDwE8h/D9QIorEC6mUmfHGPTw4AIjOrEWZgnZwAAAAASUVORK5CYII=',
            url  : 'https://twitter.com/search/realtime?q=' + encodeURIComponent(tab.url)
        },    
        {
            name : 'Topsy Search',
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWklEQVQ4T5WTTS9DQRSGZ7T00g/a1EIisbCx9NOIEBEsVESI8NMsbSwkEguNUlql1fG+xxm9Myqum7yZe3POfeZ8WmNMPqUC3iehnMri5OOgD1Uf5xs0oOgwRTnnntU502GtLcPxnYBpKAHgwez7C/9gHDgDQA1ePf4xQwFwb/YyAhoCmMd/3RCwmxFwGAJGKfwP8J3C+CLuRNEcsRGjJ11E38YE5gpURT0uzXYEOJawV2FvQW0W0LdxAi8UZ6AEzQFwNdgKAfkTAazA/gi96CwM6eU9mUpRAde9zRCQnApgWQEdzgATSntxAtnSWURw09kIAcUzASzB/sT2QZzIHwB2pAzAbXs9BFTOBbAIOyf2dRyAxWQhSwDctSJA9QuwoPlLAeMIuECsA6ey2VwLI6hfCKCu4TN/LleQAjvBKH5dLN97vX0YA3glo/Bz4deafryNRZMV1m+ZrE/B9oNOTVtHqgAAAABJRU5ErkJggg==',
            url  : "http://topsy.com/" + tab.url.replace(/^[a-z]{3,}:\/\//, '')
        },
        {
            name : 'Y!Japan Search',
            icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABw0lEQVRoQ+1XvQ7CIBCGzbGv4Ojo+z+Eo6Ov0NFNWywV6P0CoW0C0cTEu+O+H47WmpMve/L+TQewt4Jdga5AIQPdQoUEFqd3BYopLCzgFPi4T/maijVXtDaAmYWmIA4NgHKGVztkK7IR6qn73djHg/LbWjPXmr65NH+83czwfLq9l00sKTfYwDAYM45rAQqJy5/jNSuozSjgcLB+lRTB+kNzPaipWWh5dqF8r4JIAV+8BMRvyP3W+iNWEcNvsX0D1nkFKoH4j+pt86ALpKSxFgrpkRZNKXV5l4tx37/HyZEr3UsFYLEBOqC8LzeqKZun9gntk33pSNiJYoS2Qe06jU+TjE8fq1ZAciYiCymb17CfrQAJYmnYxWQ0DwEYr1czvF7g3ZOtAAli9vz77UJSz2IzkxsWWJ1iAFrJOQDM7N/02wKAag8IAKWiqjjGnpY1SgUCANjr4QAs4KC75lQAuKOy/n8YBRDrsP2xARIqapwBrfezbuLcN6yQBP+2lRJzJgDgE0AHIPE6MeIU6ekTRpQqHp9ZZ0DbZYv4KlOoRaPYHh3AnuyD42zvhrT7dwtpGasd3xWozai2XldAy1jt+NMr8AW/cJAxlebLxQAAAABJRU5ErkJggg==',
            url  : "http://realtime.search.yahoo.co.jp/search?p=" + encodeURIComponent(tab.url)
        }
    ];

    for(var i=0; i<service.length; i++){
        cmdlist.appendChild(function(){

            var list = document.createElement("li");
            list.setAttribute("class", 'services');
            list.addEventListener('click', function(url){
                return function(){
                    window.open(url, '_new');
                };
            }(service[i].url));

            var elm = document.createElement("a");
            elm.setAttribute("href",   service[i].url);
            elm.setAttribute("target", '_new');

            var srvicon = document.createElement("img");
            srvicon.setAttribute('src', service[i].icon);

            var desc = document.createElement("span");
            desc.appendChild( document.createTextNode(service[i].name) );

            elm.appendChild( srvicon );
            elm.appendChild( desc );

            list.appendChild( elm );

            return list;
        }());
    }
  });
};
