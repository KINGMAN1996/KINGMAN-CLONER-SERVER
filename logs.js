const COLOR = require(`chalk`);

exports.warn = (...message) => {
  console.log(COLOR.white(`<warn>`))
  console.warn(...message);
  console.log(COLOR.white(`</warn>`))
};

exports.error = (...message) => {
  console.log(COLOR.red(`<error>`))
  console.warn(...message);
  console.log(COLOR.red(`</error>`))
};

exports.info = (...message) => {
  console.log(COLOR.cyan(`INFO > ` + COLOR.white(...message)));
};

exports.message = message => {
  console.log(COLOR.cyan(`APP > ` + COLOR.white(...message)));
};

