
/* uptostream resolver
 * @lscofield
 * GNU
 */

const skkchecker = require('../lib/skkchecker');
var atob = require("atob");

exports.index = function (req, res) {
	//Optional check, only if you need to restrict access
	// to unautorized apps, skk is signature and auth is 
	// unautorized signal
	// see the config file to more info
	const auth = 'auth' in req.body ? req.body.auth : req.query.auth;
	const authJSON = Buffer.from(auth, 'base64').toString('utf8');
	const granted = skkchecker.check(authJSON);
	if (granted != '') {
		// no autorized app block
		// return a random troll video
		// if the app is unautorized
		res.json({ status: 'ok', url: granted });
	} else {
		// autorized app block
		const source = 'source' in req.body ? req.body.source : req.query.source;
		var html = Buffer.from(source, 'base64').toString('utf8');
		var mp4 = null;

		var arrayRegex = /var\s*(_0x\w+)\s*=\s*\[[\'|\"](.*?)[\'|\"]\]]/;
		var match = arrayRegex.exec(html);
		var json = match[1] && match[1] != '' ? match[1] : null;
		var _0x7b04 = JSON.parse(`['${json}']`);

		try {

			(function (_0x1d1f83, _0x7b04b1) {
				var _0xd90b00 = function (_0x3d01c6) { while (--_0x3d01c6) { _0x1d1f83['push'](_0x1d1f83['shift']()); } }; _0xd90b00(++_0x7b04b1);
			}(_0x7b04, 0xde));
			var _0xd90b = function (_0x1d1f83, _0x7b04b1) {
				_0x1d1f83 = _0x1d1f83 - 0x0; var _0xd90b00 = _0x7b04[_0x1d1f83]; if (_0xd90b['EtfQkf'] === undefined) {
					(function () {
						var _0x1494f7; try {
							var _0x198d28 = Function('return\\x20(function()\\x20' + '{}.constructor(\\x22return\\x20this\\x22)(\\x20)' + ');'); _0x1494f7 = _0x198d28();
						} catch (_0x22bce7) { _0x1494f7 = this; } var
							_0x2ac99c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/='; _0x1494f7['atob'] || (_0x1494f7['atob'] = function (_0x20f851) {
								var _0xf109e9 = String(_0x20f851)['replace'](/\/=+$\//, ''); var _0x5c0fe6 = '';
								for (var _0x5883f8 = 0x0, _0x414c90, _0x4f255a, _0x5dfba3 = 0x0; _0x4f255a = _0xf109e9['charAt'](_0x5dfba3++); ~_0x4f255a && (_0x414c90 = _0x5883f8 % 0x4 ? _0x414c90 * 0x40 + _0x4f255a : _0x4f255a, _0x5883f8++ % 0x4) ? _0x5c0fe6 += String['fromCharCode'](0xff & _0x414c90 >> (-0x2 * _0x5883f8 & 0x6)) : 0x0) { _0x4f255a = _0x2ac99c['indexOf'](_0x4f255a); }
								return _0x5c0fe6;
							});
					})();
					var _0x5d6adf = function (_0x33dd81, _0x2a02ef) {
						var _0x47a22f = [], _0x2ec5a6 = 0x0, _0x4ccce1, _0xd479b6 = '', _0x186e1d = ''; _0x33dd81 = atob(_0x33dd81); for (var
							_0x194ee1 = 0x0, _0x2e4bdc = _0x33dd81['length']; _0x194ee1
							< _0x2e4bdc; _0x194ee1++) { _0x186e1d += '%' + ('00' + _0x33dd81['charCodeAt'](_0x194ee1)['toString'](0x10))['slice'](-0x2); } _0x33dd81 = decodeURIComponent(_0x186e1d); var
								_0x5c50f3; for (_0x5c50f3 = 0x0; _0x5c50f3 < 0x100; _0x5c50f3++) { _0x47a22f[_0x5c50f3] = _0x5c50f3; } for (_0x5c50f3 = 0x0; _0x5c50f3 < 0x100; _0x5c50f3++) { _0x2ec5a6 = (_0x2ec5a6 + _0x47a22f[_0x5c50f3] + _0x2a02ef['charCodeAt'](_0x5c50f3 % _0x2a02ef['length'])) % 0x100; _0x4ccce1 = _0x47a22f[_0x5c50f3]; _0x47a22f[_0x5c50f3] = _0x47a22f[_0x2ec5a6]; _0x47a22f[_0x2ec5a6] = _0x4ccce1; } _0x5c50f3 = 0x0; _0x2ec5a6 = 0x0; for (var
									_0x5e6bc1 = 0x0; _0x5e6bc1 < _0x33dd81['length']; _0x5e6bc1++) { _0x5c50f3 = (_0x5c50f3 + 0x1) % 0x100; _0x2ec5a6 = (_0x2ec5a6 + _0x47a22f[_0x5c50f3]) % 0x100; _0x4ccce1 = _0x47a22f[_0x5c50f3]; _0x47a22f[_0x5c50f3] = _0x47a22f[_0x2ec5a6]; _0x47a22f[_0x2ec5a6] = _0x4ccce1; _0xd479b6 += String['fromCharCode'](_0x33dd81['charCodeAt'](_0x5e6bc1) ^ _0x47a22f[(_0x47a22f[_0x5c50f3] + _0x47a22f[_0x2ec5a6]) % 0x100]); }
						return _0xd479b6;
					}; _0xd90b['fhfzpI'] = _0x5d6adf; _0xd90b['JpdjgL'] = {}; _0xd90b['EtfQkf'] = !![];
				} var _0x3d01c6 = _0xd90b['JpdjgL'][_0x1d1f83];
				if (_0x3d01c6 === undefined) {
					if (_0xd90b['vSMKib'] === undefined) {
						_0xd90b['vSMKib'] = !![];
					} _0xd90b00 = _0xd90b['fhfzpI'](_0xd90b00, _0x7b04b1); _0xd90b['JpdjgL'][_0x1d1f83] = _0xd90b00;
				} else { _0xd90b00 = _0x3d01c6; }
				return _0xd90b00;
			};
			var sources = [];; sources[_0xd90b('0x45', 'qN0z')](function setTheLink() {
				var _0x14f0e4 = {
					'SGXAc': _0xd90b('0x4a', 'S%j!') + _0xd90b('0xf', 'gtu0') + _0xd90b('0x10', '[CcU') + '9.up' + 'tost' + _0xd90b('0x31', 'vHdl') + _0xd90b('0x2a', 'Wg$N'), 'aMCIB': '1xky' + 'dp8a' + '54c', 'vPGFX': function (_0xba8c70, _0x263b8a) {
						return _0xba8c70 !== _0x263b8a;
					}, 'KroMT': _0xd90b('0x27', '[CcU') + 'J', 'gWvoa': _0xd90b('0x1', 'mcct') + 'c', 'yWchB': _0xd90b('0x34', 'U^tV'), 'FXKAB': _0xd90b('0x33', 'nVRC'), 'FUrtg': _0xd90b('0x2b', 'nVRC') + _0xd90b('0x23', 'YCYt') + '4', 'NLphY': function (_0x1d2ca0, _0x42f88d) {
						return _0x1d2ca0 + _0x42f88d;
					}, 'xStyU': function (_0x2d0ba8, _0x2ee463) {
						return _0x2d0ba8 + _0x2ee463;
					}, 'EmQps': function (_0x42ed70, _0x289898) {
						return _0x42ed70 + _0x289898;
					}, 'RkJSB': function (_0x3c88b4, _0x3867c9) {
						return _0x3c88b4 + _0x3867c9;
					}, 'qTNwU': function (_0x579cd3) { return _0x579cd3(); }, 'afNTw': function (_0x36f1c4) {
						return _0x36f1c4();
					}, 'zhnCu': function (_0x30be96) {
						return _0x30be96();
					}, 'edREa': _0xd90b('0x21', 'ovgM') + 'o\/mp' + '4', 'PXOzk': _0xd90b('0x2d', 'KULW')
				}; var _0x1597fd = function () { return _0x14f0e4['SGXA' + 'c']; }; var _0x258bd4 = function () {
					return _0x14f0e4[_0xd90b('0x40', '6Wp8') + 'B'];
				}; var _0x5dde79 = function () {
					if (_0x14f0e4[_0xd90b('0xa', 't8S!') + 'X'](_0x14f0e4[_0xd90b('0x16', 'V(]6') + 'T'], _0x14f0e4[_0xd90b('0x6', 'vHdl') + 'a'])) {
						return _0x14f0e4['yWch' + 'B'];
					} else { return 'vide' + _0xd90b('0x39', '1hkN') + '4'; }
				}; function _0x210186() {
					return _0x14f0e4[_0xd90b('0x1e', 'gtu0') + 'B'];
				} function _0x340773() { return '0'; }
				var _0x4b3356 = function () {
					if ('zZkd' + 'B' !== _0xd90b('0x2e', 'dn&j') + 'T') { return _0x14f0e4['FUrt' + 'g']; } else {
						return _0x14f0e4['yWch' + 'B'];
					}
				};
				let _0x3f215d = {};
				var _0x4f928a = _0x14f0e4[_0xd90b('0x2', 'kEw6') + 'Y'](_0x14f0e4[_0xd90b('0x3d', 's[)y') + 'U'](_0x14f0e4['EmQp' + 's'](_0x14f0e4['EmQp' + 's'](_0x14f0e4['EmQp' + 's'](_0x14f0e4[_0xd90b('0x17', 'qN0z') + 'B'](_0x14f0e4[_0xd90b('0x2c', 'Xq6F') + 'U'](_0x1597fd), '\/'), _0x14f0e4[_0xd90b('0x3e', 't8S!') + 'U'](_0x258bd4)) + '\/', _0x14f0e4[_0xd90b('0x1d', 't8S!') + 'w'](_0x5dde79)), '\/') + _0x340773(), '\/'), _0x14f0e4[_0xd90b('0xe', 'dKvC') + 'u'](_0x4b3356)); var
					_0x14163d = _0x14f0e4[_0xd90b('0x47', 'EwaS') + 'a']; var _0x59289a = _0x14f0e4['PXOz' + 'k']; var
						_0x2be357 = _0x14f0e4[_0xd90b('0x41', 'ovgM') + 'B']; var _0x4b7199 = 'unkn' + _0xd90b('0x4', 'R$8#') + '0'; var _0x1aed0a = '0'
					; _0x3f215d[_0xd90b('0x8', 'f3XH')] = _0x4f928a; _0x3f215d[_0xd90b('0x43', 'gi6L')] = _0x14163d; _0x3f215d['labe' + 'l'] = _0x59289a; _0x3f215d[_0xd90b('0xb', '9&Vy')] = _0x2be357; _0x3f215d['lang'] = _0x14f0e4[_0xd90b('0x3a', 'lvIz') + 'B']; _0x3f215d[_0xd90b('0x7', '0OyD') + 'ng'] = _0x1aed0a;
				return _0x3f215d;
			}());
			sources[_0xd90b('0x20', 'R$8#')](function setTheLink() {
				var _0x3a62e7 = {
					'jrxBN': _0xd90b('0x22', 'ERzn') + 'o.mp' + '4', 'jFqOi': function (_0x29b960, _0x2f8500) {
						return _0x29b960 !== _0x2f8500;
					}, 'lGpqF': 'avgM' + 'I', 'pLnUQ': 'spa', 'ADoiL': 'cRRk' + 'T', 'JfBaR': function (_0x412e06, _0x550bac) {
						return _0x412e06 === _0x550bac;
					}, 'FozSo': _0xd90b('0x38', '1hkN') + 'S', 'bHqbk': function (_0x3180e7, _0x550d9f) {
						return _0x3180e7 + _0x550d9f;
					}, 'bGeKE': function (_0x1c2ac8, _0x41b981) {
						return _0x1c2ac8 + _0x41b981;
					}, 'CFGbC': function (_0x4c8522, _0x6672ae) {
						return _0x4c8522 + _0x6672ae;
					}, 'tPdaJ': function (_0x137919, _0x1f4859) {
						return _0x137919 + _0x1f4859;
					}, 'uQUqk': function (_0x11af92) { return _0x11af92(); }, 'dDWiA': function (_0x439d76) {
						return _0x439d76();
					}, 'CwkcV': _0xd90b('0x1b', 'R$8#') + _0xd90b('0x36', 'UTEH') + '4', 'ayVsa': _0xd90b('0x1c', 'S%j!'), 'KzWcH': _0xd90b('0x35', 'Wr35') + 'own\\x20' + '0'
				}; var _0x554a25 = function () {
					return _0xd90b('0x14', '9&Vy') + _0xd90b('0x44', '(bHV') + _0xd90b('0x37', 'Xq6F') + '9.up' + _0xd90b('0x28', '(bHV') + _0xd90b('0x1f', 'ovgM') + _0xd90b('0x2f', '[2sC');
				}; var _0x4aaf49 = function () { return _0xd90b('0x3f', 'nVRC') + _0xd90b('0x5', 'COKK') + _0xd90b('0x4e', 'mcct'); };
				var _0x4251fb = function () {
					var _0x5e86c6 = { 'jBcqU': _0x3a62e7[_0xd90b('0x49', 'R$8#') + 'N'] }; if (_0x3a62e7[_0xd90b('0x15', 'YCYt') + 'i'](_0xd90b('0x4b', '(#Er') + 'Q', _0x3a62e7['lGpq' + 'F'])) {
						return _0xd90b('0x48', '6Wp8');
					} else { return _0x5e86c6[_0xd90b('0x0', 'ulS1') + 'U']; }
				}; function _0x1ddc21() {
					if (_0x3a62e7[_0xd90b('0x19', 'dKvC') + 'L'] === _0x3a62e7[_0xd90b('0x46', 'ovgM') + 'L']) {
						return _0xd90b('0x32', 'dn&j');
					} else { return _0x3a62e7['pLnU' + 'Q']; }
				} function _0x5f33e3() { if (_0x3a62e7['JfBa' + 'R']('usfg' + 'S', _0x3a62e7[_0xd90b('0x3b', 'ERzn') + 'o'])) { return '0'; } else { return '0'; } }
				var _0x13a769 = function () { return _0x3a62e7[_0xd90b('0x1a', 'oaY@') + 'N']; }; let _0x5387c7 = {}; var
					_0x5edf2d = _0x3a62e7[_0xd90b('0xc', 'ulS1') + 'k'](_0x3a62e7[_0xd90b('0xd', 'S%j!') + 'E'](_0x3a62e7[_0xd90b('0x24', 'lvIz') + 'E'](_0x3a62e7['CFGb' + 'C'](_0x3a62e7[_0xd90b('0x4c', '^(jd') + 'C'](_0x3a62e7[_0xd90b('0x29', 'Ox8F') + 'C'](_0x3a62e7['tPda' + 'J'](_0x3a62e7[_0xd90b('0x30', 'S%j!') + 'J'](_0x3a62e7['uQUq' + 'k'](_0x554a25), '\/'), _0x3a62e7[_0xd90b('0x18', 'YCYt') + 'k'](_0x4aaf49)), '\/'), _0x3a62e7[_0xd90b('0x4d', 'mWlk') + 'k'](_0x4251fb)), '\/'), _0x3a62e7[_0xd90b('0x42', 'U^tV') + 'A'](_0x5f33e3)), '\/'), _0x3a62e7[_0xd90b('0x13', 'UTEH') + 'A'](_0x13a769)); var
						_0x4b51e9 = _0x3a62e7['Cwkc' + 'V']; var _0x5669e0 = _0x3a62e7[_0xd90b('0x3', 'ppG3') + 'a']; var
							_0x553399 = _0xd90b('0x26', '(bHV'); var _0x5ee951 = _0x3a62e7['KzWc' + 'H']; var _0x5628bb = '0'
					; _0x5387c7['src'] = _0x5edf2d; _0x5387c7['type'] = _0x4b51e9; _0x5387c7[_0xd90b('0x9', '(bHV') + 'l'] = _0x5669e0; _0x5387c7[_0xd90b('0x3c', '^(jd')] = _0x553399; _0x5387c7[_0xd90b('0x12', 'mWlk')] = _0x3a62e7[_0xd90b('0x11', '6Wp8') + 'Q']; _0x5387c7[_0xd90b('0x25', 'Wr35') + 'ng'] = _0x5628bb;
				return _0x5387c7;
			}());
		} catch (err) {
			mp4 = null;
		}

		if (sources && sources.length > 0) {
			mp4 = sources[0].src;
		}

		mp4 = mp4 == null ? '' : mp4;

		res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
	}
};