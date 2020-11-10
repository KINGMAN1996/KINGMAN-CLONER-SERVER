console-title
=============

Allows you to rename the GUI window your application is running in.

    var setTitle = require('console-title');
    setTitle('Hi mom!');

![Console window example](http://i.imgur.com/JFIlPQX.png)

On unix, this is done through an ANSI OSC escape sequence written to stdout.  Your terminal emulator must support the escape sequence.

On Windows, this is accomplished though a call to the native `SetConsoleTitle` API; thus, you must have a working build environment for this module to function.  However, if the native code build fails, your application will still work.  Calls to set the console title will be silently ignored.