// import React, { useEffect } from "react";
// import { mountRootParcel } from "single-spa";

// const AICenter = (props) => {
//   useEffect(() => {
//     let parcel;

//     window.System.import("http://localhost:3000/build/microfrontends.js").then(
//       (module) => {
//         console.log("module2", module);
//         return (parcel = mountRootParcel(module.AICenterComponent, {
//           domElement: document.getElementById("ai-center-container"),
//           ...props,
//         }));
//       }
//     );

//     return () => {
//       if (parcel) {
//         parcel.unmount();
//       }
//     };
//   }, []);

//   return <div id="ai-center-container" />;
// };

// export default AICenter;




// import React, { useEffect, useRef } from "react";
// import { mountRootParcel } from "single-spa";

// const AICenter = (props) => {
//   const parcelRef = useRef(null);
//   const containerRef = useRef(null);
//   console.log("props", props)
//   // Mount the parcel once when the component mounts
//   useEffect(() => {
//     window.System.import("http://localhost:3000/build/microfrontends.js").then(
//       (module) => {
//         const parcel = mountRootParcel(module.AICenterComponent, {
//           domElement: document.getElementById("ai-center-container"),
//           ...props,
//         });
//         parcelRef.current = parcel;
//         console.log("parcel", parcel);
//         parcel.mountPromise
//           .then(() => {
//             console.log("Parcel mounted successfully");
//           })
//           .catch((error) => {
//             console.error("Failed to mount parcel:", error);
//           });
//       }
//     );

//     // Cleanup: unmount the parcel when AICenter unmounts
//     return () => {
//       if (parcelRef.current) {
//         parcelRef.current.unmount().catch((error) => {
//           console.error("Failed to unmount parcel:", error);
//         });
//       }
//     };
//   }, []); // Empty dependency array: runs only on mount

//   // Update the parcel when props change
//   useEffect(() => {
//     console.log("props", props)
//     if (parcelRef.current && parcelRef.current.update) {
//       console.log("parcelRef update", parcelRef.current);

//       const clonedProps = {
//         domElement: document.getElementById("ai-center-container"),
//         ...props,
//       };
//       parcelRef.current
//         .update(clonedProps)
//         .then(() => {
//           console.log("Parcel updated successfully");
//         })
//         .catch((error) => {
//           console.error("Failed to update parcel:", error);
//         });
//     }
//   }, [props]); // Dependency on props (or specific props like props.id)

//   return <div ref={containerRef} id="ai-center-container" />;
// };

// export default AICenter;

// import React, { useEffect, useRef } from "react";
// import { mountRootParcel } from "single-spa";
// const AICenter = (props) => {
//   const parcelRef = useRef(null);
//   const containerRef = useRef(null);
  
//   // Mount the parcel once when the component mounts
//   useEffect(() => {
//     // Only create shadow root if it doesn't exist
//     if (!containerRef.current.shadowRoot) {
//       const shadowRoot = containerRef.current.attachShadow({ mode: 'open' });
      
//       // Create a style element instead of linking to external CSS
//       // const styleElement = document.createElement('style');
//       const styleElement = shadowRoot.querySelector('style') || document.createElement('style');
//       // Fetch the CSS content and inject it directly
//       fetch('http://localhost:3000/build/microfrontend1.css')
//         .then(response => response.text())
//         .then(cssText => {
//           // styleElement.textContent = cssText;

//           styleElement.textContent = '* { border: 2px solid red !important; }';
//           if (!shadowRoot.contains(styleElement)) {
//             shadowRoot.appendChild(styleElement);
//           }
//           // console.log("Style element content:", styleElement.textContent); // Verify CSS content
//           console.log("ShadowRoot before mount:", shadowRoot.innerHTML);
   
//           // shadowRoot.appendChild(styleElement)
          
