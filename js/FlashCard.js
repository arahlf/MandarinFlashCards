MFC.FlashCard = function(symbol, pinyin, english) {
	this._symbol = symbol;
	this._pinyin = pinyin;
	this._english = english;
};

$.extend(MFC.FlashCard.prototype, {
	getSymbol: function() {
		return this._symbol;
	},

	getPinyin: function() {
		return this._pinyin;
	},

	getEnglish: function() {
		return this._english;
	}
});