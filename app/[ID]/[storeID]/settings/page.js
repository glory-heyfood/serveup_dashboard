"use client";
import React, { useEffect, useState } from "react";
import StoreDashLayout from "@/components/Dashboard/storeDashLayout";
// import Status from "./Status";
import DashBtn from "@/components/buttons/DashBtn";
import {
  doorClosedIcon,
  locationIcon,
  playIcon,
  pauseIcon,
  plusIconBlue,
  XIconRed,
} from "@/SVGs";
import CustomLabel from "@/components/label/CustomLabel";
import LabelTextInputEdit from "@/components/label/LabelTextInputEdit";
import LabelInput from "@/components/label/LabelInput";
import LabelText from "@/components/label/LabelText";
import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import SwitchPicker from "@/components/SwitchPicker";
import LabelDateInput from "@/components/label/LabelDateInput";
import { AddStoreLabeDateInputData } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "@/components/TimePicker";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";
import LabelAmountInput from "@/components/label/LabelAmountInput";
import StoreStatus from "@/components/StoreStatus";
import Status from "@/components/Status";
import UpdateStoreBtn from "@/components/UpdateStoreBtn";
import {
  getSingleStore,
  updateStoreSettings,
} from "@/redux/features/business/storeSlice";
import FadeLoad from "@/components/loaders/FadeLoader";
import { getBusinessById } from "@/redux/features/business/businessSlice";
import useLocationSuggestions from "@/hooks/useLocationSuggestions";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import { ClipLoader } from "react-spinners";
import { checkIsStoreOpen, generateId } from "../../../../utils";

