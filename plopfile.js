const generateComponent = require("./generate/component");
const generatePage = require("./generate/page");
const promptDirectory = require("inquirer-directory");

module.exports = function (plop) {
  plop.setPrompt("directory", promptDirectory);
  plop.setGenerator("component", generateComponent);
  plop.setGenerator("page", generatePage);
};
