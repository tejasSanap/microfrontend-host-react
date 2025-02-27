import React, { useEffect } from 'react';
import { mountRootParcel } from 'single-spa';

const AICenter = () => {
  useEffect(() => {
    let parcel;

    window.System.import('http://localhost:3000/build/microfrontends.js').then(
      (module) => {
        console.log("module2",module)
        return parcel = mountRootParcel(module.AICenterComponent, {
          domElement: document.getElementById('ai-center-container'),
        });
      }
    );

    return () => {
      if (parcel) {
        parcel.unmount();
      }
    };
  }, []);

  return <div id="ai-center-container" />;
};

export default AICenter;