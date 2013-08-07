/**
 * @license
 * This file is part of the Game Closure SDK.
 *
 * The Game Closure SDK is free software: you can redistribute it and/or modify
 * it under the terms of the Mozilla Public License v. 2.0 as published by Mozilla.

 * The Game Closure SDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Mozilla Public License v. 2.0 for more details.

 * You should have received a copy of the Mozilla Public License v. 2.0
 * along with the Game Closure SDK.  If not, see <http://mozilla.org/MPL/2.0/>.
 */

import lib.PubSub;
import lib.Callback;

var testContactList = [
];

// for (var i = testContactList.length; i < 1000; ++i) {
// 	testContactList.push({id: i, name: username(), phones: [{number: '123456789'}]});
// }

exports.onBackButton = function () {};

exports.dialogs = {
	
	showDialog: function () {
		logger.log("Showing a dialog!");
	},

	showAppRater: function () {
		logger.log("Showing rate dialog!");
	}

};


var _withContacts = new lib.Callback();
_withContacts.fire();

exports.contacts = merge(new lib.PubSub(), {
	
	getContactList: function () {
		return testContactList;
	},

	withContacts: function () { _withContacts.forward(arguments); },

	sendAutomatedSMS: function (phone, msg, cb) {
		logger.log('Send Automated SMS:', phone, msg);
		cb && cb();
	},

	sendSMS: function (phone, msg, cb) {
		logger.log('Send SMS:', phone, msg);
		cb && cb();
	},

	getPicture: function (id) {
		return null;
	},
	
	getPictures: function (ids) {
		return null;
	},

	getPictureBase64: function (id) {
		return null;
	}

});

var _withPhoneNumber = new lib.Callback();
_withPhoneNumber.fire(null);

var _withPhoneNumber = new lib.Callback();
_withPhoneNumber.fire(null);

exports.profile = {
	fullName: "",

	getPicture: function (id) {
		return null;
	},

	getPictureBase64: function (id) {
		return null;
	},

	withPhoneNumber: function () { _withPhoneNumber.forward(arguments); }
};


exports.sound = {
	playSound: function (url, volume) {
		logger.log('this would play a sound on native');
	},
	loadSound: function (url) {
		logger.log('this would load a sound on native');
	},
	pauseSound: function (url) {
		logger.log('this would pause a sound on native');
	},
	stopSound: function (url) {
		logger.log('this would stop a sound on native');
	},
	setVolume: function (url, volume) {
		logger.log('this would set the volume of a sound on native');
	},
	loadBackgroundMusic: function (url) {
		logger.log('this would load background music on native');
	},
	playBackgroundMusic: function (url) {
		logger.log('this would play background music on native');
	},
	registerMusic: function (url) {
		logger.log('this would register background music on native');
	}
};

exports.events = {
	registerHandler: function() {}
};

exports.alerts = new lib.PubSub();
merge(exports.alerts, {
	onNotificationLoad: function () {},
	showNotification: function () {
		return -1;
	},
	showRecurringNotification: function () {
		logger.log("Setting up a recurring notification!");
		return -1;
	}
});

exports.social = new lib.PubSub();

//import .auth.conn;
//auth.conn.webAutoLogin();

if (!GLOBAL.NATIVE) {
	GLOBAL.NATIVE = exports;
}
