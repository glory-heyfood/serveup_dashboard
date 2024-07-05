"use client";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import StoreDashLayout from "@/components/Dashboard/storeDashLayout";
import InterTextComp from "@/components/InterTextComp";
import { options } from "@/data";
import React, { useState } from "react";
import StickyHeadTable from "./Table";
import { getStore } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import FadeLoad from "@/components/loaders/FadeLoader";
import { getOrderHistoryAsync } from "@/redux/features/stores/orderSlice";
import useDebounce from "@/hooks/useDebounce";

const Page = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  // const orderBtnLoading = useSelector((state) => state.order.orderBtnLoading);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
    setLoading(true);
    updateOrderHistory(e.target.value);
  };

  const updatePage = (sign) => {
    let newPage = sign === "add" ? page + 1 : page - 1;
    if (newPage === 0) newPage = 1;
    setPage(newPage);
  };

  const updateOrderHistory = (filter) => {
    const payload = {
      storeId: getStore()?.id,
      page: page,
      perPage: perPage,
      filter: filter,
    };
    dispatch(getOrderHistoryAsync(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
      });
  };  

  // Call the useDebounce hook
  const debounceCallback = useDebounce((value) => {
    setLoading(true);
    const payload = {
      storeId: getStore()?.id,
      page: page,
      perPage: perPage,
      filter: filter,
      searchString: value,
    };
    dispatch(getOrderHistoryAsync(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
      });
  }, 1);

  const handleSearch = (e) => {
    debounceCallback(e.target.value);
  };

  React.useEffect(() => {
    const payload = {
      storeId: getStore()?.id,
      page: 1,
      perPage: 5,
      filter: "1 month",
    };
    dispatch(getOrderHistoryAsync(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
      });
  }, []);

  const next = () => {
    setLoading(true);
    const payload = {
      storeId: getStore()?.id,
      page: page + 1,
      perPage: perPage,
      filter: filter,
    };
    dispatch(getOrderHistoryAsync(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
        updatePage("add");
      });
  };

  const prev = () => {
    setLoading(true);
    const payload = {
      storeId: getStore()?.id,
      page: page - 1,
      perPage: perPage,
      filter: filter,
    };
    dispatch(getOrderHistoryAsync(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
        updatePage("sub");
      });
  };

  return (
    <StoreDashLayout>
      {loading ? (
        <div className="h-[80vh] flex items-center justify-center">
          <FadeLoad />
        </div>
      ) : (
        <div className="w-full flex flex-col space-y-[1.5rem] pb-[3rem]">
          <h1 className="dashHeader !md:mb-[3rem]"> Order history </h1>

          {/* <div className="flex flex-col md:flex-row md:items-center justify-between w-full lg:w-[70%]  ">
            <InterTextComp header="Total number of orders" text="1,875" />
            <hr className="h-[51px] w-[0.5px] hidden md:block bg-[#E6E6E6]  " />
            <div className="flex items-center justify-between mt-[1.5rem] md:mt-0 w-[60%] ">
              <InterTextComp header="Total Earnings" text="₦ 4,815,000" />
              <hr className="h-[51px] w-[0.5px] hidden md:block bg-[#E6E6E6]  " />
              <InterTextComp header="Average Order Value" text="₦ 2,568" />
            </div>
          </div>
          <hr className="w-full mt-[0.75rem] h-[0.5px] bg-[#E6E6E6] " /> */}

          <div className="flex md:space-x-[0.75rem] md:items-center flex-col md:flex-row  space-y-[1.5rem] md:space-y-0">
            <div className="w-fit">
              <CustomSelect
                defaultValue="Sort by"
                options={[
                  { value: "today", label: "Today" },
                  { value: "1 day", label: "Yesterday" },
                  { value: "7 days", label: "Last 7 days" },
                  { value: "1 month", label: "Last 30 days" },
                  { value: "6 months", label: "Last 6 months" },
                  { value: "1 year", label: "Last 12 months" },
                ]}
                handleChange={handleChange}
                selectedValue={filter}
              />
            </div>
            <CustomSearch placeholder="Search " handleChange={handleSearch} />
          </div>

          <StickyHeadTable prev={prev} next={next} page={page} />
        </div>
      )}
    </StoreDashLayout>
  );
};

export default Page;
