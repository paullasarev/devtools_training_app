$(function() {
    function getOffset(el) {
        return el.offset().top + $(window).scrollTop();
    }

    updateHeaderPosition();

    function updateHeaderPosition() {
        var elPageHeader = $('#pageHeader');
        var elPageHeaderText = $('#pageHeaderText');
        var headerOffset = getOffset(elPageHeader);
        var headerWidth = elPageHeader.outerWidth();
        var headerHeight = elPageHeader.outerHeight();
        var letterSpacing = headerOffset < 0 ? 0 : headerOffset / 10;
        var textWidth =  elPageHeaderText.outerWidth();
        var textHeight =  elPageHeaderText.outerHeight();

        elPageHeaderText.css({
            letterSpacing: letterSpacing,
            top: (headerHeight - textHeight)/2,
            left: (headerWidth - textWidth)/2,
        });
    }

    $(window).scroll(updateHeaderPosition).resize(updateHeaderPosition);

    $('#createTodoForm').on('submit', function(e) {
        e.preventDefault();

        var value = $('#createTodoForm').find('.createTodo__input').val();

        var newTodo = {
            text: value,
            done: false
        };

        createTodo(newTodo, addTodoToList);
    });

    $('#restart').click(function() {
        var list = document.getElementById('todoList');
        list.innerHTML = '';
    });

    var deletedItems = [];
    var closeEvents = [];

    function getCloseEvent(element) {
        function onclose() {
            deletedItems.push(element[0]);
            element.remove();
        }
        closeEvents.push(onclose);
        return onclose;
    }

    function addTodoToList(todo) {
        var newItem = $('<li class="todoList__item"><label><input class="todoList__itemToggle" type="checkbox">' + todo.text + '</label><div class="todoList__itemClose"></div></li>');

        $('#todoList').prepend(newItem);
        newItem.attr('data-md5', newID());

        var closeButton = newItem.find('.todoList__itemClose');
        var closeEvent = getCloseEvent(newItem);
        closeButton.on('click', closeEvent);
    }

    addTodoToList({ text: 'Prepare the slides'});
    addTodoToList({ text: 'Feed a cat'});
});

// Symulate AJAX request
function createTodo(todo, callback) {
    setTimeout(function() {
        callback(todo);
    }, 300);
}

function newID() {
    return "id" + Math.random().toString(16).slice(2)
}
