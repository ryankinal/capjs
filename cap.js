/*
    CAP - Non-blocking HTML replacement for confirm/alert/prompt

    Author: Ryan Kinal
    License: WTFPL
*/
window.cap = (function() {
    var blanket = document.getElementById('blanket'),
        cap = {},
        current,
        error = document.createElement('div'),
        showCurrent = function(parent)
        {
            parent.appendChild(current);
            current.style.display = 'block';
            blanket.style.display = 'block';
            window.addEventListener('keydown', handleEscape);
        },
        closeCurrent = function()
        {
            if (current)
            {
                current.style.display = 'none';
                blanket.style.display = 'none';
                current.parentNode.removeChild(current);
                current = null;
            }
        },
        handleEscape = function(e)
        {
            e = e || window.event;
            var key = e.keyCode || e.which;

            if (key === 27)
            {
                window.removeEventListener('keydown', handleEscape);
                closeCurrent();
                return false;
            }
        },
        empty = function(element)
        {
            while (element.childNodes.length)
            {
                element.removeChild(element.childNodes[0]);
            }
        };

    if (!blanket)
    {
        blanket = document.createElement('div');
        blanket.id = 'blanket';
        blanket.className = 'blanket';
        document.body.appendChild(blanket);
    }

    /*
        parameters:
            settings - (optional) an object with the following possible keys:
                - parent - The HTML element to which the confirm element is appended
                - className - A custom class to apply to the confirm element
                - confirmText - Text to display on the confirm button
                - cancelText - Text to display on the cancel button
                - message - Text to identify what the user is confirming
                - onConfirm - The callback to run when the user confirms
                - onCancel - The callback to run when the user cancels
                - show - Whether or not to show the confirm element after it is created
                - hide - Whether or not to hide the prompt element after submit

        returns an object with the following values:
            - element - a reference to the confirm box (div)
            - blanket - a reference to the blanket element
    */
    cap.confirm = function(settings, onConfirm, onCancel)
    {
        if (typeof settings === 'string')
        {
            settings = {
                message: settings,
                onConfirm: onConfirm,
                onCancel: onCancel
            };
        }
        else if (typeof settings === 'undefined')
        {
            settings = {};
        }

        var box = document.createElement('div'),
            okay = document.createElement('input'),
            cancel = document.createElement('input'),
            buttons = document.createElement('div'),
            paragraph = document.createElement('p'),
            parent = settings.parent || document.body;

        box.className = settings.className || 'modal';

        okay.type = 'button';
        okay.value = settings.confirmText || 'Yes';

        cancel.type = 'button';
        cancel.value = settings.cancelText || 'No';

        paragraph.appendChild(document.createTextNode(settings.message || 'Are you sure?'));

        buttons.appendChild(okay);
        buttons.appendChild(cancel);

        box.appendChild(paragraph);
        box.appendChild(buttons);

        okay.addEventListener('click', function(e) {
            var close, handlerReturnValue;

            if (typeof settings.onConfirm === 'function')
            {
                handlerReturnValue = settings.onConfirm(e);
                close = handlerReturnValue || typeof handlerReturnValue === 'undefined';
            }
            else
            {
                close = true;
            }

            if (close && settings.hide !== false)
            {
                closeCurrent();
            }

            return false;
        });

        cancel.addEventListener('click', function(e) {
            var close, handlerReturnValue;

            if (typeof settings.onCancel === 'function')
            {
                handlerReturnValue = settings.onCancel(e);
                close = handlerReturnValue || typeof handlerReturnValue === 'undefined';
            }
            else
            {
                close = true;
            }

            if (close && settings.hide !== false)
            {
                closeCurrent();
            }

            return false;
        });

        current = box;

        if (settings.show !== false)
        {
            showCurrent(parent);
        }

        return {
            element: box,
            blanket: blanket
        };
    }

    /*
        parameters:
            settings - (optional) an object with the following possible keys:
                - parent - The HTML element to which the alert element is appended
                - className - A custom class to apply to the alert element
                - okayText - String to display on the "okay" button
                - contentType - They type of content that is passed in the "content" property
                    - If left out, it is assumed to be text
                    - If the value is "node", it's expecting a DOM node
                    - If the value is "html", it's expecting an HTML string
                - content - Content to display in the alert. Type must match the value passed into contentType
                - onConfirm - The callback to run when the user confirms
                - show - Whether or not to show the alert element after it is created
                - hide - Whether or not to hide the prompt element after submit

        returns an object with the following values:
            - element - a reference to the alert DOM element
            - blanket - a reference to the blanket element
    */
    cap.alert = function(settings, onConfirm)
    {
        if (typeof settings === 'string')
        {
            settings = {
                content: settings,
                onConfirm: onConfirm
            };
        }
        else if (typeof settings === 'undefined')
        {
            settings = {};
        }

        var box = document.createElement('div'),
            content,
            okay = document.createElement('input'),
            buttons = document.createElement('div'),
            parent = settings.parent || document.body;

        box.className = settings.className || 'modal';

        okay.type = 'button';
        okay.className = 'okay';
        okay.value = settings.okayText || 'Okay';

        buttons.appendChild(okay);

        if (settings.contentType === 'html')
        {
            content = document.createElement('div');
            content.innerHtml = settings.content;
        }
        else if (settings.contentType === 'node')
        {
            content = settings.content;
        }
        else
        {
            content = document.createElement('p');
            content.appendChild(document.createTextNode(settings.content));
        }

        box.appendChild(content);
        box.appendChild(buttons);

        okay.addEventListener('click', function(e) {
            var close,
                handlerReturnValue;

            if (typeof settings.onConfirm === 'function')
            {
                handlerReturnValue = settings.onConfirm(e);
                close = handlerReturnValue || typeof handlerReturnValue === 'undefined';
            }
            else
            {
                close = true;
            }

            if (close && settings.hide !== false)
            {
                closeCurrent();
            }

            return false;
        });

        current = box;

        if (settings.show !== false)
        {
            showCurrent(parent);
        }

        return {
            element: box,
            blanket: blanket
        }
    }

    /*
        parameters:
            settings - (optional) an object with the following possible keys:
                - parent - The HTML element to which the prompt element is appended
                - className - A custom class to apply to the prompt element
                - contentType - They type of content that is passed in the "content" property
                    - If left out, it is assumed to be text
                    - If the value is "node", it's expecting a DOM node
                    - If the value is "html", it's expecting an HTML string
                - content - Content to display in the alert. Type must match the value passed into contentType
                - trim - Whether to trim whitespace on both sides of the user input on submit
                - validate - A function that takes one parameter - the user input - and returns whether that input is valid
                - invalidError - String to display as an error when the input is not valid
                - confirmText - String to display on the "submit" button for the prompt
                - onConfirm - The callback to run when the user submits the input
                - allowCancel - Whether or not the user is allowed to cancel this prompt
                - cancelText - String to display on the "cancel" button for the prompt
                - onCancel - The callback to run whent the user cancels
                - input - An element to act as the user input element (where the user enters/chooses a value)
                - show - Whether or not to show the alert element after it is created
                - hide - Whether or not to hide the prompt element after submit

        returns an object with the following values:
            - element - a reference to the alert DOM element
            - blanket - a reference to the blanket element
    */
    cap.prompt = function(settings, onConfirm, onCancel)
    {
        if (typeof settings === 'string')
        {
            settings = {
                content: settings,
                onConfirm: onConfirm
            };

            if (typeof onCancel === 'function')
            {
                settings.onCancel = onCancel;
                settings.allowCancel = true;
            }
        }
        else if (typeof settings === 'undefined')
        {
            settings = {};
        }

        var box = document.createElement('div'),
            input = document.createElement(settings.input || 'input'),
            okay = document.createElement('input'),
            cancel,
            content,
            buttons = document.createElement('div'),
            parent = settings.parent || document.body,
            trim = settings.trim !== false,
            trimRegex = /(^\s+|\s$)/g,
            validate = settings.validate || function(data) {
                return /.+/.test(data);
            },
            confirm = function(e) {
                var value = input.value,
                    handlerReturnValue,
                    close;

                if (trim)
                {
                    value = value.replace(trimRegex, '');
                }

                if (validate(value))
                {
                    if (typeof settings.onConfirm === 'function')
                    {
                        handlerReturnValue = settings.onConfirm(e, value);
                        close = handlerReturnValue || typeof handlerReturnValue === 'undefined';
                    }
                    else
                    {
                        close = true;
                    }

                    if (close && settings.hide !== false)
                    {
                        closeCurrent();
                    }
                }
                else
                {
                    empty(error);
                    error.appendChild(document.createTextNode(settings.invalidError || 'Invalid input'));
                    box.appendChild(error);
                }

                return false;
            };

        box.className = settings.className || 'modal';

        error.className = 'error';

        if (!settings.input)
        {
            input.type = 'text';
        }

        if (!input.className)
        {
            input.className = 'prompt-input';
        }

        okay.type = 'button';
        okay.className = 'okay';
        okay.value = settings.confirmText || 'Okay';

        buttons.appendChild(input);
        buttons.appendChild(okay);

        if (settings.contentType === 'html')
        {
            content = document.createElement('div');
            content.innerHTML = settings.content;
        }
        else if (settings.contentType === 'node')
        {
            content = settings.content;
        }
        else
        {
            content = document.createElement('p');
            content.appendChild(document.createTextNode(settings.content));
        }

        box.appendChild(content);
        box.appendChild(buttons);

        okay.addEventListener('click', confirm);

        if (settings.submitOnEnter !== false)
        {
            input.addEventListener('keypress', function(e) {
                e = e || window.event;
                var key = e.keyCode || e.which;

                if (key === 13)
                {
                    confirm(e);
                    return false;
                }
            });
        }

        if (settings.allowCancel)
        {
             cancel = document.createElement('input')
             cancel.type = 'button';
             cancel.className = 'cancel';
             cancel.value = settings.cancelText || 'Cancel';

             cancel.addEventListener('click', function(e) {
                var close,
                    handlerReturnValue;

                if (typeof settings.onCancel === 'function')
                {
                    handlerReturnValue = settings.onCancel(e);
                    close = handlerReturnValue || typeof handlerReturnValue === 'undefined';
                }
                else
                {
                    close = true;
                }

                if (close && settings.hide !== false)
                {
                    closeCurrent();
                }

                return false;
             });

             buttons.appendChild(cancel);
        }

        current = box;

        if (settings.show !== false)
        {
            showCurrent(parent);
            input.focus();
        }

        return {
            element: box,
            blanket: blanket
        }
    }

    return cap;
})();