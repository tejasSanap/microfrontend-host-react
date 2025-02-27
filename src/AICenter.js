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
import React, { useEffect, useRef } from "react";
import { mountRootParcel } from "single-spa";

const AICenter = (props) => {
  const parcelRef = useRef(null);

  // Mount the parcel once when the component mounts
  useEffect(() => {
    window.System.import("http://localhost:3000/build/microfrontends.js").then(
      (module) => {
        const parcel = mountRootParcel(module.AICenterComponent, {
          domElement: document.getElementById("ai-center-container"),
          ...props,
        });
        parcelRef.current = parcel;
        console.log("parcel", parcel);
        parcel.mountPromise
          .then(() => {
            console.log("Parcel mounted successfully");
          })
          .catch((error) => {
            console.error("Failed to mount parcel:", error);
          });
      }
    );

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
      console.log("parcelRef update", parcelRef.current);

      const clonedProps = {
        domElement: document.getElementById("ai-center-container"),
        ...props,
      };
      parcelRef.current
        .update(clonedProps)
        .then(() => {
          console.log("Parcel updated successfully");
        })
        .catch((error) => {
          console.error("Failed to update parcel:", error);
        });
    }
  }, [props]); // Dependency on props (or specific props like props.id)

  return <div id="ai-center-container" />;
};

export default AICenter;
