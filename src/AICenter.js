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
import React, { useEffect, useRef } from "react";
import { mountRootParcel } from "single-spa";
const AICenter = (props) => {
  const parcelRef = useRef(null);
  const containerRef = useRef(null);

  // Mount the parcel once when the component mounts
  useEffect(() => {
    // Only create shadow root if it doesn't exist
    if (!containerRef.current.shadowRoot) {
      const shadowRoot = containerRef.current.attachShadow({ mode: "open" });

      const styleElement =
        shadowRoot.querySelector("style") || document.createElement("style");

      fetch("http://localhost:3000/build/microfrontend.css")
        .then((response) => response.text())
        .then((cssText) => {
          styleElement.textContent = "* { border: 2px solid red !important; }";
          if (!shadowRoot.contains(styleElement)) {
            shadowRoot.appendChild(styleElement);
          }

          console.log("ShadowRoot before mount:", shadowRoot.innerHTML);
          loadAndMountComponent(shadowRoot, cssText);
        })
        .catch((error) => {
          console.error("Failed to load CSS:", error);
          loadAndMountComponent(shadowRoot, "");
        });
    } else {
      loadAndMountComponent(containerRef.current.shadowRoot);
    }

    function loadAndMountComponent(shadowRoot, cssText) {
      window.System.import("http://localhost:3000/build/microfrontends.js")
        .then((module) => {
          const parcel = mountRootParcel(module.AICenterComponent, {
            domElement: shadowRoot,
            ...props,
          });

          parcelRef.current = parcel;

          parcel.mountPromise
            .then(() => {
              console.log("Parcel mounted successfully");
              console.log("ShadowRoot after mount:", shadowRoot.innerHTML);
              const styleElementCheck = shadowRoot.querySelector("style");
              if (!styleElementCheck && cssText) {
                const newStyleElement = document.createElement("style");
                newStyleElement.textContent = cssText; // Re-apply fetched CSS

                // newStyleElement.textContent =
                //   "* { border: 2px solid red !important; }";
                // shadowRoot.appendChild(newStyleElement);
                console.log(
                  "Re-appended style with fetched CSS, new ShadowRoot:",
                  shadowRoot.innerHTML
                );
              }
            })
            .catch((error) => {
              console.error("Failed to mount parcel:", error);
            });
        })
        .catch((error) => {
          console.error("Failed to load microfrontend module:", error);
        });
    }

    // Cleanup: unmount the parcel when AICenter unmounts
    return () => {
      if (parcelRef.current) {
        parcelRef.current.unmount().catch((error) => {
          console.error("Failed to unmount parcel:", error);
        });
      }
    };
  }, []); // Empty dependency array: runs only on mount

  // Update the parcel when props change
  useEffect(() => {
    if (parcelRef.current && parcelRef.current.update) {
      const clonedProps = {
        ...props,
      };

      // Note: We don't need to include domElement in updates
      parcelRef.current
        .update(clonedProps)
        .then(() => {
          console.log("Parcel updated successfully");
        })
        .catch((error) => {
          console.error("Failed to update parcel:", error);
        });
    }
  }, [props]); // Dependency on props

  return <div ref={containerRef} id="ai-center-container" />;
};

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

