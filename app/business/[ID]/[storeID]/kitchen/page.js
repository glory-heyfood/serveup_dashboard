"use client";
import DashHeader from "@/components/Dashboard/DashHeader";
import GridLayout from "@/components/GridLayout";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashBtn from "@/components/buttons/DashBtn";
import StoreHeader from "@/components/StoreHeader";
import InterTextComp from "@/components/InterTextComp";
import TextComp from "./TextComp";
import {
  backArrowIcon,
  bellIcon,
  bellIconBlue,
  calenderIconBlack,
  calenderIconBlue,
  calenderIconWhiteBig,
  cashIcon,
  clockIconBlack,
  cookIconBlue,
  dineInIcon,
  locationIcon,
  readyIconBlue,
  shieldIcon,
} from "@/SVGs";
import KitchenOrderCard from "./KitchenOrderCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/modal/Modal";
import TimeComp from "./TimeComp";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import SetTime from "@/components/SetTime";
import CustomLabel from "@/components/label/CustomLabel";
import LabelInput from "@/components/label/LabelInput";
import LabelText from "@/components/label/LabelText";
import LabelTextarea from "@/components/label/LabelTextarea";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import { riderData } from "@/data";
import {
  formatMoney,
  getOrderTime,
  getTimeAgo,
  getTimeFromDate,
} from "@/utils";
import { DateCalendar } from "@mui/x-date-pickers";
import DateAndTimePicker from "@/components/DateAndTimePicker";
import {
  makeRefundAsync,
  markOrderAsPreparingAsync,
  markOrderAsReadyAsync,
} from "@/redux/features/stores/kitchenSlice";
import EmptyState from "@/components/EmptyState";
import Instructions from "./instructions";
import { toast } from "react-toastify";
import RadioCheck from "@/components/RadioCheck";
import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import LabelSelect from "@/components/label/LabelSelect";
import LabelTextInputEdit from "@/components/label/LabelTextInputEdit";
import RefundsCard from "./RefundsCard";