//           // const styleElement222 = shadowRoot.querySelector('style');
//           // console.log("shadowRoot", shadowRoot);
//           // console.log("styleElement222", styleElement222);
//           // Load and mount the component only after CSS is loaded
//           loadAndMountComponent(shadowRoot,cssText);
//         })
//         .catch(error => {
//           console.error("Failed to load CSS:", error);
//           // Still try to mount the component even if CSS fails
//           loadAndMountComponent(shadowRoot,"");
//         });
//     } else {
//       // Shadow root already exists, just mount the component
//       loadAndMountComponent(containerRef.current.shadowRoot);
//     }
    
//     // Function to load and mount the component
//     function loadAndMountComponent(shadowRoot,cssText) {
//       window.System.import("http://localhost:3000/build/microfrontends.js")
//         .then((module) => {
//           const parcel = mountRootParcel(module.AICenterComponent, {
//             domElement: shadowRoot,
//             ...props,
//           });
          
//           parcelRef.current = parcel;
          
//           parcel.mountPromise
//             .then(() => {
//               console.log("Parcel mounted successfully");
//               console.log("ShadowRoot after mount:", shadowRoot.innerHTML);
//               const styleElementCheck = shadowRoot.querySelector('style');
//               if (!styleElementCheck && cssText) {
//                 const newStyleElement = document.createElement('style');
//                 newStyleElement.textContent = cssText; // Re-apply fetched CSS
//                 // shadowRoot.appendChild(newStyleElement);
//                 console.log("Re-appended style with fetched CSS, new ShadowRoot:", shadowRoot.innerHTML);
//               }
//             })
//             .catch((error) => {
//               console.error("Failed to mount parcel:", error);
//             });
//         })
//         .catch(error => {
//           console.error("Failed to load microfrontend module:", error);
//         });
//     }

//     // Cleanup: unmount the parcel when AICenter unmounts
//     return () => {
//       if (parcelRef.current) {
//         parcelRef.current.unmount().catch((error) => {
//           console.error("Failed to unmount parcel:", error);
//         });
//       }
//     };
//   }, []); // Empty dependency array: runs only on mount

//   // Update the parcel when props change
//   useEffect(() => {
//     if (parcelRef.current && parcelRef.current.update) {
//       const clonedProps = {
//         ...props,
//       };
      
//       // Note: We don't need to include domElement in updates
//       parcelRef.current
//         .update(clonedProps)
//         .then(() => {
//           console.log("Parcel updated successfully");
//         })
//         .catch((error) => {
//           console.error("Failed to update parcel:", error);
//         });
//     }
//   }, [props]); // Dependency on props

//   return <div ref={containerRef} id="ai-center-container" />;
// };



// export default AICenter;

// export default AICenter;



import React, { useEffect, useRef } from "react";
import { mountRootParcel } from "single-spa";

// import React, { useEffect, useRef } from "react";
// import { mountRootParcel } from "single-spa";

const AICenter = (props) => {
  const parcelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create Shadow DOM for style isolation
    const shadowRoot = containerRef.current.attachShadow({ mode: "open" });

    // Create a wrapper div inside Shadow DOM
    const wrapper = document.createElement("div");
    wrapper.id = "ai-center-container";
    shadowRoot.appendChild(wrapper);

    // Inject existing styles inside Shadow DOM
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "http://localhost:3000/build/microfrontend1.css"; // Adjust if necessary
    shadowRoot.appendChild(styleLink);

    // Now mount the microfrontend inside Shadow DOM
    window.System.import("http://localhost:3000/build/microfrontends.js").then(
      (module) => {
        const parcel = mountRootParcel(module.AICenterComponent, {
          domElement: wrapper, // Mounts inside Shadow DOM
          ...props,
        });
        parcelRef.current = parcel;
      }
    );

    return () => {
      if (parcelRef.current) {
        parcelRef.current.unmount().catch((error) => {
          console.error("Failed to unmount parcel:", error);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (parcelRef.current?.update) {
      const clonedProps = {
        domElement: containerRef.current.shadowRoot.querySelector("#ai-center-container"),
        ...props,
      };
      parcelRef.current.update(clonedProps).catch((error) => {
        console.error("Failed to update parcel:", error);
      });
    }
  }, [props]);

  return <div ref={containerRef} />;
};

// export default AICenter;

export default AICenter;