const AICenter6 = (props) => {
  const parcelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const shadowRoot = containerRef.current.attachShadow({ mode: "open" });

    // Create a wrapper div inside the Shadow DOM
    const wrapper = document.createElement("div");
    // wrapper.className = "microfrontend-wrapper";
    wrapper.className = "microfrontend-wrapper";

    shadowRoot.appendChild(wrapper);

    // Fetch and apply the Tailwind CSS
    fetch("http://localhost:3000/build/microfrontend2.css")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch CSS");
        return response.text();
      })
      .then((cssText) => {
        const styleElement = document.createElement("style");
        // styleElement.textContent = cssText;

        styleElement.textContent = `
          :host {
              --foreground: oklch(0.145 0 0);
              --card: oklch(1 0 0);
              --card-foreground: oklch(0.145 0 0);
              --popover: oklch(1 0 0);
              --popover-foreground: oklch(0.145 0 0);
              --primary: oklch(0.205 0 0);
              --primary-foreground: oklch(0.985 0 0);
              --secondary: oklch(0.97 0 0);
              --secondary-foreground: oklch(0.205 0 0);
              --muted: oklch(0.97 0 0);
              --muted-foreground: oklch(0.556 0 0);
              --accent: oklch(0.97 0 0);
              --accent-foreground: oklch(0.205 0 0);
              --destructive: oklch(0.577 0.245 27.325);
              --destructive-foreground: oklch(0.577 0.245 27.325);
              --border: oklch(0.922 0 0);
              --input: oklch(0.922 0 0);
              --ring: oklch(0.708 0 0);
              --chart-1: oklch(0.646 0.222 41.116);
              --chart-2: oklch(0.6 0.118 184.704);
              --chart-3: oklch(0.398 0.07 227.392);
              --chart-4: oklch(0.828 0.189 84.429);
              --chart-5: oklch(0.769 0.188 70.08);
              --radius: 0.625rem;
              --sidebar: oklch(0.985 0 0);
              --sidebar-foreground: oklch(0.145 0 0);
              --sidebar-primary: oklch(0.205 0 0);
              --sidebar-primary-foreground: oklch(0.985 0 0);
              --sidebar-accent: oklch(0.97 0 0);
              --sidebar-accent-foreground: oklch(0.205 0 0);
              --sidebar-border: oklch(0.922 0 0);
              --sidebar-ring: oklch(0.708 0 0);
          }
          ${cssText}
        `;
        shadowRoot.appendChild(styleElement);
        console.log("CSS applied to ShadowRoot:", cssText.substring(0, 100));
        loadAndMountComponent(wrapper); // Pass the wrapper as domElement
      })
      .catch((error) => {
        console.error("Failed to load CSS:", error);
        loadAndMountComponent(wrapper);
      });

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
              console.log("ShadowRoot after mount:", shadowRoot.innerHTML);
            })
            .catch((error) => {
              console.error("Failed to mount parcel:", error);
            });
        })
        .catch((error) => {
          console.error("Failed to load microfrontend module:", error);
        });
    }

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

export default AICenter6;



// import React, { useEffect, useRef } from "react";
// import { mountRootParcel } from "single-spa";

