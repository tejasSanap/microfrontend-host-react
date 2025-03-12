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
//   console.log("props", props);
//   // Mount the parcel once when the component mounts

//   const wrapper = document.createElement("div");
//   wrapper.className = "microfrontend-wrapper";
//   containerRef.current.appendChild(wrapper);

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
//     console.log("props", props);
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

//--heree--
// import React, { useEffect, useRef } from "react";
// import { mountRootParcel } from "single-spa";
// const AICenter = (props) => {
//   const parcelRef = useRef(null);
//   const containerRef = useRef(null);

//   // Mount the parcel once when the component mounts
//   useEffect(() => {
//     // Only create shadow root if it doesn't exist
//     if (!containerRef.current.shadowRoot) {
//       const shadowRoot = containerRef.current.attachShadow({ mode: "open" });

//       const styleElement =
//         shadowRoot.querySelector("style") || document.createElement("style");

//       fetch("http://localhost:3000/build/microfrontend.css")
//         .then((response) => response.text())
//         .then((cssText) => {
//           styleElement.textContent = "* { border: 2px solid red !important; }";
//           if (!shadowRoot.contains(styleElement)) {
//             shadowRoot.appendChild(styleElement);
//           }

//           console.log("ShadowRoot before mount:", shadowRoot.innerHTML);
//           loadAndMountComponent(shadowRoot, cssText);
//         })
//         .catch((error) => {
//           console.error("Failed to load CSS:", error);
//           loadAndMountComponent(shadowRoot, "");
//         });
//     } else {
//       loadAndMountComponent(containerRef.current.shadowRoot);
//     }

//     function loadAndMountComponent(shadowRoot, cssText) {
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
//               const styleElementCheck = shadowRoot.querySelector("style");
//               if (!styleElementCheck && cssText) {
//                 const newStyleElement = document.createElement("style");
//                 newStyleElement.textContent = cssText; // Re-apply fetched CSS

//                 // newStyleElement.textContent =
//                 //   "* { border: 2px solid red !important; }";
//                 // shadowRoot.appendChild(newStyleElement);
//                 console.log(
//                   "Re-appended style with fetched CSS, new ShadowRoot:",
//                   shadowRoot.innerHTML
//                 );
//               }
//             })
//             .catch((error) => {
//               console.error("Failed to mount parcel:", error);
//             });
//         })
//         .catch((error) => {
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

// import React, { useEffect, useRef } from "react";
// import { mountRootParcel } from "single-spa";

// import React, { useEffect, useRef } from "react";
// import { mountRootParcel } from "single-spa";

// const AICenter = (props) => {
//   const parcelRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Create Shadow DOM for style isolation
//     const shadowRoot = containerRef.current.attachShadow({ mode: "open" });

//     // Create a wrapper div inside Shadow DOM
//     const wrapper = document.createElement("div");
//     wrapper.id = "ai-center-container";
//     shadowRoot.appendChild(wrapper);

//     // Inject existing styles inside Shadow DOM
//     const styleLink = document.createElement("link");
//     styleLink.rel = "stylesheet";
//     styleLink.href = "http://localhost:3000/build/microfrontend1.css"; // Adjust if necessary
//     // shadowRoot.appendChild(styleLink);

//     // Now mount the microfrontend inside Shadow DOM
//     window.System.import("http://localhost:3000/build/microfrontends.js").then(
//       (module) => {
//         const parcel = mountRootParcel(module.AICenterComponent, {
//           domElement: wrapper, // Mounts inside Shadow DOM
//           ...props,
//         });
//         parcelRef.current = parcel;
//       }
//     );

