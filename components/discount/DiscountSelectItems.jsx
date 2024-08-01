import React, { useEffect, useState } from "react";
import LabelInput from "../label/LabelInput";
import LabelText from "../label/LabelText";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import DiscountSelectModal from "./DiscountSelectItemsModal";
import DiscountSelectItemsModal from "./DiscountSelectItemsModal";
import MenuModal from "../../app/business/[ID]/[storeID]/menus/MenuModal";
import CustomLabel from "../label/CustomLabel";
import { Button } from "@mui/material";
import { searchIconLarge } from "@/SVGs";
import EmptyState from "../EmptyState";
import { formatMoney } from "@/utils";

const DiscountSelectItems = ({
  label,
  isBusiness,
  items,
  setItems,
  values,
  setNames,
}) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModal);
  const showEarnModal = useSelector((state) => state.modal.showEarnModal);
  const [filteredArray, setFilteredArray] = useState([]);
  let dataLoading = false;

  const handleRemoveItem = (item) => {
    let newItems = items.filter((it) => it.id !== item.id);
    setItems(newItems);
    if (newItems.length > 0) {
      const itemNames = newItems.map((item) => item.name).join(", ");
      setNames(itemNames);
    } else {
      setNames("");
    }
  };

  useEffect(() => {
    setFilteredArray(items);
  }, [items]);

  return (
    <LabelInput
      label={<LabelText label={label} />}
      padding="13px 0px 16px 16px"
      width="md:w-[34%]"
    >
      <h1
        className="text-[#072A85] text-[13px] tracking-[-0.56px] sodo600 cursor-pointer"
        onClick={() => {
          dispatch(
            toggleModal({
              modal: "earn",
              payload: true,
            })
          );
        }}
      >
        {values !== "" ? values : "Select Items"}
      </h1>

      {showEarnModal && (
        <>
          <div className="bg-[#000000b9] w-screen h-screen fixed top-0 left-0">            
          </div>
          <MenuModal
            header="Item discount"
            btn={true}
            btnText="Add item to this discount"
            type="discount"
            setItems={setItems}
            setFilteredArray={setFilteredArray}
            isBusiness={isBusiness}
            setNames={setNames}
            items={items}
          >
            <CustomLabel header="All Items in this discount">
              {dataLoading ? (
                <FadeLoad />
              ) : filteredArray.length === 0 ? (
                <EmptyState
                  icon={searchIconLarge}
                  header="Add items"
                  text="Select items to add to this discount"
                />
              ) : (
                filteredArray?.map((item_data, i) => (
                  <div
                    key={i}
                    className="py-[0.75rem] items-start justify-between flex border-[0.5px] border-transparent border-b-[#E6E6E6] "
                  >
                    <div className="flex flex-col space-y-[0.125rem]">
                      <h2 className="text-[#5F6370] text-[0.75rem] tracking-[-0.015rem] sodo400 ">
                        {item_data.store_name}
                      </h2>
                      <h1 className="text-[#000000] text-[0.875rem] tracking-[-0.0175rem] sodo600 ">
                        {item_data.name}
                      </h1>
                      <h2 className="text-black sodo400 text-[0.875rem] tracking-[-0.0175rem] ">
                        <span className="inter600">₦</span>
                        {formatMoney(item_data.price)}
                      </h2>
                    </div>

                    <Button
                      onClick={() => {
                        handleRemoveItem(item_data);
                      }}
                    >
                      <h2 className="normal-case text-[#F01C1C] sodo700 tracking-[-0.24px] text-[0.75rem] ">
                        Remove
                      </h2>
                    </Button>
                  </div>
                ))
              )}
            </CustomLabel>
          </MenuModal>
        </>
      )}
    </LabelInput>
  );
};

export default DiscountSelectItems;