const AICenter2 = (props) => {
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
// import React, { useRef, useEffect } from 'react';

const AICenter3 = (props) => {
  const parcelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a wrapper div and attach a shadow root
    const wrapper = document.createElement('div');
    wrapper.className = 'microfrontend-wrapper';
    const shadow = wrapper.attachShadow({ mode: 'open' });
    containerRef.current.appendChild(wrapper);

    // Set up MutationObserver to intercept style tags added to document.head
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === 'STYLE') {
            console.log('Moving style tag to shadow root');
            shadow.appendChild(node);
          }
        });
      });
    });

    // Observe changes to document.head
    observer.observe(document.head, { childList: true });

    // Function to load and mount the microfrontend
    function loadAndMountComponent(domElement) {
      window.System.import('http://localhost:3000/build/microfrontends.js')
        .then((module) => {
          const parcel = window.singleSpa.mountRootParcel(module.AICenterComponent, {
            domElement,
            ...props,
          });
          parcelRef.current = parcel;

          parcel.mountPromise
            .then(() => {
              console.log('Parcel mounted successfully');
              console.log('DOM after mount:', domElement.innerHTML);
            })
            .catch((error) => {
              console.error('Failed to mount parcel:', error);
            });
        })
        .catch((error) => {
          console.error('Failed to load microfrontend module:', error);
        });
    }

    // Mount the microfrontend inside the shadow root
    loadAndMountComponent(shadow);

    // Cleanup function
    return () => {
      observer.disconnect();
      if (parcelRef.current) {
        parcelRef.current.unmount().catch((error) => {
          console.error('Failed to unmount parcel:', error);
        });
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Update the parcel when props change
  useEffect(() => {
    if (parcelRef.current && parcelRef.current.update) {
      parcelRef.current
        .update({ ...props })
        .then(() => {
          console.log('Parcel updated successfully');
        })
        .catch((error) => {
          console.error('Failed to update parcel:', error);
        });
    }
  }, [props]); // Runs whenever props change

  return <div ref={containerRef} id="ai-center-container" />;
};

// import { mountRootParcel } from 'single-spa'; // Import mountRootParcel from single-spa
// import { useRef, useEffect } from 'react';

const AICenter4 = (props) => {
  const parcelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a wrapper div and attach a shadow root
    const wrapper = document.createElement('div');
    wrapper.className = 'microfrontend-wrapper';
    const shadow = wrapper.attachShadow({ mode: 'open' });
    containerRef.current.appendChild(wrapper);

    // Create a container for the microfrontend content inside the shadow root
    const contentContainer = document.createElement('div');
    shadow.appendChild(contentContainer);
    function copyRootVariables() {
      let rootVars = "";
      Array.from(document.styleSheets).forEach((sheet) => {
        try {
          Array.from(sheet.cssRules).forEach((rule) => {
            if (rule.selectorText === ":root") {
              rootVars += rule.cssText + "\n";
            }
          });
        } catch (e) {
          console.warn("Skipping CORS-restricted stylesheet:", sheet.href);
        }
      });

      if (rootVars) {
        const rootStyle = document.createElement("style");
        rootStyle.textContent = rootVars;
        shadow.appendChild(rootStyle);
      }
    }

    function copyExistingStyles() {
      const globalStyles = Array.from(document.styleSheets)
        .map((sheet) => {
          try {
            return Array.from(sheet.cssRules)
              .map((rule) => rule.cssText)
              .join("\n");
          } catch (e) {
            console.warn("Skipping CORS-restricted stylesheet:", sheet.href);
            return "";
          }
        })
        .join("\n");

      const styleElement = document.createElement("style");
      styleElement.textContent = globalStyles;
      shadow.appendChild(styleElement);
    }

    // Copy all existing styles to the shadow DOM
    copyExistingStyles();
    // Set up MutationObserver to intercept style tags added to document.head
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === 'STYLE') {
            console.log('Cloning and moving style tag to shadow root');
            // Clone the style tag and append the clone to the shadow root
            const clone = node.cloneNode(true);
            
            shadow.appendChild(clone);
            // Remove the original from document.head to avoid duplicates
            node.parentNode.removeChild(node);
          }
        });
      });
    });

    // Observe changes to document.head
    observer.observe(document.head, { childList: true });

    // Function to load and mount the microfrontend
    function loadAndMountComponent(domElement) {
      window.System.import('http://localhost:3000/build/microfrontends.js')
        .then((module) => {
          // Use mountRootParcel instead of window.singleSpa.mountRootParcel
          const parcel = mountRootParcel(module.AICenterComponent, {
            domElement, // Mount to contentContainer
            ...props,
          });
          parcelRef.current = parcel;

          parcel.mountPromise
            .then(() => {
              console.log('Parcel mounted successfully');
              console.log('Shadow root content:', shadow.innerHTML); // Log to verify styles
            })
            .catch((error) => {
              console.error('Failed to mount parcel:', error);
            });
        })
        .catch((error) => {
          console.error('Failed to load microfrontend module:', error);
        });
    }

    // Mount the microfrontend inside the contentContainer
    loadAndMountComponent(contentContainer);

    // Cleanup function
    return () => {
      observer.disconnect();
      if (parcelRef.current) {
        parcelRef.current.unmount().catch((error) => {
          console.error('Failed to unmount parcel:', error);
        });
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Update the parcel when props change
  useEffect(() => {
    if (parcelRef.current && parcelRef.current.update) {
      parcelRef.current
        .update({ ...props })
        .then(() => {
          console.log('Parcel updated successfully');
        })
        .catch((error) => {
          console.error('Failed to update parcel:', error);
        });
    }
  }, [props]); // Runs whenever props change

  return <div ref={containerRef} id="ai-center-container" />;
};

// export default AICenter4;

// export default AICenter2;
// export default AICenter;
// export default AICenter3;
