function focusClipboard() {
	var clipboard_text = document.getElementById('noVNC_clipboard_text');
	clipboard_text.focus({ preventScroll: true });
}

function copyFromClient() {
	var clipboard_text = document.getElementById('noVNC_clipboard_text');
	clipboard_text.select();
	clipboard_text.setSelectionRange(0, 99999);
	if (!navigator.clipboard) {
		document.execCommand('copy');
	} else {
		navigator.clipboard.writeText(clipboard_text.value);
	}
	showHint('copy-from-hint');
}

function copyToClient() {
	var clipboard_text = document.getElementById('noVNC_clipboard_text');
	clipboard_text.value = '';
	clipboard_text.select();
	showHint('copy-to-hint_01');
}

function help(btn) {
	const currentlyVisible = btn.getAttribute("visible") === "true"
	const hint = document.getElementById('help');
	let tooltip = btn.getElementsByClassName('tooltiptext')[0]
	
	if (!currentlyVisible) {
		hint.classList.add('visible');
		btn.classList.add('active');
		tooltip.innerText = "hide clipboard help"
	} else {
		hint.classList.remove('visible');
		btn.classList.remove('active');
		tooltip.innerText = "show clipboard help"
	}
	btn.setAttribute("visible", !currentlyVisible);
}

function showHint(id) {
	var all_hints = document.getElementsByClassName('hint');
	var i;
	for (i = 0; i < all_hints.length; i++) {
		all_hints[i].classList.add('hidden');
		all_hints[i].classList.remove('visible');
	}

	var hint = document.getElementById(id);
	hint.classList.remove('hidden');
	void hint.offsetWidth;
	hint.classList.add('visible');
}

function showInsertHint() {
	var first_hint = document.getElementById('copy-to-hint_01');

	if (!first_hint.classList.contains('hidden')) {
		showHint('copy-to-hint_02');
	}
}

function mouseDown() {
	document.getElementById('noVNC_clipboard_container').classList.add('hover');
}
function mouseUp() {
	document
		.getElementById('noVNC_clipboard_container')
		.classList.remove('hover');
}

function init() {
	var container_element = document.querySelector('.draggable');
	var draggie = new Draggabilly(container_element, {
		axis: 'x',
	});

	draggie.on('dragStart', mouseDown);
	draggie.on('dragEnd', mouseUp);
}
