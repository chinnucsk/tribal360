
var UserAgentManager = {
	user_agent : '',
	exclude_browsers : [],
	browsers_map : [],
	versionSearchString: [],
	browser : '',
	version : '',
	OS : '',
	dataBrowser : [{string: navigator.userAgent,subString: "Chrome",identity: "Chrome"},
				{string: navigator.userAgent,subString: "OmniWeb",versionSearch: "OmniWeb/",identity: "OmniWeb"},
				{string: navigator.vendor,subString: "Apple",identity: "Safari",versionSearch: "Version"	},
				{prop: window.opera,	identity: "Opera",	versionSearch: "Version"},
				{string: navigator.vendor,subString: "iCab",identity: "iCab"},
				{string: navigator.vendor,subString: "KDE",identity: "Konqueror"},
				{string: navigator.userAgent,subString: "Firefox",identity: "Firefox"},
				{string: navigator.vendor,subString: "Camino",identity: "Camino"},
				{string: navigator.userAgent,subString: "Netscape",identity: "Netscape"},
				{string: navigator.userAgent,subString: "MSIE",identity: "MSIE",versionSearch: "MSIE"},
				{string: navigator.userAgent,subString: "Gecko",	identity: "Mozilla",versionSearch: "rv"	},
				{string: navigator.userAgent,subString: "Mozilla",identity: "Netscape",versionSearch: "Mozilla"}
				],
	dataOS : [{string: navigator.platform,	subString: "Win",identity: "Windows"},
			{string: navigator.platform,subString: "Mac",identity: "Mac"},
			{string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
			{string: navigator.platform,subString: "Linux",identity: "Linux"}
			],

	init :function() {
		UserAgentManager.browsers_map['IE6'] = 'MSIE 6';
		UserAgentManager.browsers_map['IE7'] = 'MSIE 7';
		UserAgentManager.browsers_map['IE8'] = 'MSIE 8';
		UserAgentManager.browsers_map['IE9'] = 'MSIE 9';
		UserAgentManager.browsers_map['IE10'] = 'MSIE 10';
		UserAgentManager.browsers_map['Chrome'] = 'Chrome';
		UserAgentManager.browsers_map['Firefox'] = 'Firefox' ;
		UserAgentManager.browsers_map['Opera'] = 'Opera' ;
		UserAgentManager.browsers_map['Safari'] = 'Safari' ;
		UserAgentManager.browser = UserAgentManager.searchString(UserAgentManager.dataBrowser) || "An unknown browser";
		UserAgentManager.version = UserAgentManager.searchVersion(navigator.userAgent)|| UserAgentManager.searchVersion(navigator.appVersion) || "an unknown version";
		UserAgentManager.OS = UserAgentManager.searchString(UserAgentManager.dataOS) || "an unknown OS";
		UserAgentManager.user_agent = navigator.userAgent;

	},

	getOS: function(){
		return UserAgentManager.OS;
	},

	getBrowser: function(){
		return UserAgentManager.browser + " " + UserAgentManager.version;
	},

	isIE: function(){
		if( UserAgentManager.browser == "MSIE")
			return true;
		else
			return false;
	},

	isExcludedBrowser: function(){

		for( var i = 0; i < UserAgentManager.exclude_browsers.length; i++ ){
			var regex = new RegExp(UserAgentManager.exclude_browsers[i], 'i');
			if (UserAgentManager.getBrowser().match(regex)) {
				return true;
			}
		}
		return false;
	},

	setExcludeBrowsers: function(exclude_browsers){
		UserAgentManager.exclude_browsers = [];
		for( var i = 0; i < exclude_browsers.length; i++ ){
			UserAgentManager.exclude_browsers.push(UserAgentManager.browsers_map[exclude_browsers[i]]);
		}
	},

	Android: function() {
		if (navigator.userAgent.match(/Android/i)){
			UserAgentManager.user_agent = "Android";
			return true;
		}
        return false;
    },

    BlackBerry: function() {
        if( navigator.userAgent.match(/BlackBerry/i)){
			UserAgentManager.user_agent = "BlackBerry";
			return true;
        }
        return false;
    },

    iOS: function() {
        if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
			UserAgentManager.user_agent = "iPhone|iPad|iPod";
			return true;
        }
        return false;
    },

    Opera: function() {
        if( navigator.userAgent.match(/Opera Mini/i)){
			UserAgentManager.user_agent = "Opera Mini";
			return true;
        }
        return false;
    },

    Windows: function() {
        if(navigator.userAgent.match(/IEMobile/i)){
			UserAgentManager.user_agent = "IEMobile";
			return true;
        }
        return false;
    },

    Tablet: function(){
		if(navigator.userAgent.match(/hp-tablet/i) ){
			UserAgentManager.user_agent = "hp-tablet";
			return true;
        }
        return false;
    },

    OtherMobile: function(){
		if (navigator.userAgent.match(/EudoraWeb/i) || navigator.userAgent.match(/Fennec/i)
		|| navigator.userAgent.match(/Minimo/i) ||  navigator.userAgent.match(/POLARIS/i)
		|| navigator.userAgent.match(/Kindle/i) || navigator.userAgent.match(/nook browser/i)
		|| navigator.userAgent.match(/Silk/i)){
			UserAgentManager.user_agent = "other browser";
			return true;
        }
        return false;
    },

    getUserAgent: function(){
		return UserAgentManager.user_agent;
    },

    isMobileBrowser: function() {
		return (UserAgentManager.Android() || UserAgentManager.BlackBerry()
				|| UserAgentManager.iOS() || UserAgentManager.Opera()
				|| UserAgentManager.Windows() || UserAgentManager.Tablet() || UserAgentManager.OtherMobile());
    },

   searchString: function (data) {
		for (var i=0 ; i < data.length ; i++){
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			UserAgentManager.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(	UserAgentManager.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring( index + UserAgentManager.versionSearchString.length+1));
	}
};

