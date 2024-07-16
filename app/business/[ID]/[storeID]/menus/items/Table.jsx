"use client";
import TableComponent from "@/components/Table/Table";
import { sendMenuItemsData } from "@/data";
import { getAllItems } from "@/redux/features/stores/menuSlice";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function StickyHeadTable({ handleEdit, sort, loading }) {
  const itemsData = useSelector((state) => state.menu.itemsData);
  const [data, setData] = React.useState([]);
  const [length, setLength] = React.useState([]);
  const dispatch = useDispatch();
  const columns = [
    { id: "Name", label: "Name", minWidth: 200 },

    {
      id: "Price",
      label: "Price",
      minWidth: 150,
      align: "left",
    },

    {
      id: "Category",
      label: "Category",
      minWidth: 150,
      align: "left",
      typeof: "array",
    },

    {
      id: "Stock",
      label: "Stock",
      minWidth: 150,
      align: "left",
      typeof: "date",
    },
  ];

  function createData(Name, Price, Category, Stock) {
    return { Name, Price, Category, Stock };
  }

  const rows = [];
  data?.forEach((data) => {
    rows.push(createData(data.name, data.price, data.category_names, data));
  });

  // React.useEffect(() => {
  // 	// const dat = sendMenuItemsData(0, 10);
  // 	// setData(dat.data);
  // 	// setLength(dat.length);
  //     dispatch(getAllItems({
  //         menu_id: menu_id,
  //         page:1,
  //         pageSize:10,
  //         sortString:'name'
  //     }))
  // }, []);

  React.useEffect(() => {
    setData(itemsData?.data);
    setLength(itemsData?.length);
    console.log(itemsData);
  }, [itemsData]);

  if (rows.length !== 0) {
    return (
      <TableComponent
        setData={setData}
        data={data}
        type="items"
        column={columns}
        loading={loading}
        handleEdit={handleEdit}
        sort={sort}
        row={rows}
        length={length}
      />
    );
  }
}
