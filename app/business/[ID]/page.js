"use client";
import DashLayout from "@/components/Dashboard/DashLayout";
import React, { useEffect, useState } from "react";
import NewOrderCard from "./NewOrderCard";
import EmptyState from "@/components/EmptyState";
import { Button } from "@mui/material";
import { shieldIcon } from "@/SVGs";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinessOrdersForTheDay } from "@/redux/features/business/businessSlice";

const Page = () => {
  const [showState, setShowState] = useState(true);
  const orders = useSelector((state) => state.business.orders);
  const dispatch = useDispatch();
  const fetchOrdersRecursively = () => {
    dispatch(fetchBusinessOrdersForTheDay())
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

  return (
    <DashLayout>
      <div className=" w-full ">
        <h1 className="dashHeader ">New Orders</h1>

        {orders.length === 0 ? (
          <EmptyState
            header="No new orders"
            icon={shieldIcon}
            text="New orders from all stores will appear here"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1em]  ">
            {orders.map((order) => (
              <NewOrderCard data={order} />
            ))}
          </div>
        )}

        {/* <Button
          variant="text"
          onClick={() => {
            setShowState(!showState);
          }}
        >
          Click on me to toggle between states
        </Button> */}
      </div>
    </DashLayout>
  );
};

export default Page;