const Page = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const loading = useSelector((state) => state.stores.loading);
  const btnLoading = useSelector((state) => state.stores.btnLoading);
  const [selectedDeliverySettings, setSelectedDeliverySettings] = useState("");
  const [deliveryFeeCharge, setDeliveryFeeCharge] = useState("");
  const [status, setStatus] = useState("open");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loadAdd, setLoadAdd] = useState(false);
  const [orderedBusinessHours, setOrderedBusinessHours] = useState({});
  const dispatch = useDispatch();
  const data = useSelector((state) => state.stores.data);
  const businessData = useSelector((state) => state.business.data);
  const [disabledDays, setDisabledDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    address: {},
    phone_number: "",
    email: "",
    notification: {},
    use_business_delivery_settings: true,
    business_hours: {},
    delivery_limit: null,
    del_fee: null,
    min_del_fee: null,
    id: "",
    del_fee_per_km: null,
  });

  const handleSuggestions = (suggestions) => {
    console.log(suggestions);
    setSuggestions(suggestions);
    setLoadAdd(false);
  };

  const { getSuggestions, getDetails } =
    useLocationSuggestions(handleSuggestions);

  const handleInputChange = (inputValue) => {
    if (inputValue) {
      setLoadAdd(true);
      setShowAdd(true);
    } else {
      setShowAdd(false);
    }
    setInputValue(inputValue);
    getSuggestions(inputValue);
  };

  const handleLocationSelect = async (placeId) => {
    const locationDetails = await getDetails(placeId);
    setInputValue(locationDetails.address);
    setShowAdd(false);
    setFormData((prevData) => ({
      ...prevData,
      address: locationDetails,
    }));
    console.log("Location Details:", locationDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "delivery_limit") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        delivery_limit: Number(value),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleTimeChange = (time, data) => {
    const label = data.label.replace(/^'|'$/g, ""); // Remove quotes from label
    setFormData((prevFormData) => ({
      ...prevFormData,
      business_hours: {
        ...prevFormData.business_hours,
        [label]: {
          ...prevFormData.business_hours[label],
          [data.status.toLowerCase()]: time,
          ["workingDays"]: true,
        },
      },
    }));
  };

  const handleDayClick = (day) => {
    setDisabledDays((prevDisabledDays) => ({
      ...prevDisabledDays,
      [day]: !prevDisabledDays[day],
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      business_hours: {
        ...prevFormData.business_hours,
        [day]: {
          ...prevFormData.business_hours[day],
          workingDays: !prevFormData.business_hours[day].workingDays,
        },
      },
    }));
  };
  const [area, setArea] = useState([
    {
      id: generateId(),
      name: "",
      delivery_fee: "",
    },
  ]);

  const handleAddArea = () => {
    setArea((prevarea) => [
      ...prevarea,
      {
        id: generateId(),
        name: "",
        delivery_fee: "",
      },
    ]);
  };

  const handleRemoveArea = (index) => {
    setArea((prevarea) => {
      const newarea = [...prevarea];
      newarea.splice(index, 1); // Remove the option at the specified index
      return newarea;
    });
  };

  const handleAreaChange = (index, field, value) => {
    setArea((prevarea) =>
      prevarea.map((option, i) =>
        i === index
          ? { ...option, [field]: field === "price" ? Number(value) : value }
          : option
      )
    );
  };

  const handleSaveClick = () => {
    const payload = {
      name: formData?.name,
      address: formData?.address,
      phone_number: formData?.phone_number,
      email: formData?.email,
      notification: formData?.notification,
      use_business_delivery_settings: formData?.use_business_delivery_settings,
      business_hours: formData?.business_hours,
      delivery_limit:
        formData?.delivery_limit === ""
          ? null
          : formData?.delivery_limit * 1000,
      del_fee: formData?.del_fee,
      min_del_fee: formData?.min_del_fee,
      id: formData?.id,
      del_fee_per_km: formData?.del_fee_per_km,
      business_id: businessData?.id,
      delivery_fee_type: {
        name: deliveryFeeCharge,
        area: area,
        delivery_fee: formData.del_fee && Number(formData.del_fee),
        minimum_delivery_fee:
          formData?.min_del_fee && Number(formData.min_del_fee),
        delivery_fee_per_km:
          formData.del_fee_per_km && Number(formData.del_fee_per_km),
      },
    };
    dispatch(updateStoreSettings(payload));
    // setItemWithEvent("store_isOpen", JSON.stringify(checkIsStoreOpen()));    
  };

  useEffect(() => {
    const value = data?.use_business_delivery_settings;
    if (value) {
      setSelectedDeliverySettings("Use default business settings");
    } else {
      setSelectedDeliverySettings("Use new settings");
    }

    if (data?.business_hours) {
      const businessHours = data?.business_hours;
      setDisabledDays((prevDisabledDays) => {
        const updatedDisabledDays = { ...prevDisabledDays };
        for (const day in businessHours) {
          if (Object.prototype.hasOwnProperty.call(businessHours, day)) {
            updatedDisabledDays[day] = !businessHours[day].workingDays;
          }
        }
        console.log(updatedDisabledDays);
        return updatedDisabledDays;
      });
    }

    if (data) {
      setFormData({
        name: data?.name,
        address: data?.address,
        phone_number: data?.phone_number,
        id: data?.id,
        del_fee: data?.use_business_delivery_settings ? "" : data?.del_fee,
        delivery_limit: data?.use_business_delivery_settings
          ? null
          : data?.delivery_limit / 1000,
        del_fee: data?.use_business_delivery_settings
          ? null
          : data?.delivery_fee_type?.delivery_fee,
        min_del_fee: data?.use_business_delivery_settings
          ? null
          : data?.delivery_fee_type?.minimum_delivery_fee,
        del_fee_per_km: data?.use_business_delivery_settings
          ? null
          : data?.delivery_fee_type?.delivery_fee_per_km,
        email: data?.email,
        notification: data?.notification,
        use_business_delivery_settings: data?.use_business_delivery_settings,
        business_hours: data?.business_hours,
      });

      setDeliveryFeeCharge(data?.delivery_fee_type?.name);

      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      const reorderedBusinessHours = {};
      daysOfWeek.forEach((day) => {
        reorderedBusinessHours[day] = data?.business_hours?.day || {
          open: "",
          close: "",
          workingDays: false,
        };
      });

      setOrderedBusinessHours(reorderedBusinessHours);
    }
    if (data?.delivery_fee_type?.area) {
      setArea(data?.delivery_fee_type?.area);
    }
  }, [data, businessData]);

  useEffect(() => {
    const url = window.location.href;
    const parts = url.split("/");
    const id = parts[parts.length - 2];
    const businessID = parts[parts.length - 3];

    dispatch(getSingleStore(Number(id)));
    dispatch(getBusinessById(Number(businessID)));
  }, []);

  const dataForBusinesssHours = {
    label: "",
    status: "",
    workingDays: false,
  };

  return (
    <StoreDashLayout>
      <div className="pb-[40px]">
        <h1 className="dashHeader !mb-[2.525rem]">Store Settings</h1>

        {loading ? (
          <div className="h-[95vh] w-full ">
            <FadeLoad />
          </div>
        ) : (
          <>
            {" "}
            <div className="flex flex-col md:flex-row space-y-[2rem] md:space-y-0  md:items-center justify-between w-full mb-[2rem]">
              <div className="w-fit">
                <Status message="Loading..." />
              </div>
              <div className="flex items-center  space-x-[1rem] w-[150px]">
                <UpdateStoreBtn setShowModal={setShowModal} />
              </div>
            </div>
            <div className="flex flex-col space-y-[2rem] w-full md:w-[70%] ">
              <CustomLabel header="Store information">
                <div className="relative">
                  <LabelTextInputEdit
                    inputFont="sodo600"
                    placeholder="Store name"
                    label="Store name"
                    name="name"
                    initialValue={formData?.name}
                    handleChange={handleChange}
                  />
                  <LabelTextInputEdit
                    inputFont="sodo600"
                    label="Store Address"
                    name="address"
                    initialValue={
                      inputValue !== ""
                        ? inputValue
                        : formData?.address?.address
                    }
                    placeholder="Search store address"
                    handleChange={(e) => {
                      handleInputChange(e.target.value);
                    }}
                  />

                  {showAdd && (
                    <div
                      className="absolute  w-full h-fit min-h-[100px] flex flex-col items-start justify-center space-y-[1rem] bg-white  mt-[0.5rem] p-[1rem] cursor-pointer"
                      style={{
                        boxShadow: "0px 0px 4px 0px #C0C0C0",
                      }}
                    >
                      <div className="flex justify-start w-full mb-[1rem]">
                        <img src="/images/gmap.png" />
                      </div>

                      {loadAdd ? (
                        <div className="flex items-center justify-center w-full h-full">
                          {" "}
                          <ClipLoader color="#2B50D6" size={25} />{" "}
                        </div>
                      ) : (
                        suggestions.map((data) => (
                          <h1
                            className="sodo400 text-[0.825rem] tracking-[-0.28px]"
                            onClick={() => {
                              handleLocationSelect(data.googleMapsPlaceId);
                            }}
                          >
                            {data.address}
                          </h1>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </CustomLabel>

              <CustomLabel header="Contact information">
                <div>
                  <LabelTextInputEdit
                    inputFont="sodo600"
                    name="phone_number"
                    handleChange={handleChange}
                    initialValue={formData?.phone_number}
                    label="Pone number"
                  />
                  <LabelTextInputEdit
                    inputFont="sodo600"
                    name="email"
                    handleChange={handleChange}
                    initialValue={formData?.email}
                    label="Email"
                  />
                </div>
              </CustomLabel>

              {status === "open" && (
                <CustomLabel header="Delivery settings">
                  <RadioDiscountPicker
                    itemSelected={selectedDeliverySettings}
                    absolute={true}
                    handleItemClick={(name) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        use_business_delivery_settings: true,
                      }));
                      setSelectedDeliverySettings(name);
                    }}
                    header="Use default business settings"
                    subHeader="Apply business delivery settings to this store"
                  >
                    <div className={`dd`}>
                      <LabelTextInputEdit
                        rounded="rounded-none"
                        label="Delivery Area"
                        initialValue={`${
                          businessData?.delivery_limit / 1000
                        } Km`}
                        readOnly={true}
                      />
                      <LabelTextInputEdit
                        label="Delivery Fee"
                        rounded="rounded-none"
                        initialValue={businessData?.delivery_fee_type?.name}
                        readOnly={true}
                      />
                    </div>
                  </RadioDiscountPicker>

                  <RadioDiscountPicker
                    itemSelected={selectedDeliverySettings}
                    handleItemClick={(name) => {
                      setSelectedDeliverySettings(name);
                      setFormData((prevData) => ({
                        ...prevData,
                        use_business_delivery_settings: false,
                      }));
                    }}
                    header="Use new settings"
                    absolute={true}
                    subHeader="Set new delivery settings for this store"
                  >
                    <div className="w-full p-[1rem] flex flex-col space-y-[2rem]">
                      <CustomLabel
                        header="Delivery Limit"
                        headerFontAndSize="sodo600 text-[12px]"
                        subHeader="You will be able to deliver within this area radius "
                      >
                        <LabelInput
                          label={<LabelText label="Distance Limit" />}
                          padding="15px 16px"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center  ">
                              <input
                                className="border-none w-[2rem] outline-none placeholder:ext-[#A9ADB5] text-black text-[13px] sodo600 tracking-[-0.52px] "
                                placeholder="0"
                                name="delivery_limit"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                value={formData?.delivery_limit}
                              />
                              <h2 className="text-[13px] sodo600 tracking-[-0.52px] text-black ">
                                km
                              </h2>
                            </div>

                            <div className="w-fit mr-[1rem] hidden md:block">
                              <DashBtn
                                icon={locationIcon}
                                lightTheme={true}
                                text="Select points on map"
                                padding="11px 12px"
                              />
                            </div>
                          </div>
                        </LabelInput>
                      </CustomLabel>
                      <div className="w-fit mr-[1rem] md:hidden !mt-[1rem]">
                        <DashBtn
                          icon={locationIcon}
                          lightTheme={true}
                          text="Select points on map"
                          padding="11px 12px"
                        />
                      </div>

                      <CustomLabel
                        header="How do you charge for delivery?"
                        headerFontAndSize="sodo600 text-[12px]"
                      >
                        <div className="border border-[#E6E6E6] rounded-[8px] px-[1rem] py-[1.5rem] flex space-y-[1rem] flex-col ">
                          <RadioDiscountPicker
                            header="Area based delivery fee"
                            itemSelected={deliveryFeeCharge}
                            absolute={true}
                            handleItemClick={(name) => {
                              setDeliveryFeeCharge(name);
                            }}
                          >
                            <div className="w-full hidden md:block md:px-[1rem] pb-[1rem]">
                              <table className="w-full">
                                <thead className="w-full">
                                  <tr className="w-full py-[0.75rem] ">
                                    <th className="text-black  py-[0.75rem]  text-start  sodo600 tracking-[-0.24px] text-[0.75rem] ">
                                      Area Name
                                    </th>
                                    <th className="text-black  py-[0.75rem]  text-start  sodo600 tracking-[-0.24px] text-[0.75rem] ">
                                      {" "}
                                      Delivery Fee{" "}
                                    </th>
                                    <th> </th>{" "}
                                  </tr>
                                </thead>

                                <tbody className="w-full">
                                  {area.map((area, index) => (
                                    <tr
                                      key={index}
                                      className="w-full py-[0.75rem] border-[0.5px] border-transparent border-t-[#F0F0F0]"
                                    >
                                      {/* Name */}
                                      <td className=" py-[0.75rem] ">
                                        <input
                                          className="border-none outline-none placeholder:text-[#A9ADB5] text-[0.75rem] sodo300 tracking-[-0.24px] text-black"
                                          placeholder="Area Name"
                                          value={area.name}
                                          onChange={(e) =>
                                            handleAreaChange(
                                              index,
                                              "name",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>

                                      {/* Price */}
                                      <td className=" py-[0.75rem] ">
                                        <div className="flex items-center ">
                                          <h4 className="text-[#A9ADB5] text-[0.75rem] sodo300 tracking-[-0.24px]">
                                            ₦
                                          </h4>
                                          <input
                                            className="border-none outline-none placeholder:text-[#A9ADB5] text-[0.75rem] sodo300 tracking-[-0.24px] text-black"
                                            placeholder="0"
                                            value={area.delivery_fee}
                                            onChange={(e) =>
                                              handleAreaChange(
                                                index,
                                                "delivery_fee",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      </td>

                                      {/* Delete Option */}
                                      <td className="py-[0.75rem]">
                                        <button
                                          onClick={() =>
                                            handleRemoveArea(index)
                                          }
                                          className="text-red-500 hover:text-red-700"
                                        >
                                          {XIconRed}
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>

                              <div
                                className="space-x-[0.25rem] mt-[1rem] flex cursor-pointer"
                                onClick={handleAddArea}
                              >
                                {plusIconBlue}
                                <h2 className="text-[#072A85] text-[0.75rem] sodo700 tracking-[-0.48px]">
                                  Add area
                                </h2>
                              </div>
                            </div>
                          </RadioDiscountPicker>
                          <RadioDiscountPicker
                            header="The same delivery fee for all orders"
                            itemSelected={deliveryFeeCharge}
                            absolute={true}
                            handleItemClick={(name) => {
                              setDeliveryFeeCharge(name);
                            }}
                          >
                            <div className="">
                              <LabelAmountInput
                                label="Delivery fee"
                                rounded="rounded-none"
                                name="del_fee"
                                value={formData?.del_fee}
                                handleChange={handleChange}
                              />
                            </div>
                          </RadioDiscountPicker>
                          <RadioDiscountPicker
                            header="Distance based fee"
                            absolute={true}
                            itemSelected={deliveryFeeCharge}
                            handleItemClick={(name) => {
                              setDeliveryFeeCharge(name);
                            }}
                          >
                            <div className="flex flex-col space-y-[1rem]">
                              <LabelAmountInput
                                label="Minimum delivery fee"
                                labelWidth="w-[35%]"
                                rounded="rounded-none"
                                name="min_del_fee"
                                value={formData?.min_del_fee}
                                handleChange={handleChange}
                              />
                              <LabelAmountInput
                                label="Delivery fee per kilometer "
                                labelWidth="w-[35%]"
                                name="del_fee_per_km"
                                value={formData?.del_fee_per_km}
                                handleChange={handleChange}
                                rounded="rounded-none"
                              />
                            </div>
                          </RadioDiscountPicker>
                          <RadioDiscountPicker
                            header="Free delivery"
                            itemSelected={deliveryFeeCharge}
                            handleItemClick={(name) => {
                              setDeliveryFeeCharge(name);
                            }}
                          />
                        </div>
                      </CustomLabel>
                    </div>
                  </RadioDiscountPicker>
                </CustomLabel>
              )}

              <CustomLabel header="Notifications">
                <div className="flex flex-col space-y-[1rem]">
                  <SwitchPicker
                    handleChange={(checked) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        notification: {
                          ...prevData.notification,
                          email: checked,
                        },
                      }));
                    }}
                    checked={formData?.notification?.email}
                    header="Email Notifications"
                    text="Recieve notifications via email"
                  />
                  <SwitchPicker
                    handleChange={(checked) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        notification: {
                          ...prevData.notification,
                          sms: checked,
                        },
                      }));
                    }}
                    checked={formData?.notification?.sms}
                    header="SMS Notifications"
                    text="Recieve notifications via SMS"
                  />
                </div>
              </CustomLabel>

              <CustomLabel header="Business Hours">
                <div className=" overflow-scroll scroll-hidden ">
                  {/* To get each time you will have to pass in different state for both open and close time for the 7 days or find a way to automate it. Glory i believe in you nice work by the way.. */}

                  {data?.length !== 0 &&
                    Object.keys(orderedBusinessHours).map((day) => {
                      let businessData = {
                        label: day,
                        status: "",
                        workingDays: data.business_hours[day].workingDays,
                      };

                      return (
                        <LabelDateInput
                          key={day}
                          data={businessData}
                          checked={data.business_hours[day].workingDays}
                          handleClick={handleDayClick}
                          disabled={disabledDays[day]}
                          timeValues={
                            data.business_hours[day].workingDays &&
                            data.business_hours[day]
                          }
                          time={(time) => (
                            <TimePicker
                              defaultValue={time}
                              data={businessData}
                              disabled={disabledDays[day]}
                              handleTimeChange={handleTimeChange}
                            />
                          )}
                          label={day}
                          handleTimeChange={handleTimeChange}
                        />
                      );
                    })}
                </div>
              </CustomLabel>

              <SaveDiscardBtn
                handleSaveClick={handleSaveClick}
                btnLoading={btnLoading}
              />
            </div>
          </>
        )}
      </div>

      {showModal && (
        <StoreStatus
          isOpen={open}
          // setMessage={setMessage}
          // setIsOpen={setOpen}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </StoreDashLayout>
  );
};

export default Page;
