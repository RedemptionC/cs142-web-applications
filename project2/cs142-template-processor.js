window.Cs142TemplateProcessor = class Cs142TemplateProcessor {
  constructor(template) {
    this.template = template;
  }
  fillIn(dictionary) {
    let filled = this.template;
    // for each key in this dict, we check wether there
    // is a corresponding placeholder in the template
    // if so, we replace it with the value
    for (const [key, value] of Object.entries(dictionary)) {
      if (filled.match(`{{${key}}}`) != null) {
        filled = filled.replace(`{{${key}}}`, value);
      }
    }
    // for those placeholders which don't have a corresponding
    // value in the dict, we change it to empty str
    filled = filled.replaceAll(/{{[a-zA-Z0-9]*}}/g, "");
    return filled;
  }
};
