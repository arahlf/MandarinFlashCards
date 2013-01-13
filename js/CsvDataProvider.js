MFC.CsvDataProvider = $.extend({}, MFC.DataProvider, {
    loadFlashCards: function(chapters, callback) {
        var totalChapters = chapters.length;
        var requestCount = 0;
        var flashCards = [];
        var delimiter = '|';

        for (var i = 0; i < totalChapters; i++) {
            $.ajax({
                url: 'data/chapter' + chapters[i] + '.csv',
                success: function(chapterData, textStatus, jqXHR) {
                    var lines = chapterData.split('\n');
                    var symbolCsv = lines[0].split(delimiter);
                    var pinyinCsv = lines[1].split(delimiter);
                    var englishCsv = lines[2].split(delimiter);

                    for (var i = 0; i < symbolCsv.length; i++) {
                        flashCards.push(new MFC.FlashCard(symbolCsv[i], pinyinCsv[i], englishCsv[i]));
                    }
                },
                error: function(jqXhr, status, error) {
                    console.error('Error loading chapter: ' + error);
                },
                complete: function() {
                    if (++requestCount === totalChapters) {
                        // TODO test error condition
                        callback(flashCards);
                    }
                }
            });
        }
    }
});