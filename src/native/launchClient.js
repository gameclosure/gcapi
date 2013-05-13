/* @license
 * This file is part of the Game Closure SDK.
 *
 * The Game Closure SDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * The Game Closure SDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with the Game Closure SDK.  If not, see <http://www.gnu.org/licenses/>.
 */

GLOBAL.console = jsio('import base', {}).logging.get('console');

if (!window.DEV_MODE) { window.DEV_MODE = false; }

//install the device so that timestep knows where to get stuff

import device;
import platforms.native.initialize;

logger.log('getting initialize for native');
device.init();

import .common;
common.install();

import .socketTransport;

if (window.DEBUG_WAIT) {
	import ..debugging.connect;

	var cwd = jsio.__env.getCwd();
	var match = /https?:\/\/([^:]*).*/.exec(cwd);
	var host = null;
	if (match) {
		host = match[1];
	}

	debugging.connect.connect({
		transport: socketTransport.Connector,
		opts: {
			host: host,
			port: 9226
		}
	}, startApp);
} else {
	startApp();
}

function startApp (conn) {
	if (conn) {
		import ..debugging.TimestepInspector;
		conn.addClient(new debugging.TimestepInspector());
	}

	var type = "Client";
	//logging.setPrefix(type);
	
	// prefix filenames in the debugger
	jsio.__env.debugPath = function (path) { return '[' + type + ']:' + path; };
	
	logger.log('init debugging', jsio.__env.getCwd());

	import gc.API;
	GC.buildApp('launchUI');

	if (conn) {
		conn.setApp(GC.app);
	}
}

