import React, { useEffect } from "react";
import  * as LC from "literallycanvas";

import "./Paper.css";

export default function Paper({
  imageSource,
  snapshot,
  backgroundSnapshot,
  onDrawingChange
} :any) {

  const generateBackgroundShapes = () => {
    let backgroundImage = new Image();
    backgroundImage.src = imageSource;

    const backgroundShapes = [
      LC.createShape("Image", { image: backgroundImage })
    ];
    const shapes = LC.snapshotToShapes(backgroundSnapshot);
    if (shapes) {
      return backgroundShapes.concat(shapes);
    }
    return backgroundShapes;
  };

  const handleInit = (lc: any) => {
    lc.on("drawingChange", () => onDrawingChange(lc));
  };

  return (
    <LC.LiterallyCanvasReactComponent
      onInit={handleInit}
      snapshot={snapshot}
      backgroundShapes={generateBackgroundShapes()}
      imageURLPrefix="img"
    />
  );
}
