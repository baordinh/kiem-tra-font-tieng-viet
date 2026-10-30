(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.FontCoverage = factory();
})(typeof self !== "undefined" ? self : this, function () {
  var BASES = ["a", "ă", "â", "e", "ê", "i", "o", "ô", "ơ", "u", "ư", "y"];
  var TONES = ["́", "̀", "̉", "̃", "̣"];
  var chars = ["đ"];
  BASES.forEach(function (b) {
    if (b !== "a" && b !== "e" && b !== "i" && b !== "o" && b !== "u" && b !== "y") chars.push(b);
    TONES.forEach(function (t) {
      chars.push((b + t).normalize("NFC"));
    });
  });
  var lower = chars.slice();
  lower.forEach(function (c) {
    chars.push(c.toUpperCase());
  });
  var VI_CHARS = chars.join("");

  function checkCoverage(font) {
    var supported = [];
    var missing = [];
    chars.forEach(function (ch) {
      (font.charToGlyphIndex(ch) === 0 ? missing : supported).push(ch);
    });
    return {
      total: chars.length,
      missing: missing,
      supported: supported,
      percent: Math.floor((supported.length / chars.length) * 100),
    };
  }

  return { VI_CHARS: VI_CHARS, checkCoverage: checkCoverage };
});
