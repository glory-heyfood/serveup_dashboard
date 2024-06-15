"use client";
import React, { useEffect, useState } from "react";
import StoreDashLayout from "@/components/Dashboard/storeDashLayout";
import CustomLabel from "@/components/label/CustomLabel";

import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import SwitchPicker from "@/components/SwitchPicker";
import LabelDateInput from "@/components/label/LabelDateInput";
import { AddStoreLabeDateInputData } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "@/components/TimePicker";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";
import BreadCrumb from "@/components/BreadCrumb";
import GridLayout from "@/components/GridLayout";
import GridComponent from "../GridComponent";
import {
  getDineInInfo,
  updateDineInSetingsAsync,
} from "@/redux/features/stores/dineInSlice";
import FadeLoad from "@/components/loaders/FadeLoader";
import { getSingleStore } from "@/redux/features/business/storeSlice";
import { getStore } from "@/utils";

const SettingsPage = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dineInData = useSelector((state) => state.stores.dineInData);
  const [status, setStatus] = useState("open");
  const [dineInEnabled, setDineInEnabled] = useState(false);
  const [orderedBusinessHours, setOrderedBusinessHours] = useState({});
  const [loader, setLoader] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
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
    active: false,
    pay_with_cash: false,
    customer_service: "",
    business_hours: {
      Monday: {
        open: "",
        close: "",
        workingDays: false,
      },
      Tuesday: {
        open: "",
        close: "",
        workingDays: false,
      },
      Wednesday: {
        open: "",
        close: "",
        workingDays: false,
      },
      Thursday: {
        open: "",
        close: "",
        workingDays: false,
      },
      Friday: {
        open: "",
        close: "",
        workingDays: false,
      },
      Saturday: {
        open: "",
        close: "",
        workingDays: false,
      },
      Sunday: {
        open: "",
        close: "",
        workingDays: false,
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleTimeChange = (time, data) => {
    console.log(data);
    setFormData((prevFormData) => ({
      ...prevFormData,
      business_hours: {
        ...prevFormData.business_hours,
        [data.label]: {
          ...prevFormData.business_hours[data.label],
          [data.status.toLowerCase()]: time,
          ["workingDays"]: data.workingDays,
        },
      },
    }));
  };

  const handleDayClick = (day) => {
    console.log(day, "day");
    console.log(disabledDays[day]);
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

  const updateDineInSettings = () => {
    setBtnLoading(true);
    dispatch(
      updateDineInSetingsAsync({
        pay_with_cash: formData.pay_with_cash,
        is_dine_in_enabled: formData.active,
        customer_service: formData.customer_service,
        dine_in_hours: formData.business_hours,
        id: getStore().id,
      })
    )
      .unwrap()
      .then((res) => {
        setBtnLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getSingleStore(getStore().id))
      .unwrap()
      .then((res) => {
        if (res) {
          setLoader(false);
        }
      }); //note the 1 should be the dineIn id gotten from the store
  }, []);

  useEffect(() => {
    if (dineInData) {
      console.log(dineInData);
      setFormData({
        active: dineInData?.active,
        customer_service: dineInData?.customer_service,
        pay_with_cash: dineInData?.pay_with_cash,
        business_hours: dineInData?.dine_in_hours,
      });
    }
  }, [dineInData]);

  useEffect(() => {
    if (dineInData?.dine_in_hours) {
      const businessHours = dineInData?.dine_in_hours;
      console.log(businessHours);
      setDisabledDays((prevDisabledDays) => {
        const updatedDisabledDays = { ...prevDisabledDays };
        for (const day in businessHours) {
          if (Object.prototype.hasOwnProperty.call(businessHours, day)) {
            updatedDisabledDays[day] = !businessHours[day].workingDays;
          }
        }

        return updatedDisabledDays;
      });
    }

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
      reorderedBusinessHours[day] = dineInData?.business_hours?.day || {
        open: "",
        close: "",
        workingDays: false,
      };
    });

    setOrderedBusinessHours(reorderedBusinessHours);
  }, [dineInData]);

  return (
    <GridLayout GridComponent={<GridComponent />} type="store">
      {loader ? (
        <FadeLoad />
      ) : (
        <div className="pb-[40px] flex flex-col space-y-[2rem] md:w-[70%]">
          <div>
            <BreadCrumb main="Dine-in" link="Settings" />
          </div>

          <CustomLabel>
            <SwitchPicker
              header="Enable Dine-in orders"
              text="Allow customers order in store using QR Codes"
              checked={formData?.active}
              handleChange={(isChecked) => {
                setFormData((prev) => ({
                  ...prev,
                  active: isChecked,
                }));
              }}
            />
          </CustomLabel>

          {formData?.active && (
            <>
              <CustomLabel header="Dine In Hours">
                <div className=" overflow-scroll scroll-hidden ">
                  {/* To get each time you will have to pass in different state for both open and close time for the 7 days or find a way to automate it. Glory i believe in you nice work by the way.. */}
                  {/* {AddStoreLabeDateInputData.map((data) => (
                  <LabelDateInput
                    key={data.label}
                    data={data}
                    handleClick={handleDayClick}
                    disabled={disabledDays[data.label]}
                    time={() => (
                      <TimePicker
                        data={data}
                        disabled={disabledDays[data.label]}
                        handleTimeChange={handleTimeChange}
                      />
                    )}
                    label={data.label}
                  />
                ))} */}

                  {dineInData &&
                    Object.keys(orderedBusinessHours).map((day) => {
                      let businessData = {
                        label: day,
                        status: "",
                        workingDays: formData?.business_hours[day].workingDays,
                      };

                      return (
                        <LabelDateInput
                          key={day}
                          data={businessData}
                          checked={formData?.business_hours[day].workingDays}
                          handleClick={handleDayClick}
                          disabled={disabledDays[day]}
                          timeValues={
                            formData?.business_hours[day].workingDays &&
                            formData.business_hours[day]
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
              <CustomLabel header="Can customers pay with cash when in store ?">
                <SwitchPicker
                  header="Pay with cash"
                  checked={formData?.pay_with_cash}
                  text="Allow customers pay for dine-in orders with cash"
                  handleChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      pay_with_cash: e,
                    }));
                  }}
                />
              </CustomLabel>

              <CustomLabel header="How are customers served?">
                <div className="border border-[#E6E6E6] rounded-[8px] py-[1.5rem] px-[1rem] flex flex-col space-y-[1rem]">
                  <RadioDiscountPicker
                    header="Table service"
                    subHeader="Orders are served at customer’s table when ready"
                    itemSelected={formData.customer_service}
                    handleItemClick={(header) => {
                      setFormData((prev) => ({
                        ...prev,
                        customer_service: header,
                      }));
                    }}
                  />
                  <RadioDiscountPicker
                    header="Over the counter"
                    subHeader="Customers pick up their orders from the counter"
                    itemSelected={formData.customer_service}
                    handleItemClick={(header) => {
                      setFormData((prev) => ({
                        ...prev,
                        customer_service: header,
                      }));
                    }}
                  />
                </div>
              </CustomLabel>
            </>
          )}

          <SaveDiscardBtn
            handleSaveClick={updateDineInSettings}
            btnLoading={btnLoading}
          />
        </div>
      )}
    </GridLayout>
  );
};

export default SettingsPage;
