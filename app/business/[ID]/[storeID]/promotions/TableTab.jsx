import { send, sendPromotionsData } from "@/data";
import { getDiscounts } from "@/redux/features/promotionSlice";
import { getStore } from "@/utils";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TableTab = ({
  setData,
  setSelected,
  selected,
  setLength,
  length,
  setLoading,
}) => {
  const counts = useSelector((state) => state.promotions.counts);
  const dispatch = useDispatch();
  const selectedArray = [
    {
      label: "Active",
      number: counts?.active_count,
    },
    {
      label: "Inactive",
      number: counts?.inactive_count,
    },
  ];

  const getPromotions = (status) => {
    console.log(status);
    setLoading(true);
    const payload = {
      store_id: getStore()?.id,
      page: 1,
      perPage: 20,
      active: status,
    };
    dispatch(getDiscounts(payload))
      .unwrap()
      .then((res) => {
        setLoading(false);
      });
  };

  return (
    <div className="flex  w-full justify-between sm:justify-start sm:space-x-[24px] md:space-x-[40px]">
      {selectedArray.map((data, i) => (
        <div
          key={i}
          onClick={() => {
            setSelected(data.label);
            if (selected !== data.label) {
              const status = selected === "Active" ? false : true;
              getPromotions(status);
            }
          }}
          className={` ${
            selected === data.label
              ? "border-transparent border-[2px] border-b-[#072A85]  "
              : "  "
          } flex space-x-[4px] pb-[12px] cursor-pointer items-center`}
        >
          <h3
            className={` ${
              selected === data.label ? "text-[#072A85]" : "text-[#7E8493]"
            } "tracking-[-0.24px] text-[12px]"`}
          >
            {data.label}
          </h3>
          <div className="bg-[#F2F2F2] py-[2px] px-[6px] flex items-center rounded-[24px] justify-center ">
            <h3 className="text-[10px] sodo700 tracking-[-0.2px] ">
              {data.number}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTab;
