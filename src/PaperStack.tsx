import React from "react";
import Paper from "./Paper";
import { loadFromLocalStorage } from "./utils";

export default function PaperStack({ images, username } :any) {
  return images.map( (imageSource :any) => {

    console.log(`PaperStack username: ${username}`);

    const handleDrawingChange = (lc: any) => {
      console.log(`handleDrawingChange username: ${username}`);
      const annotation = lc.getSnapshot(["shapes"]);
      console.log("Annotation changed:");
      console.log(annotation);
      if (localStorage.getItem(imageSource)) {
        const value = JSON.parse(localStorage.getItem(imageSource)||'');
        const newValue = { ...value, [username]: annotation };
        localStorage.setItem(imageSource, JSON.stringify(newValue));
      } else {
        const newValue = { [username]: annotation };
        localStorage.setItem(imageSource, JSON.stringify(newValue));
      }
    };
    
    const getUserSnapshot = () => {
      console.log(`getUserSnapshot username: ${username}`);
      let storedAnnotations = loadFromLocalStorage(imageSource);
      if (storedAnnotations) {
        if (username in storedAnnotations) {
          console.log(`Found stored annotations by user ${username}`);
          console.log(storedAnnotations[username]);
          return storedAnnotations[username];
        }
      }
      console.log(`Cannot find stored annotations by user ${username}.`);
      return { shapes: [] };
    };

    const getBackgroundShapes = () => {
      console.log(`getBackgroundShapes username: ${username}`);
      let shapes :any = [];
      let storedAnnotations = loadFromLocalStorage(imageSource);
      if (storedAnnotations) {
        for (const key in storedAnnotations) {
          if (key !== username) {
            if ("shapes" in storedAnnotations[key]) {
              shapes = [...shapes, ...storedAnnotations[key]["shapes"]];
            }
          }
        }
      }
      console.log("Background shapes initial:");
      console.log({ shapes });
      return { shapes };
    };

    return (
      <Paper
        key={imageSource + username} // important to force rerender on username change!
        username={username}
        imageSource={imageSource}
        snapshot={getUserSnapshot()}
        backgroundSnapshot={getBackgroundShapes()}
        onDrawingChange={handleDrawingChange}
      />
    );
  });
}
