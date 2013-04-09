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

var json_chars = {'[':']','{':'}','"':'"'};
var allowed_modes = ['stream', 'json', 'delimiter'];
exports.Reader = Class(function() {
    this.init = function(cb, rmode, delim) {
        this._buff = "";
        this._unclosed = [];
        this._checked = 0;
        this._name = null;
        this.setCb(cb);
        this.setMode(rmode || 'stream', delim);
    };

    this.setCb = function(func) {
        this._cb = func;
    };

    this.setMode = function(mode, delim) {
        if (allowed_modes.indexOf(mode) == -1) {
            throw new Error("illegal read mode:", mode);
        }
        this._mode = mode;
        this._delim = mode == 'delimiter' ? delim : null;
    };

    this.read = function(data) {
        this._buff += data;
        this._separate_events();
    };

    this._separate_events = function() {
        var frame;
        switch (this._mode) {
            case 'json':
                while (this._buff.length > this._checked) {
                    if (this._unclosed.length > 0 && this._buff.charAt(this._checked) == this._unclosed[this._unclosed.length-1]) {
                        this._unclosed.pop();
                    }
                    else if (this._buff.charAt(this._checked) in json_chars) {
                        this._unclosed.push(json_chars[this._buff.charAt(this._checked)]);
                    }
                    this._checked += 1;
                    if (this._buff && this._unclosed.length == 0) {
                        frame = JSON.parse(this._buff.slice(0, this._checked));
                        this._buff = this._buff.slice(this._checked);
                        this._checked = 0;
                        break;
                    }
                }
                break;
            case 'delimiter':
                var sep = this._buff.indexOf(this._delim);
                if (sep == -1) {
                    break;
                }
                frame = this._buff.slice(0, sep);
                this._buff = this._buff.slice(sep + this._delim.length);
                break;
            case 'stream':
            default:
                frame = this._buff.slice();
                this._buff = "";
                break;
        }
        if (frame) {
            this._cb(frame);
            this._separate_events();
        }
    };
});