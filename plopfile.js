const generateComponent = require("./generate/component");
const promptDirectory = require("inquirer-directory");

module.exports = function (plop) {
  plop.setPrompt("directory", promptDirectory);
  plop.setGenerator("component", generateComponent);
};
