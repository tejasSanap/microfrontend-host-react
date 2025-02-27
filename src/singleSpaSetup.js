import { registerApplication, start } from "single-spa";
// import { mountRootParcel } from 'single-spa';

registerApplication({
  name: "nextjsApp",
  app: () =>
    window.System.import("http://localhost:3000/build/microfrontends.js").then(
      (module) => {
        console.log("m2", module.default);
        return module.default.AICenterComponent;
      }
    ),
  activeWhen: "/test",
});

start();
