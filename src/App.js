import { Model } from './Model/model.js';
import { Controller } from './Controller/controller.js';
import { View } from './View/view.js';

class App {
  constructor() {
    const view = new View();
    const model = new Model();
    const controller = new Controller(view, model);

    controller.initApp();
  }
}

new App();
