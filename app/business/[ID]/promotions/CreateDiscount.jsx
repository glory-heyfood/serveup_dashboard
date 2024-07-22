"use client";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import CustomLabel from "@/components/label/CustomLabel";
import React, { useEffect, useState } from "react";
import DiscountTab from "./DiscountTab";
import { checkIconSmall, deliveryIcon, itemIcon, orderIcon } from "@/SVGs";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelTextarea from "@/components/label/LabelTextarea";
import LabelDiscount from "@/components/label/LabelDiscount";
import LabelSelectLocations from "@/components/label/LabelSelectLocations";
import SwitchPicker from "@/components/SwitchPicker";
import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import DashBtn from "@/components/buttons/DashBtn";
import DiscountSelectItems from "@/components/discount/DiscountSelectItems";
import LabelAmountInput from "@/components/label/LabelAmountInput";
import LabelSelect from "@/components/label/LabelSelect";
import LabelDateInput from "@/components/label/LabelDateInput";
import LabelDateAndTimePicker from "@/components/label/LabelDateAndTimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  combineDateAndTime,
  generateShortId,
  getBusiness,
  getDateFromDateString,
  getStore,
  getTimeFromDate,
} from "@/utils";
import {
  createPromotionAsync,
  deletePromotionAsync,
  getCodeAvailabiltyAsync,
  togglePromotionStatusAsync,
  updatePromotionAsync,
} from "@/redux/features/promotionSlice";
import FadeLoad from "@/components/loaders/FadeLoader";
import { ClipLoader } from "react-spinners";
import useDebounce from "@/hooks/useDebounce";
import { getAllStoresAsync } from "@/redux/features/business/storeSlice";
import { getDateFromDateSections } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

