"use client";
import ClickableTableComponent from "@/components/Table/ClickableTable";
import TableComponent from "@/components/Table/Table";
import { campaignData, sendOrderHistory } from "@/data";
import * as React from "react";
import TableSideBarDetails from "./TableSideBarDetails";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryAsync } from "@/redux/features/stores/orderSlice";
import { formatMoney, getDateAndTime, getStore } from "@/utils";
import FadeLoad from "@/components/loaders/FadeLoader";
import EmptyState from "@/components/EmptyState";
import { bigSearchIcon } from "@/SVGs";

export default function StickyHeadTable({ prev, next, page, loading }) {
  const [data, setData] = React.useState([]);
  const [length, setLength] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(); //this is the row that is selected, we need its data so as to display it in the sidebar when it shows
  const orderHistory = useSelector((state) => state.order.orderHistory);
  const dispatch = useDispatch();
  const columns = [
    { id: "Customer", label: "Customer", minWidth: 300 },

    {
      id: "Date",
      label: "Date",
      minWidth: 300,
      align: "left",
    },

    {
      id: "Items",
      label: "Items",
      minWidth: 150,
      align: "left",
    },

    {
      id: "NetPayout",
      label: "Net\u00a0 Payout",
      minWidth: 150,
      align: "left",
    },
    {
      id: "Status",
      label: "Status",
      minWidth: 100,
      align: "left",
    },
  ];

  function createData(Customer, Date, Items, NetPayout, Status, data) {
    return { Customer, Date, Items, NetPayout, Status, data };
  }

  const rows = [];
  data?.forEach((data) => {
    rows.push(
      createData(
        data.contact?.name,
        getDateAndTime(data.created_date),
        data.items.length,
        formatMoney(data.store_total),
        data.status,
        data
      )
    );
  });

  React.useEffect(() => {
    console.log(orderHistory, "ord");
    if (orderHistory) {
      setData(orderHistory.docs);
      setLength(orderHistory.totalDocs);
    }
  }, [orderHistory]);

  // React.useEffect(() => {
  // const payload = {
  //   storeId: getStore()?.id,
  //   page: 1,
  //   perPage: 5,
  //   filter: "1 month",
  // };
  //   console.log("heyy");
  // dispatch(getOrderHistoryAsync(payload))
  //   .unwrap()
  //   .then((res) => {
  //     setData(res.docs);
  //     setLength(res.totalDocs);
  //   });
  // }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <FadeLoad />
      </div>
    );
  } else {
    if (orderHistory?.docs.length === 0) {
      return (
        <div className="w-full  h-full flex items-center justify-center">
          <EmptyState
            icon={bigSearchIcon}
            border={false}
            header="No result"
            text="Your search/filter did not match any results"
          />
        </div>
      );
    } else
      return (
        <ClickableTableComponent
          setData={setData}
          arr={sendOrderHistory}
          setSelectedRow={setSelectedRow}
          column={columns}
          row={rows}
          length={length}
          empty={orderHistory?.docs.length === 0}
          start={(orderHistory?.page - 1) * (orderHistory?.limit + 1)}
          end={
            orderHistory?.limit > orderHistory?.totalDocs
              ? orderHistory?.totalDocs
              : orderHistory?.page * orderHistory?.limit >
                orderHistory?.totalDocs
              ? orderHistory?.totalDocs
              : orderHistory?.page * orderHistory?.limit
          }
          next={next}
          prev={prev}
          disableNext={
            orderHistory?.page * orderHistory?.limit >= orderHistory?.totalDocs
          }
          disablePrev={page <= 1}
          total={orderHistory?.totalDocs}
          sideBarDetails={<TableSideBarDetails data={selectedRow} />}
        />
      );
  }
}
