/* this file is a patched version of 'store/storages/cookieStorage' to avoid Incomplete string escaping or encoding */

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function encode(str) {
  return encodeURIComponent(str);
}

function decode(str) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

const cookieStorage = {
  name: 'cookieStorage',
  read: function(key) {
    if (!key || !this._keyExists(key)) return null;
    const pattern = '(?:^|.*;\\s*)' + escapeRegExp(encode(key)) + '\\s*=\\s*((?:[^;](?!;))*[^;]?).*';
    const result = document.cookie.replace(new RegExp(pattern), '$1');
    return decode(result);
  },
  write: function(key, value) {
    if (!key) return;
    document.cookie = encode(key) + '=' + encode(value) + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';
  },
  each: function(callback) {
    const cookies = document.cookie.split(/; ?/g);
    for (const cookie of cookies) {
      if (!cookie.trim()) continue;
      const [k, v] = cookie.split('=');
      callback(decode(v), decode(k));
    }
  },
  remove: function(key) {
    if (!key) return;
    document.cookie = encode(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  },
  clearAll: function() {
    this.each((_, key) => this.remove(key));
  },
  _keyExists: function(key) {
    const pattern = '(?:^|;\\s*)' + escapeRegExp(encode(key)) + '\\s*=';
    return new RegExp(pattern).test(document.cookie);
  },
};

export default cookieStorage;
