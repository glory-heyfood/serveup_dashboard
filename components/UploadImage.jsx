/* eslint-disable @next/next/no-img-element */
import { XIconRed, editIcon, uploadPhotoIcon } from "@/SVGs";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ImageCropper from "./ImageCropper";
import Modal from "./modal/Modal";
import { uploadImageToAzure } from "./uploadImageToAzure";
import { toast } from "react-toastify";
import { toastOptions } from "@/utils";
import { useDispatch } from "react-redux";
import {
  generateSasToken,
  uploadImageToAzureAsync,
} from "@/redux/features/stores/menuSlice";
import { BlobServiceClient } from "@azure/storage-blob";

const UploadImage = ({ padding, border, handleImage, image }) => {
  const [uploadedImage, setUploadedImage] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [getCroppedImage, setGetCroppedImage] = useState(false);
  const fileInputRef = useRef(null);
  const childRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [imageName, setImageName] = useState("");
  const [azureImage, setAzureImage] = useState("");
  const [token, setToken] = useState();

  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const image = event.target.result;
      setUploadedImage(image);
      setShowCropper(true);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChangeImage = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const saveImage = async () => {
    const name = new Date().getTime();
    setImageName(`${name}.jpg`);
    setLoading(true);
    try {
      // getting the croppedImage from ImageCropper
      let croppedImage = await childRef.current.getImage();
      setCroppedImage(croppedImage);
      console.log(croppedImage);
      let token = {};
      let imageUrl = "";
      dispatch(generateSasToken({ name: "" }))
        .unwrap()
        .then((res) => {
          token = res.data.token;
          //upload to azure
          setToken(token);
        })
        .catch((err) => {
          console.log(err);
        });

      // Generate the URL to the blob
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(
        err ? err : "An error occured while uploading image",
        toastOptions
      );
    }
  };

  const getImageUrl = async () => {
    const blobServiceClient = new BlobServiceClient(token.url);
    const containerClient = blobServiceClient.getContainerClient(
      token.containerName
    );
    const blobName = `${imageName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(croppedImage, croppedImage.size, {
      blobHTTPHeaders: {
        blobContentType: "image/jpeg", // Set the correct MIME type
      },
    });
    const finalImage = blockBlobClient.url.split("?"); //this is to remove the extra long stuff attached to the url, we only need the first index
    handleImage(finalImage[0]);
    setAzureImage(finalImage[0]);
    setLoading(false);
    setShowCropper(false);
  };

  useEffect(() => {
    if (token) {
      getImageUrl();
    }
  }, [token]);

  useEffect(() => {
    console.log(image, "imageispo");
    setAzureImage(image);
  }, [image]);

  return (
    <div className="w-full md:w-[210px]">
      <label
        {...getRootProps()}
        className={`  ${
          border ? border : "border border-[#E6E6E6] "
        }   rounded-[8px] cursor-pointer flex items-center justify-center w-full md:w-[210px]  ${
          azureImage === "" ? (padding ? padding : "py-[40px]") : ""
        } `}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        {azureImage ? (
          <img
            src={azureImage}
            alt="Uploaded"
            className="h-[210px] w-[210px] object-cover rounded-[8px]"
          />
        ) : (
          <div className="flex flex-col space-y-[8px] items-center">
            <span>{uploadPhotoIcon}</span>
            <h2 className="text-[#7E8493] sodo400 tracking-[-0.52px] text-[13px] text-center">
              Drag & drop <br /> or{" "}
              <span className="sodo700 text-[#072A85]">choose file</span> to
              upload
            </h2>
            <h2 className="text-[#7E8493] sodo300 tracking-[-0.48px] text-[12px]">
              Maximum file size: 1MB
            </h2>
            <h2 className="text-[#7E8493] sodo300 tracking-[-0.48px] text-[12px]">
              JPG or PNG
            </h2>
          </div>
        )}
      </label>

      {azureImage && (
        <div className="flex items-center justify-between mt-[16px]">
          <div
            className="flex items-center space-x-[4px] cursor-pointer"
            onClick={handleChangeImage}
          >
            <span> {editIcon} </span>
            <h2 className="text-[#072A85] text-[12px] tracking-[-0.48px] sodo700">
              Change Image
            </h2>
          </div>
          <div
            className="flex items-center space-x-[4px] cursor-pointer"
            onClick={() => {
              setUploadedImage("");
              setAzureImage("");
              handleImage("");
            }}
          >
            <span> {XIconRed} </span>
            <h2 className="text-[#F01C1C] text-[12px] tracking-[-0.48px] sodo700">
              Remove Image
            </h2>
          </div>
        </div>
      )}

      {showCropper && (
        <Modal
          handleClick={saveImage}
          header="Edit Image"
          handleCancel={() => {
            setShowCropper(false);
            setCroppedImage("");
            setUploadedImage("");
            setLoading(false);
          }}
          btnLoading={loading}
        >
          <ImageCropper
            image={uploadedImage}
            ref={childRef}
            setCroppedImage={(img) => {
              setCroppedImage(img);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default UploadImage;
