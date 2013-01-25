(function() {
    var confirmButton = document.getElementById('confirmButton'),
        alertButton = document.getElementById('alertButton'),
        promptButton = document.getElementById('promptButton'),
        output = document.getElementById('output');

    confirmButton.addEventListener('click', function(e) {
        cap.confirm({
            message: 'Pretty cool, right?',
            onConfirm: function() {
                var d = document.createElement('div');

                d.appendChild(document.createTextNode('Glad you like it!'));
                output.appendChild(d);
            },
            onCancel: function() {
                var d = document.createElement('div');

                d.appendChild(document.createTextNode('Wrong answer ;-)'));
                output.appendChild(d);
            }
        })
    });

    alertButton.addEventListener('click', function(e) {
        cap.alert({
            content: 'This is an alert',
            onConfirm: function() {
                var d = document.createElement('div');
                d.appendChild(document.createTextNode('Alert box confirmed'));
                output.appendChild(d);
            }
        });
    });

    promptButton.addEventListener('click', function(e) {
        cap.prompt({
            content: 'What is your favorite number?',
            onConfirm: function(e, data) {
                var d = document.createElement('div');
                d.appendChild(document.createTextNode('I like ' + data + ' too'));
                output.appendChild(d);
            }
        });
    });
})();