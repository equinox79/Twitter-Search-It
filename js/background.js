/*
 *
 *  Twitter Search It / background.js
 *
 */

// DEBUGモード
var DEBUG = true;

/*
 *  tab更新時の処理
 */
chrome.tabs.onUpdated.addListener(function(tid, info, tab){
    var cnt = getTweetCount(tab.url);
    setBadgeCount(cnt, tab.id);
    setTitle(cnt + "Tweet", tab.id)
});

/*
 *  ツイート件数を取得
 */
function getTweetCount(url){
    var q = "http://urls.api.twitter.com/1/urls/count.json?url=" + url;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", q, false);
    xhr.send(null);
    var res = eval( '(' + xhr.responseText + ')' );
    return (res.count)
}

/*
 *  バッヂに数字を設定
 */
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

/*
 *  タイトル設定
 */
function setTitle(msg, tabId){
    chrome.browserAction.setTitle({
        'title' : msg,
        'tabId' : tabId
    })
}

/*
 *  Twitter Searchのタブを生成
 */
function createSearchResultTab(info, tab, query) {
    if (!query) return;
    var search_api_url = 'https://twitter.com/search/realtime?q=%s';
    chrome.tabs.create({
        url      : search_api_url.replace(/%s/, query),
        selected : true
    });
}

/*
 *  右クリックメニュー作成
 */
var menus = {
    'selection' : chrome.contextMenus.create({
        "title"     : '選択文字をツイッター検索',
        "contexts"  : ["selection"],
        "onclick"   : function(info, tab){
            createSearchResultTab(info, tab, encodeURIComponent(info.selectionText));
        }
    }),
    'link' : chrome.contextMenus.create({
        "title"     : 'URLをツイッター検索',
        "contexts"  : ["link"],
        "onclick"   : function(info, tab){
            createSearchResultTab(info, tab, encodeURIComponent(info.linkUrl));
        }
    }),
    'page' : chrome.contextMenus.create({
        "title"     : "このページのURLをツイッター検索",
        "contexts"  : ["page"],
        "onclick"   : function(info, tab){
            createSearchResultTab(info, tab, encodeURIComponent(info.pageUrl));
        }
    })
};

/*
 *  ロガー
 */
function log (msg) {
    if(DEBUG) {
        console.log(msg);        
    }
}



