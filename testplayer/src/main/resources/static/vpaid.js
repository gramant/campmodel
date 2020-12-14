/*
 *@fileoverview A VPAID ad useful for testing functionality of the sdk.
 * This particular ad will just play a video.
 *
 */

/**
 * @constructor
 */
var VpaidVideoPlayer = function () {
    /**
     * The slot is the div element on the main page that the ad is supposed to
     * occupy.
     * @type {Object}
     * @private
     */
    this.slot_ = null;

    /**
     * The video slot is the video element used by the ad to render video content.
     * @type {Object}
     * @private
     */
    this.videoSlot_ = null;

    /**
     * The irame with vast-player
     * @type {Object}
     * @private
     */
    this.iframeVastPlayer_ = null;

    /**
     * The AdParameters
     * @type {Object}
     * @private
     */
    this.adParameters_ = {
        serverUrl: null,
        vastTag_: null,
        minWidth: 0,
        minHeight: 0,
        eventVastImpressionUrl: null,
        eventCheckBeforeLoadWrongSizeUrl: null
    };

    /**
     * An object containing all registered events.  These events are all
     * callbacks for use by the vpaid ad.
     * @type {Object}
     * @private
     */
    this.eventsCallbacks_ = {};

    /**
     * A list of getable and setable attributes.
     * @type {Object}
     * @private
     */
    this.attributes_ = {
        'companions': '',
        'desiredBitrate': 256,
        'duration': 30,
        'expanded': false,
        'height': 0,
        'icons': '',
        'linear': true,
        'remainingTime': 10,
        'skippableState': false,
        'viewMode': 'normal',
        'width': 0,
        'volume': 1.0
    };

    /**
     * A set of events to be reported.
     * @type {Object}
     * @private
     */
    this.quartileEvents_ = [
        {event: 'AdVideoStart', value: 0},
        {event: 'AdVideoFirstQuartile', value: 25},
        {event: 'AdVideoMidpoint', value: 50},
        {event: 'AdVideoThirdQuartile', value: 75},
        {event: 'AdVideoComplete', value: 100}
    ];

    /**
     * @type {number} An index into what quartile was last reported.
     * @private
     */
    this.lastQuartileIndex_ = 0;

    /**
     * An array of urls and mimetype pairs.
     *
     * @type {!object}
     * @private
     */
    this.parameters_ = {};


    this.player_ = null;
};


/**
 * VPAID defined init ad, initializes all attributes in the ad.  The ad will
 * not start until startAd is called.
 *
 * @param {number} width The ad width.
 * @param {number} height The ad heigth.
 * @param {string} viewMode The ad view mode.
 * @param {number} desiredBitrate The desired bitrate.
 * @param {Object} creativeData Data associated with the creative.
 * @param {Object} environmentVars Variables associated with the creative like
 *     the slot and video slot.
 */
VpaidVideoPlayer.prototype.initAd = function (
    width,
    height,
    viewMode,
    desiredBitrate,
    creativeData,
    environmentVars) {
    this.log("start vpaid");

    if (creativeData.AdParameters) {
        this.adParameters_ = JSON.parse(creativeData.AdParameters);
    } else {
        this.log("creativeData.AdParameters is empty")
    }

    this.createWindowsListener_();

    // slot and videoSlot are passed as part of the environmentVars
    this.attributes_['width'] = width;
    this.attributes_['height'] = height;
    this.attributes_['viewMode'] = viewMode;
    this.attributes_['desiredBitrate'] = desiredBitrate;
    this.slot_ = environmentVars.slot;
    this.videoSlot_ = environmentVars.videoSlot;

    console.log("this.videoSlot_")
    console.log(this.videoSlot_)


    if (!this.checkAdParameters_()) {
        this.stopAd();
        this.sendGetRequestToUrl(this.adParameters_.eventCheckBeforeLoadWrongSizeUrl);
        return;
    }

    setInterval(() => {
        if (!this.checkVideoSlot_()) {
            this.sendMessage('videoSlot-size-was-change')
        }
    }, 1000);

    this.parameters_ = [];

    this.parameters_ = {
        videos: [
            {url: 'http://content.jwplatform.com/videos/AEhg3fFb-bPwArWA4.mp4', mimetype: 'video/mp4'}
        ]
    };

    this.log('initAd ' + width + 'x' + height +
        ' ' + viewMode + ' ' + desiredBitrate);

    // this.updateVideoSlot_();
    // this.startAd();

    // if(this.player_){

    this.createIframeWithVastPlayer_();


    this.videoSlot_.addEventListener(
        'timeupdate',
        this.timeUpdateHandler_.bind(this),
        false);
    this.videoSlot_.addEventListener(
        'ended',
        this.stopAd.bind(this),
        false);


    this.callEvent_('AdLoaded');


    this.createTestButtons();

    // this.stopAd();

};

