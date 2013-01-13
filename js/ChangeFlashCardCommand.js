MFC.ChangeFlashCardCommand = function(flashCard, progress) {
    this._flashCard = flashCard;
    this._progress = progress;
    this._previousSymbol = $('#symbol').html();
    this._previousPinyin = $('#pinyin').html();
    this._previousEnglish = $('#english').html();
    this._previousProgress = $('#progress').html();
}

$.extend(MFC.ChangeFlashCardCommand.prototype, MFC.Command, {
    execute: function() {
        $('#symbol').html(this._flashCard.getSymbol());
        $('#pinyin').empty();
        $('#english').empty();
        $('#progress').html(this._progress);
    },

    undo: function() {
        $('#symbol').html(this._previousSymbol);
        $('#pinyin').html(this._previousPinyin);
        $('#english').html(this._previousEnglish);
        $('#progress').html(this._previousProgress);
    }
});