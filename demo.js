(function() {
    var confirmButton = document.getElementById('confirmButton'),
        alertButton = document.getElementById('alertButton'),
        promptButton = document.getElementById('promptButton'),
        output = document.getElementById('output');

    confirmButton.addEventListener('click', function(e) {
        cap.confirm(
            'Pretty cool, right?',
            function() {
                var d = document.createElement('div');

                d.appendChild(document.createTextNode('Glad you like it!'));
                output.appendChild(d);
            }
        );
    });

    alertButton.addEventListener('click', function(e) {
        cap.alert(
            'This is an alert',
            function() {
                var d = document.createElement('div');
                d.appendChild(document.createTextNode('Alert box confirmed'));
                output.appendChild(d);
            }
        );
    });

    promptButton.addEventListener('click', function(e) {
        cap.prompt(
            'What is your favorite number?',
            function(e, data) {
                var d = document.createElement('div');
                d.appendChild(document.createTextNode('I like ' + data + ' too'));
                output.appendChild(d);
            }
        );
    });
})();