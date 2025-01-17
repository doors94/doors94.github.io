

var toggle_start_menu = function () {
	showMessageBox({iconID: 'error', message: 'explorer.exe has performed an illegal operation in $start-menu.js (Using a feature that I am not implementing yet) and will now be brutally murdered'})
};

var $start_button = $(".start-button");
$start_button.on("pointerdown", function () {
	toggle_start_menu();
});
// Note: A lot of the time it's good to use focusout (in jQuery, or else blur with useCapture?[1]) as opposed to 
// That might be the case here as well, but maybe not since programs opening might grab focus and that probably shouldn't close the start menu
// Although at the operating system level it would probably prevent focus switching in the first place, so maybe we could do that
// The point being this is an operating system control and so it may warrant special handling,
// but generally I'd recommend making a control focusable and detecting loss of focus as in this answer:
// [1]: https://stackoverflow.com/a/38317768/2624876

$(window).on("keydown", function (e) {
	if (e.which === 27) { // Esc to close
		close_start_menu();
	}
});
