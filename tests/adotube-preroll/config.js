T360_config = {
	autoplay : true,
	feedUrl : 'http://tribal360.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Entertainment/unw3enu5g83fe5s84gle',
	//feedUrl : '../assets/feeder.php?feed=http://travelbig.com/video-feed/',
	displayAdContainer : 't360_display',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '483347',
	openx : '474222', // PUBLISHER SPECIFIC, OpenX's 'auid' variable
	adapt : 'adotubeOverlayTest', // PUB SPECIFIC, need to figure out what parameter we want to use: 'site'?
};

(function(){

	var s = document.createElement('script');
	s.src = 'loader.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();