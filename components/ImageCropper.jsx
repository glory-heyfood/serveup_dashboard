import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css"; // Import Cropper.js styles

const ImageCropper = forwardRef((props, ref) => {
  const cropperRef = useRef(null);

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    getImage() {
      return new Promise((resolve, reject) => {
        const cropper = cropperRef.current.cropper;

        if (cropper) {
          cropper.getCroppedCanvas().toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Failed to get cropped Blob."));
              }
            },
            "image/jpeg", // Format
            0.9 // Quality (0.0 to 1.0)
          );
        } else {
          reject(new Error("Cropper not initialized."));
        }
      });
    },
  }));

  return (
    <div>
      <Cropper
        src={props.image}
        style={{ height: 400, width: "100%" }}
        aspectRatio={1}
        guides={false}
        ref={cropperRef}
        scalable={true} // Allow scaling
        zoomable={true} // Allow zooming
        rotatable={true} // Allow rotating
      />
    </div>
  );
});

export default ImageCropper;
