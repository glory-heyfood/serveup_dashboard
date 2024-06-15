import { pauseIconRed, storeSettingStatusIcon } from "@/SVGs";
import {
  getSingleStore,
  updateStoreIsOpenObj,
} from "@/redux/features/business/storeSlice";
import {
  checkIsStoreOpen,
  checkStoreStatus,
  listenForStorageChanges,
  setItemWithEvent,
} from "@/utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Status = ({ isOpen, message, id }) => {
  const data = useSelector((state) => state.stores.data);
  const dispatch = useDispatch();
  const [open, setOpen] = useState({});

  useEffect(() => {
    const businessHours = JSON.parse(
      window.localStorage.getItem("serveup_store")
    )?.business_hours;
    const isOpenStatus = JSON.parse(
      window.localStorage.getItem("serveup_store")
    )?.isopen;
    const isOpenObj = checkStoreStatus(businessHours, isOpenStatus);
    // if (!isOpenObj?.status) {
    //   const isOpen = checkIsStoreOpen(isOpenObj);
    //   if (isOpen) {
    //     setItemWithEvent(
    //       "store_isOpen",
    //       JSON.stringify({
    //         status: true,
    //         message: "Your store is currently open",
    //         referenceDate: "",
    //       })
    //     );
    //     updateIsOpen();
    //   } else {
    //     setItemWithEvent("store_isOpen", JSON.stringify(isOpenObj));
    //     updateIsOpen();
    //   }
    // } else {
    //   setItemWithEvent("store_isOpen", JSON.stringify(isOpenObj));
    //   updateIsOpen();
    // }
    setItemWithEvent("store_isOpen", JSON.stringify(isOpenObj));
    setOpen(isOpenObj);

    // updateIsOpen();
  }, []);

  const updateIsOpen = () => {
    const isOpen = JSON.parse(localStorage.getItem("store_isOpen"));
    setOpen(isOpen);
  };

  listenForStorageChanges(updateIsOpen, "store_isOpen");

  return (
    <div
      className={`${
        open?.status
          ? "border-[#FFD6BF]"
          : open?.message === "Your store is closed indefinitely"
          ? "border-[#FFD1D1]"
          : "border-[#FFD6BF]"
      } flex items-center rounded-[4px] py-[0.75rem] px-[1rem] space-x-[0.5rem] w-full `}
      style={{
        backgroundColor: `${
          open?.status
            ? "#F1F5FF"
            : open?.message === "Your store is closed indefinitely"
            ? "rgba(240, 28, 28, 0.10)"
            : "rgba(245, 100, 18, 0.10)"
        }`,
      }}
    >
      <span>
        {open?.status
          ? storeSettingStatusIcon("#072A85")
          : open?.message === "Your store is closed indefinitely"
          ? pauseIconRed
          : storeSettingStatusIcon("#F56412")}
      </span>

      <h2
        className={`${
          open?.status
            ? "text-[#072A85]"
            : open?.message === "Your store is closed indefinitely"
            ? "text-[#F01C1C]"
            : "text-[#F56412]"
        } text-[0.75rem] sodo700 tracking-[-0.48px] capitalize `}
      >
        {open?.message}
      </h2>
    </div>
  );
};

export default Status;