//     return () => {
//       if (parcelRef.current) {
//         parcelRef.current.unmount().catch((error) => {
//           console.error("Failed to unmount parcel:", error);
//         });
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (parcelRef.current?.update) {
//       const clonedProps = {
//         domElement: containerRef.current.shadowRoot.querySelector(
//           "#ai-center-container"
//         ),
//         ...props,
//       };
//       parcelRef.current.update(clonedProps).catch((error) => {
//         console.error("Failed to update parcel:", error);
//       });
//     }
//   }, [props]);

//   return <div ref={containerRef} />;
// };

// export default AICenter;
//--newer---
// import React, { useEffect, useRef } from "react";
// import { mountRootParcel } from "single-spa";

// const AICenter = (props) => {
//   const parcelRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const shadowRoot = containerRef.current.attachShadow({ mode: "open" });

//     // Create a wrapper div inside the Shadow DOM
//     const wrapper = document.createElement("div");
//     // wrapper.className = "microfrontend-wrapper";
//     wrapper.className = "microfrontend-wrapper";

//     shadowRoot.appendChild(wrapper);

//     // Fetch and apply the Tailwind CSS
//     fetch("http://localhost:3000/build/microfrontend2.css")
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to fetch CSS");
//         return response.text();
//       })
//       .then((cssText) => {
//         const styleElement = document.createElement("style");
//         // styleElement.textContent = cssText;

//         styleElement.textContent = `
//           :host {
//             --primary:rgb(168, 190, 224);
//             --primary-foreground: #ffffff;
//             --destructive: #ef4444;
//             --destructive-foreground: #ffffff;
//             --secondary: #6b7280;
//             --secondary-foreground: #ffffff;
//             --background: #ffffff;
//             --input: #d1d5db;
//             --accent: #f3f4f6;
//             --accent-foreground: #111827;
//             --ring: #60a5fa;
//           }
//           ${cssText}
//         `;
//         shadowRoot.appendChild(styleElement);
//         console.log("CSS applied to ShadowRoot:", cssText.substring(0, 100));
//         loadAndMountComponent(wrapper); // Pass the wrapper as domElement
//       })
//       .catch((error) => {
//         console.error("Failed to load CSS:", error);
//         loadAndMountComponent(wrapper);
//       });

//     function loadAndMountComponent(domElement) {
//       window.System.import("http://localhost:3000/build/microfrontends.js")
//         .then((module) => {
//           const parcel = mountRootParcel(module.AICenterComponent, {
//             domElement,
//             ...props,
//           });
//           parcelRef.current = parcel;

//           parcel.mountPromise
//             .then(() => {
//               console.log("Parcel mounted successfully");
//               console.log("ShadowRoot after mount:", shadowRoot.innerHTML);
//             })
//             .catch((error) => {
//               console.error("Failed to mount parcel:", error);
//             });
//         })
//         .catch((error) => {
//           console.error("Failed to load microfrontend module:", error);
//         });
//     }

//     return () => {
//       if (parcelRef.current) {
//         parcelRef.current.unmount().catch((error) => {
//           console.error("Failed to unmount parcel:", error);
//         });
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (parcelRef.current && parcelRef.current.update) {
//       parcelRef.current
//         .update({ ...props })
//         .then(() => {
//           console.log("Parcel updated successfully");
//         })
//         .catch((error) => {
//           console.error("Failed to update parcel:", error);
//         });
//     }
//   }, [props]);

//   return <div ref={containerRef} id="ai-center-container" />;
// };

// export default AICenter;

import React, { useEffect, useRef } from "react";
import { mountRootParcel } from "single-spa";

const AICenter = (props) => {
  const parcelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const wrapper = document.createElement("div");
    wrapper.className = "microfrontend-wrapper";
    containerRef.current.appendChild(wrapper);

    function loadAndMountComponent(domElement) {
      window.System.import("http://localhost:3000/build/microfrontends.js")
        .then((module) => {
          const parcel = mountRootParcel(module.AICenterComponent, {
            domElement,
            ...props,
          });
          parcelRef.current = parcel;

          parcel.mountPromise
            .then(() => {
              console.log("Parcel mounted successfully");
              console.log("DOM after mount:", domElement.innerHTML);
            })
            .catch((error) => {
              console.error("Failed to mount parcel:", error);
            });
        })
        .catch((error) => {
          console.error("Failed to load microfrontend module:", error);
        });
    }

    loadAndMountComponent(wrapper);

    return () => {
      if (parcelRef.current) {
        parcelRef.current.unmount().catch((error) => {
          console.error("Failed to unmount parcel:", error);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (parcelRef.current && parcelRef.current.update) {
      parcelRef.current
        .update({ ...props })
        .then(() => {
          console.log("Parcel updated successfully");
        })
        .catch((error) => {
          console.error("Failed to update parcel:", error);
        });
    }
  }, [props]);

  return <div ref={containerRef} id="ai-center-container" />;
};

// export default AICenter;
export default AICenter;
