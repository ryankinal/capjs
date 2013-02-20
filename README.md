# CAP

A non-blocking, HTML-based confirm/alert/prompt replacement.

## General Usage

    cap.confirm(settingsObject);
    cap.confirm('message', onConfirm, onCancel);

    cap.alert(settingsObject);
    cap.alert('message', onConfirm);

    cap.prompt(settingsObject);
    cap.prompt('message', onConfirm, onCancel);

## Confirm Usage

### Parameters:

`settings` - An object with the following possible keys:

* parent - (optional) The HTML element to which the confirm element is appended
* className - (optional) A custom class to apply to the confirm element
* confirmText - (optional) Text to display on the confirm button
* cancelText - (optional) Text to display on the cancel button
* message - (optional) Text to identify what the user is confirming
* onConfirm - (optional) The callback to run when the user confirms
* onCancel - (optional) The callback to run when the user cancels
* show - (optional) Whether or not to show the confirm element after it is created
* hide - (optional) Whether or not to hide the prompt element after submit

### Returns 

An object with the following values:

* element - a reference to the confirm box (div)
* blanket - a reference to the blanket element

## Alert Usage

### Parameters

`settings` - An object with the following possible keys:

* parent - (optional) The HTML element to which the alert element is appended
* className - (optional) A custom class to apply to the alert element
* okayText - (optional) String to display on the "okay" button
* contentType - (optional) They type of content that is passed in the "content" property
    - If left out, it is assumed to be text
    - If the value is "node", it's expecting a DOM node
    - If the value is "html", it's expecting an HTML string
* content - Content to display in the alert. Type must match the value passed into contentType
* onConfirm - (optional) The callback to run when the user confirms
* show - (optional) Whether or not to show the alert element after it is created
* hide - (optional) Whether or not to hide the prompt element after submit

### Returns

An object with the following values:

* element - a reference to the confirm box (div)
* blanket - a reference to the blanket element

## Prompt Usage

### Parameters

* parent - (optional) The HTML element to which the prompt element is appended
* className - (optional) A custom class to apply to the prompt element
* contentType - (optional) They type of content that is passed in the "content" property
    - If left out, it is assumed to be text
    - If the value is "node", it's expecting a DOM node
    - If the value is "html", it's expecting an HTML string
* content - Content to display in the alert. Type must match the value passed into contentType
* trim - (optional) Whether to trim whitespace on both sides of the user input on submit
* validate - (optional) A function that takes one parameter - the user input - and returns whether that input is valid
* invalidError - (optional) String to display as an error when the input is not valid
* confirmText - (optional) String to display on the "submit" button for the prompt
* onConfirm - (optional) The callback to run when the user submits the input
* allowCancel - (optional) Whether or not the user is allowed to cancel this prompt
* cancelText - (optional) String to display on the "cancel" button for the prompt
* onCancel - (optional) The callback to run whent the user cancels
* input - (optional) An element to act as the user input element (where the user enters/chooses a value)
* show - (optional) Whether or not to show the alert element after it is created
* hide - (optional) Whether or not to hide the prompt element after submit

### Returns

An object with the following values:

* element - a reference to the confirm box (div)
* blanket - a reference to the blanket element

## License

This work is licensed under [WTFPL](http://sam.zoy.org/wtfpl/)

              DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
                        Version 2, December 2004 

     Copyright (C) 2004 Sam Hocevar <sam@hocevar.net> 

     Everyone is permitted to copy and distribute verbatim or modified 
     copies of this license document, and changing it is allowed as long 
     as the name is changed. 

                DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
      TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

      0. You just DO WHAT THE FUCK YOU WANT TO. 