VpaidVideoPlayer.prototype.checkAdParameters_ = function () {
    if (!this.adParameters_) {
        this.log("AdParameters is null");
        return false;
    }

    if (!this.adParameters_.vastTag) {
        this.log("VastTag is null");
        return false;
    }

    let status = true;

    if (this.adParameters_.minWidth && this.adParameters_ !== 0) {
        if (this.attributes_["width"] < this.adParameters_.minWidth) {
            status = false;
        }
    }

    if (this.adParameters_.minHeight && this.adParameters_ !== 0) {
        if (this.attributes_["height"] < this.adParameters_.minHeight) {
            status = false;
        }
    }

    return status;
};

VpaidVideoPlayer.prototype.checkVideoSlot_ = function () {
    if (!this.adParameters_) {
        this.log("AdParameters is null");
        return false;
    }

    if (!this.adParameters_.vastTag) {
        this.log("VastTag is null");
        return false;
    }

    let status = true;

    if (this.adParameters_.minWidth && this.adParameters_ !== 0) {
        if (this.videoSlot_.offsetWidth < +this.adParameters_.minWidth) {
            status = false;
        }
    }

    if (this.adParameters_.minHeight && this.adParameters_ !== 0) {
        if (this.videoSlot_.offsetHeight < +this.adParameters_.minHeight) {
            status = false;
        }
    }

    return status;
};

VpaidVideoPlayer.prototype.sendMessage = function (message) {
    httpGet(this.adParameters_.serverUrl+ '/error/' + message)
};

VpaidVideoPlayer.prototype.sendGetRequestToUrl = function (url) {
    httpGet(url);
};

VpaidVideoPlayer.prototype.createWindowsListener_ = function () {
    var eventMethod = window.addEventListener
        ? "addEventListener"
        : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent"
        ? "onmessage"
        : "message";

    eventer(messageEvent, (e) => {
        console.log(e);

        const vpaidEvent = e.data;

        switch (vpaidEvent.type) {
            case "AdStopped":
                this.stopAd();
                break
            case 'resizeAd':
                this.callEvent_('AdSizeChange');

                // this.resizeAd(vpaidEvent.params.width, vpaidEvent.params.height, vpaidEvent.params.mode);
                break
        }
    });
};

/**
 * Send message to iframeVastPlayer_ (if iframeVastPlayer_ exist)
 * @param {VpaidEvent} vpaidEvent
 * @private
 */
VpaidVideoPlayer.prototype.sendMessageToIframeVastPlayer_ = function (vpaidEvent) {
    if (this.iframeVastPlayer_) {
        this.iframeVastPlayer_.contentWindow.postMessage(vpaidEvent, 'http://localhost:8080')
    }
};

/**
 * Called when the overlay is clicked.
 * @private
 */
VpaidVideoPlayer.prototype.overlayOnClick_ = function () {
    this.callEvent_('AdClickThru');
};


/**
 * Called by the video element.  Calls events as the video reaches times.
 * @private
 */
VpaidVideoPlayer.prototype.timeUpdateHandler_ = function () {
    if (this.lastQuartileIndex_ >= this.quartileEvents_.length) {
        return;
    }
    var percentPlayed =
        this.videoSlot_.currentTime * 100.0 / this.videoSlot_.duration;
    if (percentPlayed >= this.quartileEvents_[this.lastQuartileIndex_].value) {
        var lastQuartileEvent = this.quartileEvents_[this.lastQuartileIndex_].event;
        this.eventsCallbacks_[lastQuartileEvent]();
        this.lastQuartileIndex_ += 1;
    }
};


/**
 * @private
 */
VpaidVideoPlayer.prototype.updateVideoSlot_ = function () {
    if (this.videoSlot_ == null) {
        this.videoSlot_ = document.createElement('video');
        this.log('Warning: No video element passed to ad, creating element.');
        this.slot_.appendChild(this.videoSlot_);
    }
    this.updateVideoPlayerSize_();
    var foundSource = false;
    var videos = this.parameters_.videos || [];
    for (var i = 0; i < videos.length; i++) {
        // Choose the first video with a supported mimetype.
        if (this.videoSlot_.canPlayType(videos[i].mimetype) != '') {
            this.videoSlot_.setAttribute('src', videos[i].url);
            foundSource = true;
            break;
        }
    }
    if (!foundSource) {
        // Unable to find a source video.
        this.callEvent_('AdError');
    }
};


/**
 * Helper function to update the size of the video player.
 * @private
 */
VpaidVideoPlayer.prototype.updateVideoPlayerSize_ = function () {
    this.videoSlot_.setAttribute('width', this.attributes_['width']);
    this.videoSlot_.setAttribute('height', this.attributes_['height']);
};


/**
 * Returns the versions of vpaid ad supported.
 * @param {string} version
 * @return {string}
 */
