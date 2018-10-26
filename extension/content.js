// Miscellaneous

console.log('Hello from content');
document.QS = document.querySelector;

// Capture elements

var wrapper = document.QS('im-page--chat-body-wrap-inner');
var button = document.QS('.im-chat-input--attach');

// Replace old button hooks

button.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    alert('KOK');
};
