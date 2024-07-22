import { searchIconLarge } from "@/SVGs";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import EmptyState from "@/components/EmptyState";
import OuterModal from "@/components/modal/OuterModal";
import React, { useEffect, useState } from "react";
import DiscountSelectModalItem from "./DiscountSelectModalItem";
import { Button } from "@mui/material";
import useDebounce from "@/hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCategory,
  removeItemFromCategory,
  removeItemFromCategoryWeb,
  searchItem,
} from "@/redux/features/stores/menuSlice";
import { menu_id } from "@/data";
import FadeLoad from "../loaders/FadeLoader";
import { formatMoney, getBusiness, getStore } from "@/utils";

const DiscountSelectItemsModal = ({
  name,
  type,
  isBusiness,
  setNames,
  items,
  setItems,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchedArray, setSearchedArray] = useState();
  const [showModal, setShowModal] = useState(false);
  const itemsData = useSelector((state) => state.menu.itemsData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataLoading = useSelector((state) => state.menu.dataLoading);

  const [checkedItems, setCheckedItems] = useState([]);

  const handleToggleItemsForCategory = (item) => {
    // Check if the item is already in the array
    if (
      checkedItems?.some(
        (checkedItem) => JSON.stringify(checkedItem) === JSON.stringify(item)
      )
    ) {
      // If it's already checked, remove it
      setCheckedItems((prevItems) =>
        prevItems.filter((data) => data.id !== item.id)
      );
      dispatch(
        removeItemFromCategory({
          category_name: name,
          item_id: item.id,
        })
      )
        .unwrap()
        .then((res) => {
          dispatch(removeItemFromCategoryWeb(item.id));
        });
    } else {
      // If it's not checked, add it
      dispatch(
        addItemToCategory({
          item_id: item.id,
          category_name: name,
        })
      );
      setCheckedItems((prevItems) => [...prevItems, item]);
    }
  };

  const handleToggleItemsForDiscount = (item) => {
    if (checkedItems?.some((checkedItem) => checkedItem.id === item.id)) {
      // If it's already checked, remove it
      const newItems = checkedItems.filter((data) => data.id !== item.id);
      setCheckedItems(newItems);
      setItems(newItems);
      if (newItems.length > 0) {
        const itemNames = newItems.map((item) => item.name).join(", ");
        setNames(itemNames);
      } else {
        setNames("");
      }
    } else {
      // If it's not checked, add it
      const newItems = [
        ...checkedItems,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          store_name: item.store_name,
        },
      ];
      setCheckedItems(newItems);
      setItems(newItems);
      if (newItems.length > 0) {
        const itemNames = newItems.map((item) => item.name).join(", ");
        setNames(itemNames);
      } else {
        setNames("");
      }
    }
  };

  // Call the useDebounce hook
  const debounceCallback = useDebounce((value) => {
    dispatch(
      searchItem({
        value,
        business_id: isBusiness ? getBusiness()?.id : undefined,
        menu_id: isBusiness ? undefined : getStore()?.menu_id,
      })
    )
      .unwrap()
      .then((res) => {
        setSearchedArray(res?.data[0]);
        setLoading(false);
      });
  }, 2);

  const handleChange = (event) => {
    setShowModal(true);
    setLoading(true);
    debounceCallback(event.target.value);
  };

  useEffect(() => {
    if (itemsData) {
      setCheckedItems(itemsData);
    }
    if (items.length > 0) {
      setCheckedItems(items);
    }
  }, [itemsData]);

  return (
    <OuterModal header="Select Items" minHeight="min-h-[477px]">
      <div className="flex flex-col space-y-[32px]">
        <div className="flex space-x-[12px] w-full relative">
          <div className="w-full relative z-[10]">
            <CustomSearch
              placeholder="Search items"
              fullWidth
              handleChange={handleChange}
            />
          </div>

          {showModal && (
            <div className="w-full  p-4 bg-white border border-[#E6E6E6] rounded-[4px] absolute top-[50px] z-[5] left-0 !ml-0 min-h-fit h-[300px] overflow-auto scroll-hidden ">
              {loading ? (
                <FadeLoad />
              ) : (
                searchedArray?.map((data) => (
                  <div
                    key={data.id}
                    className="flex items-center justify-between py-2 "
                  >
                    {/* <input
                      type="checkbox"
                      checked={checkedItems?.some(
                        (checkedItem) => checkedItem.id === data.id
                      )}
                      onChange={() => {
                        if (type === "discount") {
                          handleToggleItemsForDiscount(data);
                        } else {
                          handleToggleItemsForCategory(data);
                        }
                      }}
                    />
                    <h1 className="sodo400 text-[0.75rem] tracking-[-0.24px]">
                      {data.name}
                    </h1> */}

                    <div className="flex flex-col space-y-[0.125rem]">
                      <h2 className="text-[#5F6370] text-[0.75rem] tracking-[-0.015rem] sodo400 ">
                        {data.store_name}
                      </h2>
                      <h1 className="text-[#000000] text-[0.875rem] tracking-[-0.0175rem] sodo600 ">
                        {data.name}
                      </h1>
                      <h2 className="text-black sodo400 text-[0.875rem] tracking-[-0.0175rem] ">
                        <span className="inter600">₦</span>
                        {formatMoney(data.price)}
                      </h2>
                    </div>

                    {checkedItems?.some(
                      (checkedItem) => checkedItem.id === data.id
                    ) ? (
                      <h2
                        className="normal-case text-[#F01C1C] text-[0.75rem] sodo600 tracking-[-0.015rem] cursor-pointer "
                        onClick={() => {
                          // setShowModal(false);
                          if (type === "discount") {
                            handleToggleItemsForDiscount(data);
                          } else {
                            handleToggleItemsForCategory(data);
                          }
                          // setSearchedArray([]);
                        }}
                      >
                        Remove
                      </h2>
                    ) : (
                      <h2
                        className="text-[#072A85] text-[0.75rem] sodo600 tracking-[-0.015rem] cursor-pointer  "
                        onClick={() => {
                          // setShowModal(false);
                          if (type === "discount") {
                            handleToggleItemsForDiscount(data);
                          } else {
                            handleToggleItemsForCategory(data);
                          }
                          // setSearchedArray([]);
                        }}
                      >
                        Add
                      </h2>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {checkedItems.length === 0 ? (
          <EmptyState
            icon={searchIconLarge}
            header="No search result"
            text="Search for an item to select it"
          />
        ) : (
          <div>
            <h3 className="sodo700">Selected Items:</h3>

            {checkedItems?.map((item) => (
              <DiscountSelectModalItem
                key={item.id}
                header={item.name}
                handleClick={() => {
                  if (type === "discount") {
                    handleToggleItemsForDiscount(item);
                  } else {
                    handleToggleItemsForCategory(item);
                  }
                }}
                subHeader={item.price}
              />
            ))}
          </div>
        )}
      </div>
    </OuterModal>
  );
};

export default DiscountSelectItemsModal;