const Page = () => {
  const [tab, setTab] = useState("Needs Action");
  const [orderSelected, setOrderSelected] = useState({});
  const showModal = useSelector((state) => state.modal.showModal);
  const orderBtnLoader = useSelector((state) => state.kitchen.orderBtnLoading);
  const [readyOrderTime, setReadyOrderTime] = useState("");
  const [modalToShow, setModalToShow] = useState("");
  const [driver, setDriver] = useState();
  const [showDateAndTime, setShowDateAndTime] = useState(false);
  const [displayDate, setDisplayDate] = useState("");
  const [orderWillBeReadyTime, setOrderWillBeReadyTime] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [formData, setFormData] = useState({
    riderName: "",
    riderNumber: "",
    refundReason: "",
    refundAmount: "",
    payToBank: false,
  });
  const [dynamicReadyTime, setDynamicReadyTime] = useState("");
  const [refundTo, setRefundTo] = useState("");

  useEffect(() => {
    if (orderSelected) {
      const intervalId = setInterval(() => {
        const timeRemaining = getOrderTime(orderSelected?.order_ready_date);
        setDynamicReadyTime(timeRemaining);
      }, 1000); // Update every second

      return () => {
        clearInterval(intervalId); // Clean up interval on component unmount
      };
    }
  }, [orderSelected, dynamicReadyTime]);

  // useEffect(() => {

  // }, [orderSelected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const combineDateAndTime = (date, time, init) => {
    // Function to extract date components
    function extractDateComponents(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "short" }); // Short month name like "Jun"
      const day = date.getDate();
      return { year, month, day };
    }

    // Function to extract time components
    function extractTimeComponents(timeString) {
      const date = new Date(timeString);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return { hours, minutes, seconds };
    }

    // Extract components from each date string
    const date1Components = extractDateComponents(date);
    const date2Components = extractTimeComponents(time);

    // Combine date and time components into a new Date object

    function monthNameToIndex(monthName) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months.indexOf(monthName);
    }

    const combinedDate = new Date(
      date1Components.year,
      monthNameToIndex(date1Components.month),
      date1Components.day,
      date2Components.hours,
      date2Components.minutes,
      date2Components.seconds
    );

    if (init) {
      setDisplayDate(
        orderSelected?.schedule_details?.replace("scheduled for", "")
      );
      setReadyOrderTime(
        orderSelected?.schedule_details?.replace("scheduled for", "")
      );
    } else {
      setReadyOrderTime(displayDate);
    }

    setOrderWillBeReadyTime(combinedDate);
  };

  const dispatch = useDispatch();

  const handleReadyOrderTime = (text) => {
    setReadyOrderTime(text);
  };

  const markOrderAsPreparing = () => {
    const payload = {
      id: orderSelected?.id,
      time: `${orderWillBeReadyTime}`,
      status: "preparing",
    };
    dispatch(markOrderAsPreparingAsync(payload))
      .unwrap()
      .then((res) => {
        if (res) {
          setOrderWillBeReadyTime("");
          setDisplayDate("");
          setReadyOrderTime("");
          let newOrder = res;
          setOrderSelected(newOrder);
          dispatch(toggleModal(false));
        }
      });
  };

  useEffect(() => {
    console.log(orderSelected, "order-selected");
  }, [orderSelected]);

  const markOrderAsReady = () => {
    const payload = {
      id: orderSelected?.id,
      driver_contact:
        orderSelected?.type === "delivery"
          ? {
              name: formData.riderName,
              phone: formData.riderNumber,
            }
          : null,
      status: "ready",
    };
    dispatch(markOrderAsReadyAsync(payload))
      .unwrap()
      .then((res) => {
        let newOrder = res;
        setOrderSelected(newOrder);
        setFormData({
          riderName: "",
          riderNumber: "",
        });
        setDriver();
        dispatch(toggleModal(false));
      });
  };

  const Numb = () => {
    <h2 className="text-black text-[13px] sodo400">+234</h2>;
  };

  const showOrderHistory = () => {
    const element = document.getElementById("order");
    element.classList.add("slideIn");
    element.classList.replace("translate-x-[-100%]", "translate-x-0");
    const animateElem = document.querySelectorAll(".animate");
    const animateArr = Array.from(animateElem);
    animateArr.forEach((anim) => {
      anim.classList.remove("animate");
    });
  };

  const hideOrderHistory = () => {
    const element = document.getElementById("order");
    element.classList.remove("slideIn");
    element.classList.replace("translate-x-0", "translate-x-[-100%]");
    const animateElem = document.querySelectorAll("#animate");
    const animateArr = Array.from(animateElem);
    animateArr.forEach((anim) => {
      anim.classList.remove("animate");
    });
  };

  const makeRefund = () => {
    const payload = {
      payToBank: refundTo === "Customer’s wallet" ? false : true,
      orderId: orderSelected?.id,
      amount: Number(formData?.refundAmount),
      reason: formData?.refundReason,
      storeId: orderSelected?.store_id,
    };

    console.log(payload);
    dispatch(makeRefundAsync(payload))
      .unwrap()
      .then((res) => {
        let newOrder = res;
        setOrderSelected(newOrder);
        setFormData({
          refundAmount: "",
          refundReason: "",
        });
        setRefundTo("");
        dispatch(toggleModal(false));
      });
  };

  return (
    <GridLayout
      type="store"
      gridType="kitchen"
      tab={tab}
      setTab={setTab}
      orderSelected={orderSelected}
      setOrderSelected={setOrderSelected}
      setShowSideBar={setShowSideBar}
      showSideBar={showSideBar}
    >
      <div className="lg:hidden">
        <DashHeader />
      </div>

      <div className="flex w-full h-screen  head relative">
        <div>
          <div
            className="mob fixed animate px-[20px] left-0 top-[88px] z-[30] h-screen bg-white overflow-scroll scroll-hidden lg:hidden translate-x-[-100%] w-screen "
            id="order"
          >
            <Sidebar
              handleClick={() => {
                setShowSideBar(false);
                hideOrderHistory();
              }}
              tab={tab}
              setTab={setShowSideBar}
              orderSelected={orderSelected}
              setOrderSelected={(data) => {
                setOrderSelected(data);
                hideOrderHistory();
              }}
            />
          </div>
        </div>

        {/* doing this to check if the object is empty or not */}
        {Object.keys(orderSelected).length === 0 ? (
          <div className="w-full left-0 px-[20px] md:px-[32px] fixed show top-[88px] z-[10] ">
            <span
              className="kitchenBackArr sideXIcon bg-[#F0F0F0] h-[32px] w-[32px] rounded-[4px] flex items-center justify-center mb-[2rem]  "
              onClick={() => {
                console.log("SD");
                showOrderHistory();
              }}
            >
              {backArrowIcon}
            </span>
            <EmptyState
              header="Order details will appear here"
              icon={shieldIcon}
              text="Select an ongoing order to view its details"
            />
          </div>
        ) : (
          <div className=" px-[20px] md:px-[32px] h-screen relative  w-full pb-[1rem] ">
            <span
              className="kitchenBackArr sideXIcon bg-[#F0F0F0] h-[32px] w-[32px] rounded-[4px] flex items-center justify-center mb-[2rem]  "
              onClick={() => {
                console.log("SD");
                showOrderHistory();
              }}
            >
              {backArrowIcon}
            </span>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-black text-[1.25rem] sodo600 tracking-[-0.8px]">
                {orderSelected?.contact?.name}
              </h1>
              <div className="md:flex items-center hidden  space-x-[0.75rem] ">
                <div className="w-fit">
                  <DashBtn
                    lightTheme={true}
                    text="Additional charge"
                    handleClick={() => {
                      setModalToShow("additional_charge");
                      dispatch(toggleModal(true));
                    }}
                  />
                </div>
                <div className="w-fit">
                  <DashBtn
                    lightTheme={true}
                    text="Refund"
                    handleClick={() => {
                      setModalToShow("refund");
                      dispatch(toggleModal(true));
                    }}
                  />
                </div>
                <div className="w-fit">
                  <DashBtn
                    text="Cancel order"
                    bgColor="#F01C1C !important"
                    handleClick={() => {
                      setModalToShow("cancel_order");
                      dispatch(toggleModal(true));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#F0F3FC] rounded-[4px] py-[0.5rem] px-[0.75rem] w-fit">
              <h3 className="text-[# text-[#072A85] ] sodo400 tracking-[-0.24px] text-[0.75rem]">
                {orderSelected?.contact?.phone}
              </h3>
            </div>

            <div className="mt-[1.25rem] mb-[0.825rem] w-full sm:w-[170px] ">
              {orderSelected?.type !== "dine-in" && (
                <TextComp
                  header={
                    orderSelected?.type === "delivery" && "Delivery address"
                  }
                  subHeader={
                    orderSelected?.type === "delivery"
                      ? orderSelected?.end_location?.address
                      : orderSelected?.type === "pickup" &&
                        "This is a pickup order"
                  }
                  fontSize="text-[0.825rem]"
                  tracking="tracking-[-0.56px]"
                />
              )}
            </div>

            <div className="flex flex-col md:flex-row  w-full justify-between md:items-center space-y-[1.25rem] md:space-y-0">
              {orderSelected?.type === "delivery" && (
                <div className="w-fit order-1">
                  <DashBtn
                    text="View location on map"
                    icon={locationIcon}
                    lightTheme={true}
                  />
                </div>
              )}

              {orderSelected?.type === "dine-in" && (
                <div className=" ">
                  <div className="bg-[#74006D] px-[0.75rem] py-[0.375rem] rounded-t-[0.25rem]  ">
                    <h2 className="text-white sodo600 text-[0.75rem] tracking-[-0.03rem] ">
                      Dine In
                    </h2>
                  </div>

                  <div className="p-[0.75rem] border border-t-transparent border-[E6E6E6]  rounded-b-[0.25rem]   ">
                    <div className="flex space-x-[0.63rem]  ">
                      <span>{dineInIcon}</span>
                      <h2 className="text-[0.75rem] sodo400 tracking-[-0.03rem] capitalize ">
                        {orderSelected?.qr_code_details?.label}
                      </h2>
                    </div>
                    {orderSelected?.pay_with_cash && (
                      <div className="flex space-x-[0.63rem] mt-[0.75rem]">
                        <span>{cashIcon}</span>
                        <h2 className="text-[0.75rem] sodo400 tracking-[-0.03rem] ">
                          Customer is paying with cash
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {orderSelected?.is_schedule_order && (
                <div className="w-full md:w-fit order-4 md:order-2">
                  <div
                    className="bg-[#FF5F00] flex items-center  space-x-[6px] py-[6px] px-[8px] "
                    style={{
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                    }}
                  >
                    <span> {calenderIconWhiteBig} </span>
                    <h2 className="text-white sodo600 tracking-[-0.48px] text-[0.75rem]">
                      Scheduled for
                    </h2>
                  </div>
                  <div
                    className="border border-[#E6E6E6] border-t-transparent p-[8px]"
                    style={{
                      borderBottomLeftRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    <h1 className="text-black tracking-[-0.48px] sodo400 text-[0.75rem] ">
                      {orderSelected?.schedule_details?.replace(
                        "scheduled for",
                        ""
                      )}
                    </h1>
                  </div>
                </div>
              )}

              {/* Buttons for mobile */}
              <div className="flex items-center md:hidden order-3 w-full md:w-fit space-x-[0.75rem]  ">
                <div className="w-fit">
                  <DashBtn
                    lightTheme={true}
                    text="Additional charge"
                    handleClick={() => {
                      setModalToShow("additional_charge");
                      dispatch(toggleModal(true));
                    }}
                  />
                </div>
                <div className="w-fit">
                  <DashBtn
                    lightTheme={true}
                    text="Refund"
                    handleClick={() => {
                      setModalToShow("refund");
                      dispatch(toggleModal(true));
                    }}
                  />
                </div>
                <div className="w-fit">
                  <DashBtn
                    text="Cancel order"
                    bgColor="#F01C1C !important"
                    handleClick={() => {
                      setModalToShow("cancel_order");
                      dispatch(toggleModal(true));
                    }}
                  />
                </div>
              </div>

              <div className="w-full md:w-fit flex space-x-[2rem] items-center order-2 md:order-3 ">
                <TextComp header="Order type" subHeader={orderSelected?.type} />
                <TextComp
                  header="Order channel"
                  subHeader={orderSelected?.channel}
                />
                <TextComp
                  header="Order time"
                  subHeader={`${getTimeFromDate(
                    orderSelected?.created_date
                  )} . ${getTimeAgo(orderSelected?.created_date)}`}
                />
              </div>
            </div>

            <hr className="w-full h-[1px] bg-[#E6E6E6] mt-[2rem] mb-[1.5rem] " />

            <div className="flex flex-col space-y-[1.5rem] w-full">
              <div className="border border-[#E6E6E6] rounded-[4px] items-center justify-between flex py-[19px] px-[1.5rem] ">
                <div className="flex space-x-[0.5rem] items-center ">
                  <span>
                    {orderSelected?.status === "created"
                      ? bellIconBlue
                      : orderSelected?.status === "preparing"
                      ? cookIconBlue
                      : readyIconBlue}
                  </span>
                  <h1 className="text-black sodo400 tracking-[-0.56px] text-[0.825rem]  ">
                    {orderSelected?.status === "created"
                      ? "This is a new order"
                      : orderSelected?.status === "preparing"
                      ? "You are preaparing this order"
                      : "This order is ready"}
                  </h1>
                </div>

                <h1 className="sodo400 text-[0.825rem] tracking-[-0.56px] text-black">
                  {orderSelected?.status === "created"
                    ? ""
                    : orderSelected?.status === "preparing"
                    ? "Ready in"
                    : "Ready since"}
                  <span className="sodo700 text-[0.825rem] tracking-[-0.56px] text-black">
                    {" "}
                    {orderSelected?.status === "created"
                      ? ""
                      : orderSelected?.status === "preparing"
                      ? ` : ${dynamicReadyTime}`
                      : ` : ${getTimeAgo(orderSelected?.ready_date)}`}
                  </span>{" "}
                </h1>
              </div>

              {(orderSelected?.store_instructions ||
                orderSelected?.driver_instructions) && (
                <div className="flex flex-col space-y-[0.5rem] w-full h-full ">
                  {orderSelected?.store_instructions && (
                    <Instructions
                      text={orderSelected?.store_instructions}
                      type="store"
                    />
                  )}
                  {orderSelected?.driver_instructions && (
                    <Instructions text={orderSelected?.driver_instructions} />
                  )}
                </div>
              )}

              <div className="flex flex-col space-y-[1rem] mt-[1.5rem] ">
                {orderSelected?.items.map((order) => (
                  <KitchenOrderCard
                    data={{
                      name: order?.name,
                      packs: `${order?.quantity} ${
                        order?.quantity === 1 ? "pack" : "packs"
                      }`,
                      amount: formatMoney(order?.totalAmount),
                      orders: order?.options.map((opt) => ({
                        item: opt?.name,
                        number: `${opt?.quantity}x`,
                        amount: opt?.price,
                      })),
                    }}
                  />
                ))}
              </div>

              {orderSelected?.refund && (
                <div>
                  <h2 className="text-[0.75rem] sodo700 tracking-[-0.03rem] text-black mb-[0.5rem] ">
                    Refunds
                  </h2>
                  <div className="flex flex-col space-y-[0.5rem]">
                    {orderSelected?.refund?.refundFees.map((data, i) => (
                      <RefundsCard data={data} key={i} />
                    ))}
                  </div>
                </div>
              )}

              <div className=" flex flex-col space-y-[0.5rem] mt-[2rem]  w-full sm:w-[50%] md:w-[50%] lg:1/3 max-w-[400px]">
                {orderSelected?.order_fees?.fees?.map((fee) => (
                  <div className="flex items-center justify-between">
                    <h1 className="text-black text-[0.75rem] tracking-[-0.48px] sodo700 ">
                      {fee?.name}
                    </h1>
                    <h1 className="text-black text-[0.75rem] tracking-[-0.48px] inter600 ">
                      ₦{formatMoney(fee?.amount)}
                    </h1>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <h1 className="text-black text-[0.75rem] tracking-[-0.48px] sodo700 ">
                    Total
                  </h1>
                  <h1 className="text-black text-[0.75rem] tracking-[-0.48px] inter600 ">
                    ₦{formatMoney(orderSelected?.user_total)}
                  </h1>
                </div>
              </div>

              <div>
                {orderSelected?.status !== "ready" && (
                  <DashBtn
                    btnLoading={orderBtnLoader}
                    text={
                      orderSelected?.status === "created"
                        ? "I am making this order"
                        : orderSelected?.status === "preparing"
                        ? "This order is ready"
                        : "This order has been delivered"
                    }
                    padding="12px 12px"
                    handleClick={
                      orderSelected?.status === "created" ||
                      orderSelected?.status === "received"
                        ? () => {
                            if (orderSelected) {
                              if (orderSelected?.is_schedule_order) {
                                let date = orderSelected?.schedule_date;
                                let init = true;
                                combineDateAndTime(date, date, init); //note the date is already combined, so i just passed in the same date for the date and also for the time, this works as well
                                console.log("hi");
                                setModalToShow("ready_order");
                                dispatch(toggleModal(true));
                              } else {
                                setDisplayDate("");
                                setReadyOrderTime("");
                              }
                            }
                            setModalToShow("ready_order");
                            dispatch(toggleModal(true));
                          }
                        : () => {
                            if (orderSelected?.type === "delivery") {
                              setModalToShow("rider");
                              dispatch(toggleModal(true));
                            } else {
                              markOrderAsReady();
                            }
                          }
                    }
                  />
                )}
              </div>
            </div>

            {showModal &&
              (modalToShow === "ready_order" ? (
                <Modal
                  header="When will this order be ready"
                  btnText="Set time"
                  btnLoading={orderBtnLoader}
                  disabledBtn={orderWillBeReadyTime === ""}
                  handleClick={() => {
                    markOrderAsPreparing();
                  }}
                >
                  <div
                    className="flex items-center flex-wrap  "
                    style={{
                      gap: "1rem",
                    }}
                  >
                    <TimeComp
                      handleClick={(text) => {
                        handleReadyOrderTime(text);
                        setDisplayDate("");
                      }}
                      readyOrderTime={readyOrderTime}
                      time={5}
                      text="5 minutes"
                      handleTime={(date) => {
                        console.log(date);
                        setOrderWillBeReadyTime(date);
                      }}
                    />
                    <TimeComp
                      handleClick={(text) => {
                        handleReadyOrderTime(text);
                        setDisplayDate("");
                      }}
                      time={10}
                      readyOrderTime={readyOrderTime}
                      text="10 minutes"
                      handleTime={(date) => {
                        console.log(date);
                        setOrderWillBeReadyTime(date);
                      }}
                    />
                    <TimeComp
                      handleClick={(text) => {
                        handleReadyOrderTime(text);
                        setDisplayDate("");
                      }}
                      time={15}
                      readyOrderTime={readyOrderTime}
                      text="15 minutes"
                      handleTime={(date) => {
                        console.log(date);
                        setOrderWillBeReadyTime(date);
                      }}
                    />
                    <TimeComp
                      handleClick={(text) => {
                        handleReadyOrderTime(text);
                        setDisplayDate("");
                      }}
                      time={20}
                      readyOrderTime={readyOrderTime}
                      text="20 minutes"
                      handleTime={(date) => {
                        console.log(date);
                        setOrderWillBeReadyTime(date);
                      }}
                    />
                    <TimeComp
                      handleClick={(text) => {
                        handleReadyOrderTime(text);
                        setDisplayDate("");
                      }}
                      readyOrderTime={readyOrderTime}
                      time={25}
                      text="25 minutes"
                      handleTime={(date) => {
                        console.log(date);
                        setOrderWillBeReadyTime(date);
                      }}
                    />
                    <TimeComp
                      handleClick={(text) => {
                        handleReadyOrderTime(text);
                        setDisplayDate("");
                      }}
                      readyOrderTime={readyOrderTime}
                      text="30 minutes"
                      handleTime={(date) => {
                        console.log(date);
                        setOrderWillBeReadyTime(date);
                      }}
                      time={30}
                    />
                    <TimeComp
                      handleClick={(text) => {
                        handleReadyOrderTime(text);
                        setDisplayDate("");
                      }}
                      readyOrderTime={readyOrderTime}
                      text="Other"
                    />
                    <TimeComp
                      handleClick={(text) => {
                        handleReadyOrderTime(text);
                        setShowDateAndTime(true);
                      }}
                      readyOrderTime={readyOrderTime}
                      icon={calenderIconBlack}
                      activeIcon={calenderIconBlue}
                      text={displayDate ? displayDate : "Date and time"}
                    />
                  </div>

                  {readyOrderTime === "Other" && (
                    <div className="mt-[2rem]">
                      <CustomLabel header="Set time">
                        <SetTime
                          handleTime={(date, message) => {
                            setOrderWillBeReadyTime(date);
                          }}
                        />
                      </CustomLabel>
                    </div>
                  )}
                </Modal>
              ) : modalToShow === "additional_charge" ? (
                <Modal
                  header="Request additional charge"
                  btnText="Request charge"
                >
                  <div className="flex flex-col space-y-[1rem]">
                    <div>
                      <LabelInput
                        label={
                          <LabelText label="Amount" fontWeight="sodo700" />
                        }
                        padding="15px 16px"
                      >
                        <span className="inter600 text-[0.825rem]">₦</span>
                        <input
                          className="border-none outline-none text-black sodo300 text-[0.825rem] tracking-[-0.56px] placeholder:text-[#A9ADB5]  "
                          placeholder="0"
                        />
                      </LabelInput>
                    </div>

                    <LabelTextarea
                      label="Reason"
                      placeholder="Reason for additional charge"
                    />
                  </div>
                </Modal>
              ) : modalToShow === "refund" ? (
                <Modal
                  header="Make refund"
                  btnText="Make refund"
                  handleClick={makeRefund}
                  btnLoading={orderBtnLoader}
                  disabledBtn={
                    formData?.refundAmount === "" ||
                    formData?.refundReason === "" ||
                    refundTo === ""
                  }
                >
                  <div className="flex flex-col space-y-[1.5rem]">
                    <div>
                      <h2 className="text-black text-[0.75rem] sodo400 tracking-[-0.03rem]">
                        Amount refundable to customer
                      </h2>

                      <h1 className="text-[1rem] sodo700 tracking-[-0.04rem]  ">
                        {" "}
                        <span className="inter600">₦ </span>
                        {formatMoney(orderSelected.user_total)}
                      </h1>
                    </div>
                    <div>
                      <LabelInput
                        label={
                          <LabelText label="Amount" fontWeight="sodo700" />
                        }
                        padding="15px 16px"
                      >
                        <div className="flex items-center pr-[1rem]">
                          <span className="inter600 text-[0.825rem]">₦</span>
                          <input
                            className="flex-grow border-none outline-none text-black sodo300 text-[0.825rem] tracking-[-0.56px] placeholder:text-[#A9ADB5]  "
                            placeholder="0"
                            name="refundAmount"
                            onChange={handleChange}
                            value={formData?.refundAmount}
                          />
                          <h3
                            className=" cursor-pointer text-[#072A85] sodo600 tracking-[-0.03rem] text-[0.75rem] text-right  "
                            onClick={() => {
                              setFormData({
                                refundAmount: `${orderSelected.user_total}`,
                              });
                            }}
                          >
                            {formData.refundAmount ===
                            orderSelected.user_total.toString()
                              ? "Partial refund"
                              : "Refund all"}
                          </h3>
                        </div>
                      </LabelInput>
                      <LabelSearchInput
                        fontweight="sodo700"
                        label="Reason"
                        placeholder="Reason for refund"
                        handleChange={handleChange}
                        value={formData?.refundReason}
                        name="refundReason"
                      />
                    </div>

                    <hr className="bg-[#E6E6E6] w-full h-[0.0625rem] mt-[1.35rem] mb-[1.25rem] " />

                    <CustomLabel header="Refund to">
                      <div>
                        <RadioDiscountPicker
                          header="Customer’s wallet"
                          itemSelected={refundTo}
                          headerClass="text-black sodo600 tracking-[-0.0325rem] text-[0.8125rem] "
                          handleItemClick={(data) => {
                            setRefundTo(data);
                          }}
                        />
                        <RadioDiscountPicker
                          header="Customer’s bank account"
                          itemSelected={refundTo}
                          headerClass="text-black sodo600 tracking-[-0.0325rem] text-[0.8125rem] "
                          handleItemClick={(data) => {
                            setRefundTo(data);
                          }}
                        />
                        {refundTo === "Customer’s bank account" && (
                          <div className="mt-[0]">
                            <LabelSearchInput
                              placeholder="Account number"
                              label="Account Number"
                              fontweight="sodo700"
                            />
                            <LabelSelect
                              defaultValue="Select Bank"
                              selectedValue=""
                              option={[]}
                              label="Select Bank"
                              fontweight="sodo700"
                            />
                            <LabelTextInputEdit
                              readOnly={true}
                              fontweight="sodo700"
                              label="Account Name"
                              placeholder="EG"
                            />
                          </div>
                        )}
                      </div>
                    </CustomLabel>
                  </div>
                </Modal>
              ) : modalToShow === "rider" ? (
                <Modal header="Delivery rider" btnText="none">
                  <div className="mt-[-1rem]">
                    <h1 className="text-[0.825rem] sodo600 tracking-[-0.28px] text-black">
                      Enter the contact details of the delivery rider
                    </h1>
                    <h3 className="text-[#5F6370] sodo400 text-[0.75rem] ">
                      This will be provided to the customer
                    </h3>

                    <div className="flex flex-col space-y-[1rem] mt-[1.25rem] ">
                      <LabelSearchInput
                        label="Name"
                        placeholder="Name"
                        name="riderName"
                        value={formData.riderName}
                        handleChange={handleChange}
                      />
                      <LabelSearchInput
                        value={formData.riderNumber}
                        name="riderNumber"
                        handleChange={handleChange}
                        label="Phone number"
                        icon={<Numb />}
                        placeholder="Phone number"
                      />
                    </div>

                    <div className="border-[0.78px] border-transparent border-t-[#E6E6E6]  pt-[1.25rem] mt-[1.5rem] ">
                      <h2 className="text-black sodo600 text-[0.75rem] tracking-[-0.24px] mb-[0.5rem]">
                        Previously used
                      </h2>

                      <div className=" w-fit grid grid-cols-2 gap-[0.5rem]">
                        {riderData.map((data) => (
                          <div
                            className={`py-[0.5rem] px-[0.75rem] ${
                              driver === data ? "bg-[#072A85]" : "bg-[#F2F2F2]"
                            } rounded-[4px] w-[175px] cursor-pointer capitalize `}
                            onClick={() => {
                              setDriver(data);
                              setFormData((prevData) => ({
                                ...prevData,
                                riderName: data.name,
                                riderNumber: data.number,
                              }));
                            }}
                          >
                            <h1
                              className={`text-[10px] sodo400 tracking-[-0.2px] ${
                                driver === data ? "text-white" : "text-black"
                              } `}
                            >
                              {data.name} . {data.number}
                            </h1>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-[2.5rem]">
                      <DashBtn
                        handleClick={() => {
                          markOrderAsReady();
                        }}
                        text="Continue"
                        btnLoading={orderBtnLoader}
                        disabled={
                          formData.riderName === "" ||
                          formData.riderNumber === ""
                        }
                        padding="11px 15px"
                      />
                    </div>
                  </div>
                </Modal>
              ) : (
                <Modal
                  header="cancel order"
                  btnText="Cancel order"
                  btnColor="#F01C1C !important"
                >
                  <div className="flex flex-col space-y-[1.5rem]">
                    <div className="bg-[#FFEFE6] flex items-center justify-center w-full py-[0.5rem] px-[10px] ">
                      <h2 className="text-[#FF5F00]">
                        Cancelling this order will automatically refund the
                        customer{" "}
                      </h2>
                    </div>

                    <LabelTextarea
                      label="Reason"
                      placeholder="Reason for cancelling order"
                    />
                  </div>
                </Modal>
              ))}

            {showDateAndTime && (
              <DateAndTimePicker
                handleClick={() => {
                  setShowDateAndTime(false);
                }}
                handleCancel={() => {
                  setOrderWillBeReadyTime("");
                  setReadyOrderTime("");
                  setDisplayDate("");
                  setShowDateAndTime(false);
                }}
                handleChange={(date, time, displayDate) => {
                  setDisplayDate(displayDate);
                  combineDateAndTime(date, time);
                  setReadyOrderTime(displayDate);
                }}
              />
            )}
          </div>
        )}
      </div>
    </GridLayout>
  );
};

export default Page;
