
exports = module.exports = function(title) {
	// What happens when you set process.title differs by platform.
	// On *nix, it changes the process name in the process table, which is not really desireable for us.
	// On Windows, you can't change the name of a running process, so libuv just calls SetConsoleTitle.
	// So for our purposes, setting process.title is fine on Windows.  For everyone else, we'll write
	// the ANSI OSC escape code for the terminal emulator to handle.
	// (ANSI escapes are parsed and discarded by libuv on Windows)
	// see also: https://github.com/daguej/node-windows-console-title/issues/1

	if (process.platform == 'win32') {
		process.title = title;
	} else {
		process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
	}
};