const CreateDiscount = ({ handleClose, editData }) => {
  const [selectedDiscountTab, setSelectedDiscountTab] = useState(null);
  const [discountType, setDiscountType] = useState("Amount");
  const [radioItemSelected, setRadioItemSelected] = useState("");
  const [selectedItemsName, setSelectedItemsName] = useState("");
  const loading = useSelector((state) => state.promotions.loading);
  const [deactivateLoader, setDeactivateLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [codeStatus, setCodeStatus] = useState(null);
  const [codeLoading, setCodeLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [stores, setStores] = useState([]);

  const [formData, setFormData] = useState({
    max_disc_value: undefined,
    max_disc_value_check: false,
    active: true,
    name: "",
    description: "",
    code: "", //the true indicates that i want the id to be in uppercase
    discount_value: "",
    min_order_amount: undefined,
    min_order_amount_check: false,
    usage_limit: undefined,
    usage_limit_check: false,
    min_order_count_value: undefined,
    min_order_count_check: false,
    min_order_count_type: "exactly",
    date_range_check: false,
    type: "",
    start_date: {
      date: "",
      time: "",
    },
    end_date: {
      date: "",
      time: "",
    },
    display_start_date: {
      date: "",
      time: "",
    },
    display_end_date: {
      date: "",
      time: "",
    },
    items: [],
    store_ids: [],
    created_by: "",
  });

  const dispatch = useDispatch();

  const handleDiscountClick = (type) => {
    setDiscountType(type);
    // setFormData((prev) => ({
    //   ...prev,
    //   type: type,
    // }));
  };

  const handleRadioItemSelected = (type) => {
    setRadioItemSelected(type);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckChange = (name, check) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: check,
    }));
  };

  const createPromotion = () => {
    const business = getBusiness();
    const payload = {
      code: formData.code,
      business_id: business?.id,
      auto_apply: radioItemSelected === "Automatic" ? true : false,
      discount_value: Number(formData.discount_value),
      use_percentage: discountType === "Amount" ? false : true,
      maximum_discount_value: formData.max_disc_value_check
        ? Number(formData.max_disc_value)
        : undefined,
      minimum_order_amount: formData.min_order_amount_check
        ? Number(formData.min_order_amount)
        : undefined,
      minimum_order_count: formData.min_order_count_check
        ? Number(formData.min_order_count_value)
        : undefined,
      minimum_order_count_type: formData.min_order_count_check
        ? formData.min_order_count_type
        : undefined,
      usage_limit: formData.usage_limit_check
        ? Number(formData.usage_limit)
        : undefined,
      start_date: formData.date_range_check
        ? combineDateAndTime(formData.start_date.date, formData.start_date.time)
        : undefined,
      end_date: formData.date_range_check
        ? combineDateAndTime(formData.end_date.date, formData.end_date.time)
        : undefined,
      type:
        selectedDiscountTab === "Order discount"
          ? "order"
          : selectedDiscountTab === "Delivery discount"
          ? "delivery"
          : "item",
      items:
        selectedDiscountTab === "Item discount" ? formData.items : undefined,
      store_ids: formData.store_ids,
      created_by: `business__${business?.name}`,
    };

    console.log(payload);
    dispatch(createPromotionAsync(payload));
  };

  const togglePromotionStatus = (status) => {
    setDeactivateLoader(true);
    const payload = {
      promoId: editData?.id,
      status: status,
    };
    dispatch(togglePromotionStatusAsync(payload))
      .unwrap()
      .then((res) => {
        if (res) {
          setDeactivateLoader(false);
          updateFormData(res.data.response);
        }
      });
  };

  const deletePromotion = () => {
    setDeleteLoader(true);
    dispatch(
      deletePromotionAsync({
        promoId: editData?.id,
      })
    )
      .unwrap()
      .then((res) => {
        handleClose(true);
      });
  };

  const updatePromotion = () => {
    const business = getBusiness();
    const payload = {
      id: editData?.id,
      store_id: editData?.store_id,
      code: formData.code,
      business_id: business.id,
      auto_apply: radioItemSelected === "Automatic" ? true : false,
      discount_value: Number(formData.discount_value),
      use_percentage: discountType === "Amount" ? false : true,
      maximum_discount_value: formData.max_disc_value_check
        ? Number(formData.max_disc_value)
        : undefined,
      minimum_order_amount: formData.min_order_amount_check
        ? Number(formData.min_order_amount)
        : undefined,
      minimum_order_count: formData.min_order_count_check
        ? Number(formData.min_order_count_value)
        : undefined,
      minimum_order_count_type: formData.min_order_count_check
        ? formData.min_order_count_type
        : undefined,
      usage_limit: formData.usage_limit_check
        ? Number(formData.usage_limit)
        : undefined,
      start_date: formData.date_range_check
        ? combineDateAndTime(formData.start_date.date, formData.start_date.time)
        : undefined,
      end_date: formData.date_range_check
        ? combineDateAndTime(formData.end_date.date, formData.end_date.time)
        : undefined,
      type:
        selectedDiscountTab === "Order discount"
          ? "order"
          : selectedDiscountTab === "Delivery discount"
          ? "delivery"
          : "item",
      items:
        selectedDiscountTab === "Item discount" ? formData.items : undefined,
      store_ids: formData.store_ids,
      created_by: formData?.created_by,
    };
    console.log(payload);
    dispatch(updatePromotionAsync(payload))
      .unwrap()
      .then((res) => {
        updateFormData(res.data.response);
      });
  };

  const updateFormData = (data) => {
    setFormData((prev) => ({
      ...prev,
      active: data?.active,
      max_disc_value: data?.maximum_discount_value,
      max_disc_value_check: data?.maximum_discount_value ? true : false,
      code: data?.code, //the true indicates that i want the id to be in uppercase
      discount_value: data?.discount_value,
      min_order_amount: data?.minimum_order_amount,
      min_order_amount_check: data?.minimum_order_amount ? true : false,
      usage_limit: data?.usage_limit,
      usage_limit_check: data?.usage_limit ? true : false,
      min_order_count_value: data?.minimum_order_count,
      min_order_count_check: data?.minimum_order_count ? true : false,
      min_order_count_type: data?.minimum_order_count_type
        ? data?.minimum_order_count_type
        : "exactly",
      date_range_check: data?.start_date || data?.end_date ? true : false,
      type: data?.type,
      display_start_date: {
        date: getDateFromDateString(data?.start_date),
        time: getTimeFromDate(data?.start_date),
      },
      display_end_date: {
        date: getDateFromDateString(data?.end_date),
        time: getTimeFromDate(data?.end_date),
      },
      start_date: {
        date: data?.start_date,
        time: data?.start_date,
      },
      end_date: {
        date: data?.end_date,
        time: data?.end_date,
      },
      items: data?.items,
      store_ids: editData?.store_ids,
      created_by: editData?.created_by,
    }));

    if (data?.items?.length > 0) {
      let names = data?.items.map((it) => it.name)?.join(", ");
      setSelectedItemsName(names);
    }

    if (data?.type === "order") {
      setSelectedDiscountTab("Order discount");
    } else if (data?.type === "delivery") {
      setSelectedDiscountTab("Delivery discount");
    } else {
      setSelectedDiscountTab("Item discount");
    }

    if (data?.active) {
      setRadioItemSelected("Automatic");
    } else {
      setRadioItemSelected("Discount code");
    }

    if (data?.use_percentage) {
      setDiscountType("Percent");
    } else {
      setDiscountType("Amount");
    }
  };

  // Call the useDebounce hook
  const debounceCallback = useDebounce((value) => {
    setCodeLoading(true);
    const payload = {
      code: value,
      business_id: getBusiness()?.id,
    };
    dispatch(getCodeAvailabiltyAsync(payload))
      .unwrap()
      .then((res) => {
        console.log(res);
        setCodeLoading(false);
        setCodeStatus(res.data.response.status);
        setSuggestions(res.data.response.suggestions);
      });
  }, 1);

  const handleSearch = (value) => {
    if (value.trim() !== "") {
      setCodeLoading(true);
      setFormData((prev) => ({
        ...prev,
        code: value,
      }));
      debounceCallback(value);
      if (codeStatus?.status) {
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        code: value,
      }));
      setCodeStatus(false);
    }
  };

  useEffect(() => {
    const value = generateShortId(true);
    handleSearch(value);
  }, []);

  useEffect(() => {
    if (editData) {
      console.log(editData, "Ed");
      updateFormData(editData);
    }
  }, [editData]);

  useEffect(() => {
    dispatch(
      getAllStoresAsync({
        business_id: getBusiness()?.id,
        page: 1,
        noOfStores: 10,
      })
    )
      .unwrap()
      .then((res) => {
        console.log(res);
        const store = res.data[0].map((st) => `${st.name}__${st.id}`); //returning just the name and id so i can use t for my select stores
        setStores(store);
      });
  }, []);

  const handleLoactionsChange = (checkedStores) => {
    setFormData((prevData) => ({
      ...prevData,
      store_ids: checkedStores,
    }));
  };

  return (
    <ComponentModalLayout handleClose={handleClose}>
      <div className="w-full px-[20px] pb-[32px]">
        <div className="flex items-center justify-between">
          <h1 className="dashHeader !mb-[32px] ml-[44px] md:ml-0">
            {editData ? "Edit discount" : "Create new discount"}
          </h1>
          {editData && (
            <div className="flex items-center space-x-[0.75rem]  ">
              <div
                className={`py-[0.62rem] flex items-center justify-center px-[0.75rem]  ${
                  formData?.active
                    ? "bg-[#F2F2F2] text-black "
                    : "bg-[#072A85] text-white"
                } w-fit cursor-pointer rounded-[0.25rem] `}
                onClick={() => {
                  togglePromotionStatus(!formData?.active);
                }}
              >
                {deactivateLoader ? (
                  <ClipLoader
                    color={formData?.active ? "#000" : "#fff"}
                    size={24}
                  />
                ) : (
                  <h2
                    className={` ${
                      formData?.active ? "text-black" : "text-white"
                    } text-[0.75rem] sodo600 tracking-[-0.03rem] `}
                  >
                    {formData?.active
                      ? "Deactivate discount"
                      : "Activate discount"}
                  </h2>
                )}
              </div>

              <div
                className="py-[0.62rem] px-[0.75rem]  bg-[#F01C1C] w-fit cursor-pointer rounded-[0.25rem] "
                onClick={deletePromotion}
              >
                <h2 className="text-white text-[0.75rem] sodo600 tracking-[-0.03rem] ">
                  {deleteLoader ? (
                    <ClipLoader color={"#fff"} size={24} />
                  ) : (
                    <h2
                      className={` text-white text-[0.75rem] sodo600 tracking-[-0.03rem] `}
                    >
                      Delete discount
                    </h2>
                  )}
                </h2>
              </div>
            </div>
          )}
        </div>
        <div className={`flex flex-col space-y-[2em]`}>
          {editData ? (
            <h2 className="text-black text-[1rem] tracking-[-0.04rem] sodo600 !mt-[1.35rem] ">
              {editData?.type === "order"
                ? "Order discount"
                : editData?.type === "delivery"
                ? "Delivery discount"
                : "Items discount"}
            </h2>
          ) : (
            <CustomLabel header="Select discount type">
              <div className="flex flex-col md:flex-row md:space-x-[16px] space-y-[0.75rem] md:space-y-0 md:items-center w-full">
                <DiscountTab
                  selected={selectedDiscountTab}
                  setSelected={setSelectedDiscountTab}
                  icon={
                    selectedDiscountTab === "Order discount"
                      ? orderIcon("#072A85")
                      : orderIcon("black")
                  }
                  text="Order discount"
                />
                <DiscountTab
                  selected={selectedDiscountTab}
                  setSelected={setSelectedDiscountTab}
                  icon={
                    selectedDiscountTab === "Delivery discount"
                      ? deliveryIcon("#072A85")
                      : deliveryIcon("black")
                  }
                  text="Delivery discount"
                />
                <DiscountTab
                  selected={selectedDiscountTab}
                  setSelected={setSelectedDiscountTab}
                  icon={
                    selectedDiscountTab === "Item discount"
                      ? itemIcon("#072A85")
                      : itemIcon("black")
                  }
                  text="Item discount"
                />
              </div>
            </CustomLabel>
          )}

          {selectedDiscountTab !== null && (
            <div
              className={`space-y-[2em] flex flex-col ${
                editData ? "!mt-[1rem]" : ""
              } `}
            >
              <div className="flex space-y-[16px] flex-col">
                {/* <LabelSearchInput
                  label="Discount name"
                  placeholder="Discount name"
                  name={"name"}
                  handleChange={handleChange}
                  fontweight="sodo600"
                /> */}
                {/* <LabelTextarea
                  label="Description"
                  handleChange={handleChange}
                  placeholder="Role description"
                  name={"description"}
                  fontweight="sodo600"
                /> */}
                <LabelDiscount
                  value={formData.discount_value}
                  discountType={discountType}
                  handleChange={handleChange}
                  handleClick={handleDiscountClick}
                  name="discount_value"
                  fontweight="sodo600"
                />
                <LabelSelectLocations
                  locations={stores}
                  showLabel={false}
                  checkedValues={formData.store_ids}
                  handleLoactionsChange={(checkedStores) => {
                    handleLoactionsChange(checkedStores);
                  }}
                  fontweight="sodo600"
                />

                {/* <LabelSelectLocations showLabel={false} fontweight="sodo600" /> */}

                {(selectedDiscountTab === "Item discount" ||
                  editData?.type === "items") && (
                  <DiscountSelectItems
                    label="Apply to Items"
                    storeName={getStore()?.name}
                    items={formData.items}
                    values={selectedItemsName}
                    isBusiness={true}
                    setNames={setSelectedItemsName}
                    setItems={(items) => {
                      setFormData((prev) => ({
                        ...prev,
                        items: items,
                      }));
                    }}
                  />
                )}
              </div>

              <div className="flex space-y-[16px] flex-col">
                <SwitchPicker
                  fontweight="sodo600"
                  header="Maximum discount value"
                  checked={formData.max_disc_value_check}
                  handleChange={(check) => {
                    handleCheckChange("max_disc_value_check", check);
                  }}
                  text="What is the highest amount per order you wish to give as discount?"
                >
                  <LabelAmountInput
                    labelFont="sodo600"
                    rounded="rounded-none"
                    inputSize="text-[0.725rem]"
                    value={formData.max_disc_value}
                    handleChange={handleChange}
                    name="max_disc_value"
                    inputFont="sodo600"
                    label="Maximum Value"
                  />
                </SwitchPicker>
                <SwitchPicker
                  fontweight="sodo600"
                  header="Minimum order amount"
                  checked={formData.min_order_amount_check}
                  handleChange={(check) => {
                    handleCheckChange("min_order_amount_check", check);
                  }}
                  text="The minimum order amount to qualify for a discount"
                >
                  <LabelAmountInput
                    labelFont="sodo600"
                    rounded="rounded-none"
                    inputSize="text-[0.725rem]"
                    handleChange={handleChange}
                    value={formData.min_order_amount}
                    name="min_order_amount"
                    inputFont="sodo600"
                    label="Minimum subtotal"
                  />
                </SwitchPicker>
                <SwitchPicker
                  fontweight="sodo600"
                  header="Minimum order count"
                  checked={formData.min_order_count_check}
                  handleChange={(check) => {
                    handleCheckChange("min_order_count_check", check);
                  }}
                  text="How many orders should a customer have to use this promo?"
                >
                  <LabelSelect
                    labelFont="sodo600"
                    rounded="rounded-none"
                    inputSize="text-[0.725rem]"
                    defaultValue="select"
                    selectedValue={formData.min_order_count_type}
                    inputName="min_order_count_value"
                    input={formData.min_order_count_value}
                    handleInputChange={handleChange}
                    name="min_order_count_type"
                    handleChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        min_order_count_type: e.target.value,
                      }));
                    }}
                    option={[
                      { value: "exactly", text: "Exactly" },
                      { value: "minimum", text: "Minimum" },
                      { value: "maximum", text: "Maximum" },
                    ]}
                    label="Number of orders"
                  />
                </SwitchPicker>
                <SwitchPicker
                  fontweight="sodo600"
                  header="Usage limit"
                  handleChange={(check) => {
                    handleCheckChange("usage_limit_check", check);
                  }}
                  checked={formData.usage_limit_check}
                  text="How many times can a customer use this discount?"
                >
                  <LabelSearchInput
                    labelFont="sodo600"
                    rounded="rounded-none"
                    handleChange={handleChange}
                    value={formData.usage_limit}
                    name="usage_limit"
                    inputSize="text-[0.725rem]"
                    inputFont="sodo600"
                    label="Number of times"
                  />
                </SwitchPicker>
                <SwitchPicker
                  fontweight="sodo600"
                  handleChange={(check) => {
                    handleCheckChange("date_range_check", check);
                  }}
                  checked={formData?.date_range_check}
                  header="Date range"
                  text="Set the start date and end date for this discount"
                >
                  <LabelDateAndTimePicker
                    label="start date"
                    setDate={(date) => {
                      setFormData((prev) => ({
                        ...prev,
                        start_date: {
                          ...formData.start_date,
                          date: date,
                        },
                        display_start_date: {
                          date: undefined,
                        },
                      }));
                    }}
                    setTime={(time) => {
                      setFormData((prev) => ({
                        ...prev,
                        start_date: {
                          ...formData.start_date,
                          time: time,
                        },
                        display_start_date: {
                          time: undefined,
                        },
                      }));
                    }}
                    defaultDate={
                      editData ? formData.display_start_date.date : undefined
                    }
                    defaultTime={
                      editData ? formData.display_start_date.time : undefined
                    }
                  />
                  <LabelDateAndTimePicker
                    label="end date"
                    setDate={(date) => {
                      setFormData((prev) => ({
                        ...prev,
                        end_date: {
                          ...formData.end_date,
                          date: date,
                        },
                        display_end_date: {
                          date: undefined,
                        },
                      }));
                    }}
                    setTime={(time) => {
                      setFormData((prev) => ({
                        ...prev,
                        end_date: {
                          ...formData.end_date,
                          time: time,
                        },
                        display_end_date: {
                          time: undefined,
                        },
                      }));
                    }}
                    defaultDate={
                      editData ? formData.display_end_date.date : undefined
                    }
                    defaultTime={
                      editData ? formData.display_end_date.time : undefined
                    }
                  />
                </SwitchPicker>
              </div>

              <CustomLabel header="How will this discount be applied">
                <div className="border border-[#E6E6E6] rounded-[8px] py-[1.5rem] px-[1rem] flex flex-col space-y-[1rem]">
                  <RadioDiscountPicker
                    handleItemClick={handleRadioItemSelected}
                    header="Automatic"
                    itemSelected={radioItemSelected}
                    subHeader="Automatically apply this discount on all qualified customers"
                  />
                  <RadioDiscountPicker
                    handleItemClick={handleRadioItemSelected}
                    itemSelected={radioItemSelected}
                    header="Discount code"
                    absolute={true}
                    subHeader="Customers will apply a discount code on checkout"
                  >
                    <LabelSearchInput
                      width="w-[30%]"
                      rounded="rounded-none"
                      label="Create discount code"
                      handleChange={(e) => {
                        handleSearch(e.target.value);
                      }}
                      name="code"
                      capitalise={true}
                      value={formData.code}
                      loading={codeLoading}
                    />
                  </RadioDiscountPicker>
                  {codeStatus !== null && (
                    <div>
                      <div className="flex items-center space-x-[0.5rem] mt-[1rem]">
                        <span>
                          {checkIconSmall(codeStatus ? "#0AA110" : "#F01C1C")}
                        </span>
                        <h2
                          className={`sodo400 text-[0.75rem] tracking-[-0.015rem] ${
                            codeStatus ? "text-[#0AA110]" : "text-[#F01C1C]"
                          } `}
                        >
                          Discount code{" "}
                          {codeStatus ? "available" : "unavailabe"}
                        </h2>
                      </div>
                      {suggestions && !codeStatus && formData.code !== '' ? (
                        <div>
                          <h2 className="text-[#5F6370] text-[0.75rem] tracking-[-0.015rem] sodo400 my-[1rem] ">
                            Suggestions
                          </h2>
                          {suggestions.map((sug) => (
                            <h2
                              className="text-[#072A85] sodo600 tracking-[-0.0325rem] underline text-[0.8125rem] cursor-pointer "
                              onClick={() => {
                                handleSearch(sug);
                              }}
                            >
                              {sug}
                            </h2>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </CustomLabel>

              <span className="w-fit">
                <DashBtn
                  text="Save"
                  padding="11px 70px"
                  btnLoading={loading}
                  handleClick={editData ? updatePromotion : createPromotion}
                  disabled={
                    formData.discount_value === "" || radioItemSelected === ""
                  }
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </ComponentModalLayout>
  );
};

export default CreateDiscount;
