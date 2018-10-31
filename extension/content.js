// Miscellaneous

console.log('Hello from content');
document.QS = document.querySelector;
var Resource = chrome.runtime.getURL;
var choice = x => x[Math.floor(Math.random() * x.length)];

var inject = function (code) {
    var script = document.createElement('script');
    script.textContent = code;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
};

// Capture elements

var wrapper = document.QS('.im-page--chat-body-wrap-inner');
var container = document.QS('.im-page--chat-input');
var toEnd = document.QS('.im-to-end');
var button = document.QS('.im-chat-input--attach');

// Inject

var widget = document.createElement('div');
widget.state = false;
widget.id = 'pix-widget';
widget.style.height = '0px';
widget.innerHTML = `<img class="bob" src="${Resource('images/bob.png')}">`;
container.insertBefore(widget, toEnd.nextSibling);

var bob = widget.querySelector('img');
var bobInject = `(
    function(text) {
        document.querySelector('.im-chat-input--text').setValue(text);
        document.querySelector('.im-chat-input--send').click();
    }
)`;

// Save old and new wrapper borders

var wrapperBorderOld = wrapper.style.borderBottomWidth;
var wrapperBorderNew = 150 + (+wrapperBorderOld.replace('px', '')) + 'px';

// Setup hooks

button.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    widget.state = !widget.state;
    if (widget.state) {
        widget.style.height = '150px';
        wrapper.style.borderBottomWidth = wrapperBorderNew;
    } else {
        widget.style.height = '0px';
        wrapper.style.borderBottomWidth = wrapperBorderOld;
    }
};

var blog = ['Держи', 'Удерживай', 'Поддерживай', 'Держируй'];
var it = ['курсе', 'курсере', 'курсоиде', 'курсоре', 'курсоеде', 'курсировании'];

bob.onclick = function () {
    var text = choice(blog) + ' в ' + choice(it);
    inject(bobInject + `('${text}')`);
};
