"use client";
import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/buttons/DashBtn";
import React, { useState } from "react";
import StickyHeadTable from "./Table";
import { plusIcon } from "@/SVGs";
import Table from "./Table";
import CreateDiscount from "./CreateDiscount";
import StoreDashLayout from "@/components/Dashboard/storeDashLayout";
import { useDispatch } from "react-redux";
import {
  getCodeAvailabiltyAsync,
  getDiscounts,
} from "@/redux/features/promotionSlice";
import FadeLoad from "@/components/loaders/FadeLoader";
import { getBusiness, getStore } from "@/utils";
import useDebounce from "@/hooks/useDebounce";

const Page = () => {
  const [showCreateDiscount, setShowCreateDiscount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [editData, setEditData] = useState({});
  const [perPage, setPerPage] = useState(20);

  const dispatch = useDispatch();

  const handleCloseDiscount = (value) => {
    setShowCreateDiscount(false);
    if (value) {
      setLoading(true);
      const payload = {
        business_id: getBusiness()?.id,
        page: page,
        perPage: perPage,
        active: true,
      };
      dispatch(getDiscounts(payload))
        .unwrap()
        .then((res) => {
          setLoading(false);
        });
    }
  };

  const updatePage = (sign) => {
    let newPage = sign === "add" ? page + 1 : page - 1;
    if (newPage === 0) newPage = 1;
    setPage(newPage);
  };

  React.useEffect(() => {
    const payload = {
      business_id: getBusiness()?.id,
      page: 1,
      perPage: 20,
      active: true,
    };
    dispatch(getDiscounts(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
      });
  }, []);

  const next = (status) => {
    setLoading(true);
    const payload = {
      business_id: getBusiness()?.id,
      page: page + 1,
      perPage: perPage,
      active: true,
    };
    dispatch(getDiscounts(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
        updatePage("add");
      });
  };

  const prev = (status) => {
    setLoading(true);
    const payload = {
      business_id: getBusiness()?.id,
      page: page - 1,
      perPage: perPage,
      active: true,
    };
    dispatch(getDiscounts(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
        updatePage("sub");
      });
  };

  const handleClick = (data) => {
    setShowCreateDiscount(true);
    setEditData(data);
  };

  const debounceCallback = useDebounce((value) => {
    setLoading(true);
    const payload = {
      store_id: getBusiness()?.id,
      page: page,
      perPage: perPage,
      search_string: value,
      active: true
    };
    dispatch(getDiscounts(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
      });
  }, 1);

  const handleSearch = (e) => {
    debounceCallback(e.target.value);
  };

  return (
    <>
      {showCreateDiscount ? (
        <CreateDiscount handleClose={handleCloseDiscount} editData={editData} />
      ) : (
        <StoreDashLayout>
          <div>
            <h1 className="text-black sodo700 text-[20px] tracking-[-0.8px] mb-[30px] ">
              Promotions
            </h1>
            <div className="flex flex-col  md:flex-row md:items-center justify-between mb-[32px]  ">
              <div className="order-2 md:order-1 w-full md:w-fit">
                <CustomSearch
                  fullWidth
                  placeholder="Search"
                  handleChange={handleSearch}
                />
              </div>
              <div className="inline-block w-fit order-1 md:order-2 mb-[24px] md:mb-0">
                <DashBtn
                  text="Create new discount"
                  icon={plusIcon}
                  handleClick={() => {
                    setEditData();
                    setShowCreateDiscount(true);
                  }}
                />
              </div>
            </div>

            <Table
              loading={loading}
              setLoading={setLoading}
              prev={prev}
              next={next}
              page={page}
              handleClick={handleClick}
            />
          </div>
        </StoreDashLayout>
      )}
    </>
  );
};

export default Page;
