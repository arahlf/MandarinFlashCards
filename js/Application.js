window.MFC = {}; // global application namespace

var numberOfChapters = 45;
var loading = false;

MFC.Application = {
	loadMenu: function() {
		if (loading) {
			return;
		}

		$('#page_FlashCards').hide();

		var html = [];

		for (var i = 1; i <= numberOfChapters; i++) {
			html.push('<li>' + i + '</li>');
		}

		$('#chapters').html(html.join('')).selectable();

		$('#start').click(function(e) {
			e.preventDefault();

			var chapters = [];

			// serialize the selections
			$('.ui-selected', $('#chapters')).each(function() {
			  var index = $('#chapters li').index(this);
			  chapters.push(index + 1);
			});

			if (chapters.length > 0) {
				loading = true;

				MFC.CsvDataProvider.loadFlashCards(chapters, function(flashCards) {
					$('#page_ChapterSelect').hide();

					MFC.Application.displayFlashCards(flashCards);

					loading = false;
				});
			}
		});
	},

	displayFlashCards: function(flashCards) {
		$('#page_FlashCards').show();

		var history = [];
		var historyIndex = -1;
		var usedFlashCards = [];
		var totalFlashCards = flashCards.length;

		function forward() {
			// we're behind in the history stack, so we're performing a redo operation
			if (history[historyIndex + 1]) {
				var command = history[++historyIndex];
				command.execute();
			}
			// we're either displaying a new flash card to showing the answer of a flash card
			else {
				var shouldDisplayNewFlashCard = history.length % 2 == 0;
				var command;

				if (shouldDisplayNewFlashCard) {
					if (flashCards.length == 0) {
						return;
					}

					var randomIndex = Math.floor(Math.random() * flashCards.length);
					var flashCard = flashCards.splice(randomIndex, 1)[0];

					usedFlashCards.push(flashCard);

					command = new MFC.ChangeFlashCardCommand(flashCard, usedFlashCards.length + '/' + totalFlashCards);
				}
				else {
					command = new MFC.ShowFlashCardAnswerCommand(usedFlashCards[usedFlashCards.length - 1], usedFlashCards.length + '/' + totalFlashCards);
				}

				history.push(command);
				historyIndex++;

				command.execute();
			}
		}

		function backward() {
			if (history[historyIndex] && historyIndex > 0) {
				var command = history[historyIndex--];
				command.undo();
			}
		}

		// hook up key listeners
		$(document).keydown(function(e) {
			if (e.keyCode == 32 || e.keyCode == 39) { // spacebar + right arrow
				forward();
			}
			else if (e.keyCode == 37) { // left arrow
				backward();
			}
		});

		forward();
	}
};