export default (App) => {
  return class extends App {
    register() {
      console.log(`BackendApp for ${this.config.name} registered.`);
    }
  };
};
