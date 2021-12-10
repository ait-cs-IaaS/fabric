function focusClipboard() {
    var clipboard_text = document.getElementById("noVNC_clipboard_text");
    clipboard_text.focus({ preventScroll: true });
}

function copyFromClient() {
    var clipboard_text = document.getElementById("noVNC_clipboard_text");
    clipboard_text.select();
    clipboard_text.setSelectionRange(0, 99999);
    if (!navigator.clipboard){
        document.execCommand("copy");
    } else {
        navigator.clipboard.writeText(clipboard_text.value);
    }
    showHint("copy-from-hint")
}

function copyToClient() {
    var clipboard_text = document.getElementById("noVNC_clipboard_text");
    clipboard_text.value = "";
    clipboard_text.select();
    showHint("copy-to-hint_01");
};

function help() {
    showHint("help");
};

function showHint(id) {
    var all_hints = document.getElementsByClassName("hint");
    var i;
    for (i = 0; i < all_hints.length; i++) {
        all_hints[i].classList.add("hidden");
        all_hints[i].classList.remove("visible");
    }

    var hint = document.getElementById(id);
    hint.classList.remove("hidden");
    void hint.offsetWidth;
    hint.classList.add("visible");
}


function showInsertHint() {
    var first_hint = document.getElementById("copy-to-hint_01");

    if (!first_hint.classList.contains("hidden")) {
        showHint("copy-to-hint_02")
    }
}


function init() {

    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'v') {
            showInsertHint();
        }
    });

    var clipboard_container = document.getElementById('noVNC_clipboard_container')
    var end_position = 0;
    var start_position = 0;

    clipboard_container.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        start_position = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        end_position = start_position - e.clientY;
        start_position = e.clientY;
        // set the element's new position:
        clipboard_container.style.top = (clipboard_container.offsetTop - end_position) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