VpaidVideoPlayer.prototype.handshakeVersion = function (version) {
    return ('2.0');
};


/**
 * Called by the wrapper to start the ad.
 */
VpaidVideoPlayer.prototype.startAd = function () {
    this.log('Starting ad');

    this.callEvent_('AdStarted');
};

/**
 * Create iframe with vast-player.
 */
VpaidVideoPlayer.prototype.createIframeWithVastPlayer_ = function () {
    this.log('Create iframe with vast-player');

    const iframe = document.createElement('iframe');
    iframe.setAttribute("width", this.attributes_['width']);
    iframe.setAttribute("height", this.attributes_['height']);
    // iframe.setAttribute("style", 'z-index: 2147483647;');


    iframe.sandbox.add("allow-same-origin");
    iframe.sandbox.add("allow-top-navigation");
    iframe.sandbox.add("allow-forms");
    iframe.sandbox.add("allow-scripts");
    iframe.sandbox.add("allow-modals");

    iframe.setAttribute("allow","autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; encrypted-media")

    iframe.src = this.adParameters_.serverUrl + '/static/vast-player.html'; //Может заменить на локальный
    // iframe.src = 'http://localhost:8080/vast-player.html'; //Может заменить на локальный
    // iframe.src = 'http://localhost:8080/vast-openplayerjs.html'; //Может заменить на локальный
    // iframe.src = 'http://localhost:8080/vast-videojs.html'; //Может заменить на локальный

    iframe.onload = () => {
        iframe.contentWindow.postMessage({
            type: "create",
            params: {
                vastTag: this.adParameters_.vastTag,
                width: this.attributes_['width'],
                height: this.attributes_['height'],
                adParameters_: this.adParameters_
            }
        }, this.adParameters_.serverUrl);

        console.log("send message ");
    };

    this.slot_.appendChild(iframe);

    this.iframeVastPlayer_ = iframe;


    console.log("Created video createIframeWithVastPlayer");
    this.callEvent_('AdStarted');

};
// .AdSizeChange(1000, 1000, 'normal')

VpaidVideoPlayer.prototype.createTestButtons = function () {
    let buttonSize = document.createElement('button');

    buttonSize.textContent = 'Size Test';
    buttonSize.style.position = 'absolute';
    buttonSize.style.top = 0;

    buttonSize.addEventListener('click', this.AdSizeChangeTest.bind(this));

    this.slot_.appendChild(buttonSize);
}

VpaidVideoPlayer.prototype.AdSizeChangeTest = function () {
    console.log('AdSizeChangeTest');
    // this.eventsCallbacks_['AdSizeChange'](1000, 1000, 'normal')
    // this.eventsCallbacks_['AdSkipped']();
    // this.eventsCallbacks_['AdLoaded']();
    // this.eventsCallbacks_['AdPaused']();
    this.iframeVastPlayer_.width = "500px";
};

/**
 * Called by the wrapper to stop the ad.
 */
VpaidVideoPlayer.prototype.stopAd = function () {
    this.log('Stopping ad');
    // Calling AdStopped immediately terminates the ad. Setting a timeout allows
    // events to go through.
    var callback = this.callEvent_.bind(this);
    setTimeout(callback, 75, ['AdStopped']);
};


/**
 * @param {number} value The volume in percentage.
 */
VpaidVideoPlayer.prototype.setAdVolume = function (value) {
    this.attributes_['volume'] = value;
    this.log('setAdVolume ' + value);
    this.callEvent_('AdVolumeChange');
};


/**
 * @return {number} The volume of the ad.
 */
VpaidVideoPlayer.prototype.getAdVolume = function () {
    this.log('getAdVolume');
    return this.attributes_['volume'];
};


/**
 * @param {number} width The new width.
 * @param {number} height A new height.
 * @param {string} viewMode A new view mode.
 */
VpaidVideoPlayer.prototype.resizeAd = function (width, height, viewMode) {
    this.log('resizeAd ' + width + 'x' + height + ' ' + viewMode);
    this.attributes_['width'] = width;
    this.attributes_['height'] = height;
    this.attributes_['viewMode'] = viewMode;
    this.updateVideoPlayerSize_();
    this.callEvent_('AdSizeChange');

    this.iframeVastPlayer_.setAttribute("width", this.attributes_['width']);
    this.iframeVastPlayer_.setAttribute("height", this.attributes_['height']);

    this.sendMessageToIframeVastPlayer_(new VpaidEvent('AdSizeChange', {
        width: width,
        height: height,
        viewMode: viewMode
    }))
};


/**
 * Pauses the ad.
 */
VpaidVideoPlayer.prototype.pauseAd = function () {
    this.log('pauseAd');
    this.videoSlot_.pause();
    this.callEvent_('AdPaused');

    this.sendMessageToIframeVastPlayer_(new VpaidEvent('AdPaused', null))
};


