MFC.ShowFlashCardAnswerCommand = function(flashCard, progress) {
	this._flashCard = flashCard;
	this._progress = progress;
	this._previousPinyin = $('#pinyin').html();
	this._previousEnglish = $('#english').html();
	this._previousProgress = $('#progress').html();
}

$.extend(MFC.ShowFlashCardAnswerCommand.prototype, MFC.Command, {
	execute: function() {
		$('#pinyin').html(this._flashCard.getPinyin());
		$('#english').html(this._flashCard.getEnglish());
		$('#progress').html(this._progress);
	},

	undo: function() {
		$('#pinyin').html(this._previousPinyin);
		$('#english').html(this._previousEnglish);
		$('#progress').html(this._previousProgress);
	}
});