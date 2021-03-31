var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
__markAsModule(exports);
__export(exports, {
  default: () => backend_default
});
var backend_default = (App) => {
  return class extends App {
    register() {
      console.log(`BackendApp for ${this.config.name} registered.`);
    }
  };
};