/**
 * Resumes the ad.
 */
VpaidVideoPlayer.prototype.resumeAd = function () {
    this.log('resumeAd');
    this.videoSlot_.play();
    this.callEvent_('AdResumed');

    this.sendMessageToIframeVastPlayer_(new VpaidEvent('AdResumed', null))
};


/**
 * Expands the ad.
 */
VpaidVideoPlayer.prototype.expandAd = function () {
    this.log('expandAd');
    this.attributes_['expanded'] = true;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    this.callEvent_('AdExpanded');
};


/**
 * Returns true if the ad is expanded.
 * @return {boolean}
 */
VpaidVideoPlayer.prototype.getAdExpanded = function () {
    this.log('getAdExpanded');
    return this.attributes_['expanded'];
};


/**
 * Returns the skippable state of the ad.
 * @return {boolean}
 */
VpaidVideoPlayer.prototype.getAdSkippableState = function () {
    this.log('getAdSkippableState');
    return this.attributes_['skippableState'];
};


/**
 * Collapses the ad.
 */
VpaidVideoPlayer.prototype.collapseAd = function () {
    this.log('collapseAd');
    this.attributes_['expanded'] = false;
};


/**
 * Skips the ad.
 */
VpaidVideoPlayer.prototype.skipAd = function () {
    this.log('skipAd');
    var skippableState = this.attributes_['skippableState'];
    if (skippableState) {
        this.callEvent_('AdSkipped');
    }
};


/**
 * Registers a callback for an event.
 * @param {Function} aCallback The callback function.
 * @param {string} eventName The callback type.
 * @param {Object} aContext The context for the callback.
 */
VpaidVideoPlayer.prototype.subscribe = function (
    aCallback,
    eventName,
    aContext) {
    this.log('Subscribe ' + eventName + ' ' + aCallback);
    var callBack = aCallback.bind(aContext);
    this.eventsCallbacks_[eventName] = callBack;
};


/**
 * Removes a callback based on the eventName.
 *
 * @param {string} eventName The callback type.
 */
VpaidVideoPlayer.prototype.unsubscribe = function (eventName) {
    this.log('unsubscribe ' + eventName);
    this.eventsCallbacks_[eventName] = null;
};


/**
 * @return {number} The ad width.
 */
VpaidVideoPlayer.prototype.getAdWidth = function () {
    return this.attributes_['width'];
};


/**
 * @return {number} The ad height.
 */
VpaidVideoPlayer.prototype.getAdHeight = function () {
    return this.attributes_['height'];
};


/**
 * @return {number} The time remaining in the ad.
 */
VpaidVideoPlayer.prototype.getAdRemainingTime = function () {
    return this.attributes_['remainingTime'];
};


/**
 * @return {number} The duration of the ad.
 */
VpaidVideoPlayer.prototype.getAdDuration = function () {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 The duration of the ad.");
    return this.attributes_['duration'];
};


/**
 * @return {string} List of companions in vast xml.
 */
VpaidVideoPlayer.prototype.getAdCompanions = function () {
    return this.attributes_['companions'];
};


/**var frame = document.getElementById('include_content');

 var evalCode = 'console.log(document.body)';

 frame.contentWindow.postMessage(evalCode, '*');

 * @return {string} A list of icons.
 */
VpaidVideoPlayer.prototype.getAdIcons = function () {
    return this.attributes_['icons'];
};


/**
 * @return {boolean} True if the ad is a linear, false for non linear.
 */
VpaidVideoPlayer.prototype.getAdLinear = function () {
    return this.attributes_['linear'];
};


/**
 * Logs events and messages.
 *
 * @param {string} message
 */
VpaidVideoPlayer.prototype.log = function (message) {
    console.log(message);
};


/**
 * Calls an event if there is a callback.
 * @param {string} eventType
 * @private
 */
VpaidVideoPlayer.prototype.callEvent_ = function (eventType) {
    if (eventType in this.eventsCallbacks_) {
        this.eventsCallbacks_[eventType]();
    }
};


/**
 * Callback for when the mute button is clicked.
 * @private
 */
VpaidVideoPlayer.prototype.muteButtonOnClick_ = function () {
    if (this.attributes_['volume'] == 0) {
        this.attributes_['volume'] = 1.0;
    } else {
        this.attributes_['volume'] = 0.0;
    }
    this.callEvent_('AdVolumeChange');
};


/**
 * Main function called by wrapper to get the vpaid ad.
 * @return {Object} The vpaid compliant ad.
 */
var getVPAIDAd = function () {
    return new VpaidVideoPlayer();
};


function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

class VpaidEvent {
    type; //Type event (for switch)
    params; // Params event. May be different


    constructor(type, params) {
        this.type = type;
        this.params = params;
    }
}
