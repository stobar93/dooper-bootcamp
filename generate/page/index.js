module.exports = {
  description: "Generates new React component",
  prompts: [
    {
      type: "directory",
      name: "directory",
      message: "Where would you like to place this component?",
      basePath: "./pages"
    },
    {
      type: "input",
      name: "name",
      message: "Page name?",
      validate: function (value) {
        let message = true;
        if (!/.+/.test(value)) {
          message = console.error("Missing", "you must define a page name");
        } else if (value.length < 3) {
          message = console.error(
            "Too Short",
            `"${value}" is not descriptive enough`
          );
        }
        return message;
      }
    }
  ],
  actions: (answers) => {
    let directory = answers.directory;

    let files = [
      {
        type: "add",
        path: `pages/${directory}/{{dashCase name}}.tsx`,
        templateFile: "generate/page/templates/page.tsx.hbs"
      }
    ];

    return files;
  }
};
