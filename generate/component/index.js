module.exports = {
  description: "Generates new React component",
  prompts: [
    {
      type: "directory",
      name: "directory",
      message: "Where would you like to place this component?",
      basePath: "./src/components"
    },
    {
      type: "input",
      name: "name",
      message: "Component name?",
      validate: function (value) {
        let message = true;
        if (!/.+/.test(value)) {
          message = console.error(
            "Missing",
            "you must define a component name"
          );
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
    const split = answers.directory.split("/");

    let directory = answers.directory;
    console.log({ directory, split });
    if (directory !== "" && split[split.length - 1] !== "components") {
      split.push("components");
      directory = split.join("/");
    }

    let componentFiles = [
      {
        type: "add",
        path: `src/components/${directory}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        templateFile: "generate/component/templates/component.tsx.hbs"
      },
      {
        type: "add",
        path: `src/components/${directory}/{{pascalCase name}}/index.ts`,
        templateFile: "generate/component/templates/index.ts.hbs"
      },
      {
        type: "add",
        path: `src/components/${directory}/{{pascalCase name}}/styles.tsx`,
        templateFile: "generate/component/templates/styles.tsx.hbs"
      }
    ];

    return componentFiles;
  }
};
