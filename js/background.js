chrome.tabs.onUpdated.addListener(function(tid, info, tab){
    var cnt = getTweetCount(tab.url);
    setBadgeCount(cnt, tab.id);
    setTitle(cnt + "Tweet", tab.id)
});

function getTweetCount(url){
    var q = "http://urls.api.twitter.com/1/urls/count.json?url=" + url;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", q, false);
    xhr.send(null);
    var res = eval( '(' + xhr.responseText + ')' );
    return (res.count)
}

function setBadgeCount(count, tabId){
    var color = [65, 105, 225, 255];   // royalblue

    if(9999 < count && count < 1000000){
        count = Math.floor(count / 1000);
        count = count + 'k';
        color = [255, 140, 0, 255];    // darkorange
    }else if(count > 1000000){
        count = Math.floor(count / 1000000);
        count = count + 'm';
        color = [255, 0, 0, 255];      // red
    }

    chrome.browserAction.setBadgeBackgroundColor({
        'color' : color,
        'tabId' : tabId
    });
    chrome.browserAction.setBadgeText({
        'text'  : String(count),
        'tabId' : tabId
    })
}

function setTitle(msg, tabId){
    chrome.browserAction.setTitle({
        'title' : msg,
        'tabId' : tabId
    })
}


// Right Click Menu
var menu_selection = chrome.contextMenus.create({
    "title" : '選択部分をツイッター検索',
    "contexts": ["selection"],
    "onclick": selectionRightClick
});
function selectionRightClick(info, tab) {
  var urls = 'https://mobile.twitter.com/search/realtime?q=' + encodeURIComponent(info.selectionText);
  chrome.tabs.create({
    url      : urls,
    selected : true
  });
}

var menu_taburl = chrome.contextMenus.create({
    "title" : "このページのURLをツイッター検索",
    "contexts": ["link"],
    "onclick": genericOnClick
});
function genericOnClick(info, tab) {
  var urls = 'https://mobile.twitter.com/search/realtime?q=' + encodeURIComponent(info.linkUrl);
  chrome.tabs.create({
    url      : urls,
    selected : true
  });
}



