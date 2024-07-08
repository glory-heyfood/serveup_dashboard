"use client";
import React, { useEffect, useState } from "react";
import DashHeader from "./DashHeader";
import StoreSideBar from "../sidebar/StoreSideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorNewOrdersForTheDay } from "@/redux/features/stores/orderSlice";
import Notification from "./Notification";

const StoreDashLayout = ({ children, btn }) => {
  const newOrders = useSelector((state) => state.order.newOrders);
  const dispatch = useDispatch();
  const fetchOrdersRecursively = () => {
    dispatch(fetchVendorNewOrdersForTheDay())
      .unwrap()
      .then((res) => {
        setTimeout(fetchOrdersRecursively, 2000); // Schedule next fetch in 30 seconds ..on prod change to 30
      })
      .catch((err) => {
        setTimeout(fetchOrdersRecursively, 2000); // Schedule next fetch in 30 seconds ..on prod change to 30
      });
  };

  useEffect(() => {
    fetchOrdersRecursively(); // Initial call to start fetching recursively
    return () => {
      // Clear any pending timeouts when component unmounts
      clearTimeout(fetchOrdersRecursively);
    };
  }, []);

  const [notifications, setNotifications] = useState([]);

  const addNotification = (newNotification) => {
    setNotifications([newNotification, ...notifications]);
  };

  const removeNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  useEffect(() => {
    if (newOrders?.length === notifications?.length) {
      return;
    }

    const existingIds = notifications.map((notif) => notif.id);
    const ordersToAdd = newOrders?.filter(
      (order) => !existingIds.includes(order.id)
    );

    if (ordersToAdd?.length > 0) {
      // Assuming addNotification adds the order to notifications array
      ordersToAdd?.forEach((order) => {
        addNotification(order);
      });
    }

    newOrders?.forEach((order) => {
      // Check if the order already exists in notifications
      const orderExists = notifications.some((notif) => notif.id === order.id);

      // If the order doesn't exist in notifications, add it
      if (!orderExists) {
        addNotification(order);
      }
    });

    // console.log(newOrders, "oorder");
    // newOrders?.forEach((order) => {
    //   console.log("hey");
    //   console.log(notifications);
    //   if (notifications.length === 0) {
    //     addNotification(order);
    //   } else {
    //     // setNotifications([]);
    //     notifications.forEach((notif) => {
    //       if (notif.id !== order.id) {
    //         console.log(notif.id, order.id, "id");
    //         addNotification(order);
    //       }
    //     });
    //   }
    // });
  }, [newOrders]);

  return (
    <div className="h-screen w-full ">
      <DashHeader />
      {/* I am calculating the padding top if there is a button the pt is 6px lower cause for the padding of the button */}
      <div className={`flex h-full  w-full `}>
        <StoreSideBar btn={btn} />

        <div className=" px-[20px] md:px-[32px] pt-[88px]  h-screen  relative overflow-auto scroll-hidden  w-full relative ">
          <div className=" w-[20.5rem] fixed top-[62px] right-0 flex flex-col space-y-[1rem] z-[60] ">
            {notifications.map((notif, index) => (
              <Notification
                key={notif.id}
                data={notif}
                onCancel={() => removeNotification(index)}
                index={index}
              />
            ))}
          </div>
          {children}

          {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <button
              onClick={() => addNotification("New order received!")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Notification
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StoreDashLayout;
