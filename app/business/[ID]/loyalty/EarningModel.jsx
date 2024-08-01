import LabelInput from "@/components/label/LabelInput";
import Modal from "@/components/modal/Modal";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import React, { useEffect, useState } from "react";
import EarningModalItems from "./EarningModalItems";
import SelectItemsModal from "./SelectItemsModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import {
  createEarningRuleAsync,
  updateEarningRuleAsync,
} from "@/redux/features/business/loyaltySlice";
import {
  convertSecondsToReadable,
  convertToSeconds,
  getBusiness,
} from "@/utils";
import DiscountSelectItems from "@/components/discount/DiscountSelectItems";

const Label = ({ label }) => {
  return <h1 className="text-[13px] sodo700 tracking-[-0.52px]  ">{label}</h1>;
};

// Please note i pass in a data when its edit

const EarningModel = ({ data, handleCancel }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [expiryDate, setExpiryDate] = useState("Days");
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const modalBtnLoad = useSelector((state) => state.loyalty.btnLoading);
  const [selectedItemsName, setSelectedItemsName] = useState("");

  const [formData, setFormData] = useState({
    customerEarn: data ? data.customers_earn : "",
    expiry: data ? convertSecondsToReadable(data.expiry).split(" ")[0] : "",
    customerSpends: data ? data.customers_spend : "",
    items: data ? data.items : [],
    itemSelected: data
      ? data.type === "order-based"
        ? "Order based"
        : data?.type === "amount-spent"
        ? "Amount spent"
        : "Item based"
      : null,
  });

  const setItemSelected = (data) => {
    setFormData((prev) => ({
      ...prev,
      ["itemSelected"]: data,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const createEarningRule = () => {
    const payload = {
      type:
        formData.itemSelected === "Order based"
          ? "order-based"
          : formData.itemSelected === "Amount spent"
          ? "amount-spent"
          : "item-based",
      expiry: convertToSeconds(formData.expiry, expiryDate),
      customers_earn: Number(formData.customerEarn),
      customers_spend:
        formData.customerSpends !== ""
          ? Number(formData.customerSpends)
          : undefined,
      business_id: getBusiness()?.id,
      items: formData.items.length > 0 ? formData.items : undefined,
    };
    console.log(payload);
    dispatch(createEarningRuleAsync(payload));
  };

  const updateEarningRule = () => {
    const payload = {
      id: data?.id,
      type:
        formData.itemSelected === "Order based"
          ? "order-based"
          : formData.itemSelected === "Amount spent"
          ? "amount-spent"
          : "item-based",
      expiry: convertToSeconds(formData.expiry, expiryDate),
      customers_earn: Number(formData.customerEarn),
      customers_spend:
        formData.customerSpends !== ""
          ? Number(formData.customerSpends)
          : undefined,
      business_id: getBusiness()?.id,
      items: formData?.items ? formData?.items?.length > 0 ? formData.items : undefined : undefined, 

    };
    console.log(payload);
    dispatch(updateEarningRuleAsync(payload));
  };

  useEffect(() => {
    if (data) {
      setExpiryDate(convertSecondsToReadable(data.expiry).split(" ")[1]);
      setSelectedItemsName(data?.items?.map((item) => item.name).join(", "));
    }
  }, [data]);

  return (
    <>
      <Modal
        btnLoading={modalBtnLoad}
        header={data ? "Edit earning rule" : "Add new earning rule"}
        minHeight=""
        handleCancel={handleCancel}
        btnText={data ? "Update" : "Save"}
        handleClick={data ? updateEarningRule : createEarningRule}
      >
        {data ? (
          <div className="flex flex-col space-y-[16px]">
            {data && formData.itemSelected === "Order based" && (
              <EarningModalItems
                data={formData}
                header="Order based"
                subHeader="Reward a customer everytime they place a order"
                index={1}
                customerEarnsName="customerEarn"
                expiryName="expiry"
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                customerEarnValue={formData.customerEarn}
                expiryValue={formData.expiry}
                itemSelected={formData.itemSelected}
                setFormData={setFormData}
                handleChange={handleChange}
                setItemSelected={(val) => {
                  console.log(val);
                  val !== formData.itemSelected &&
                    setFormData((prev) => ({
                      ...prev,
                      customerEarn: "",
                      expiry: "",
                      customerSpends: "",
                      eligibleItems: [],
                    }));
                  setItemSelected(val);
                }}
              />
            )}

            {data && formData.itemSelected === "Amount spent" && (
              <EarningModalItems
                data={formData}
                header="Amount spent"
                subHeader="Reward a customer on amount spent on orders"
                index={2}
                customerEarnsName="customerEarn"
                expiryName="expiry"
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                customerEarnValue={formData.customerEarn}
                expiryValue={formData.expiry}
                handleChange={handleChange}
                itemSelected={formData.itemSelected}
                setItemSelected={(val) => {
                  console.log(val);
                  val !== formData.itemSelected &&
                    setFormData((prev) => ({
                      ...prev,
                      customerEarn: "",
                      expiry: "",
                      customerSpends: "",
                      eligibleItems: [],
                    }));
                  setItemSelected(val);
                }}
              >
                <LabelSearchInput
                  width="md:w-[34%]"
                  inputFont="sodo400"
                  name="customerSpends"
                  value={formData.customerSpends}
                  label={
                    <Label
                      label={
                        <>
                          {" "}
                          Everytime <br /> customer spends{" "}
                        </>
                      }
                    />
                  }
                  handleChange={handleChange}
                  icon={<Label label="₦" />}
                />
              </EarningModalItems>
            )}

            {data && formData.itemSelected === "Item based" && (
              <EarningModalItems
                header="Item based"
                data={formData}
                subHeader="Reward a customer for purchasing a specific item"
                index={3}
                itemSelected={formData.itemSelected}
                customerEarnsName="customerEarn"
                expiryName="expiry"
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                customerEarnValue={formData.customerEarn}
                expiryValue={formData.expiry}
                handleChange={handleChange}
                setItemSelected={(val) => {
                  console.log(val);
                  val !== formData.itemSelected &&
                    setFormData((prev) => ({
                      ...prev,
                      customerEarn: "",
                      expiry: "",
                      customerSpends: "",
                      eligibleItems: [],
                    }));
                  setItemSelected(val);
                }}
              >
                {/* <LabelInput
              label={<Label label="Item" />}
              padding="13px 0px 16px 16px"
              width="md:w-[34%]"
            >
              <h1
                className="text-[#072A85] text-[13px] tracking-[-0.56px] sodo600 cursor-pointer"
                onClick={() => {
                  setModal(true);
                }}
              >
                {formData.items.length > 0
                  ? formData.items.join("")
                  : "Select Items"}
              </h1>
            </LabelInput> */}
                <DiscountSelectItems
                  label="Items"
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
              </EarningModalItems>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-[16px]">
            <EarningModalItems
              data={formData}
              header="Order based"
              subHeader="Reward a customer everytime they place a order"
              index={1}
              customerEarnsName="customerEarn"
              expiryName="expiry"
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              customerEarnValue={formData.customerEarn}
              expiryValue={formData.expiry}
              itemSelected={formData.itemSelected}
              setFormData={setFormData}
              handleChange={handleChange}
              setItemSelected={(val) => {
                console.log(val);
                val !== formData.itemSelected &&
                  setFormData((prev) => ({
                    ...prev,
                    customerEarn: "",
                    expiry: "",
                    customerSpends: "",
                    eligibleItems: [],
                  }));
                setItemSelected(val);
              }}
            />

            <EarningModalItems
              data={formData}
              header="Amount spent"
              subHeader="Reward a customer on amount spent on orders"
              index={2}
              customerEarnsName="customerEarn"
              expiryName="expiry"
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              customerEarnValue={formData.customerEarn}
              expiryValue={formData.expiry}
              handleChange={handleChange}
              itemSelected={formData.itemSelected}
              setItemSelected={(val) => {
                console.log(val);
                val !== formData.itemSelected &&
                  setFormData((prev) => ({
                    ...prev,
                    customerEarn: "",
                    expiry: "",
                    customerSpends: "",
                    eligibleItems: [],
                  }));
                setItemSelected(val);
              }}
            >
              <LabelSearchInput
                width="md:w-[34%]"
                inputFont="sodo400"
                name="customerSpends"
                value={formData.customerSpends}
                label={
                  <Label
                    label={
                      <>
                        {" "}
                        Everytime <br /> customer spends{" "}
                      </>
                    }
                  />
                }
                handleChange={handleChange}
                icon={<Label label="₦" />}
              />
            </EarningModalItems>

            <EarningModalItems
              header="Item based"
              data={formData}
              subHeader="Reward a customer for purchasing a specific item"
              index={3}
              itemSelected={formData.itemSelected}
              customerEarnsName="customerEarn"
              expiryName="expiry"
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              customerEarnValue={formData.customerEarn}
              expiryValue={formData.expiry}
              handleChange={handleChange}
              setItemSelected={(val) => {
                console.log(val);
                val !== formData.itemSelected &&
                  setFormData((prev) => ({
                    ...prev,
                    customerEarn: "",
                    expiry: "",
                    customerSpends: "",
                    eligibleItems: [],
                  }));
                setItemSelected(val);
              }}
            >
              {/* <LabelInput
              label={<Label label="Item" />}
              padding="13px 0px 16px 16px"
              width="md:w-[34%]"
            >
              <h1
                className="text-[#072A85] text-[13px] tracking-[-0.56px] sodo600 cursor-pointer"
                onClick={() => {
                  setModal(true);
                }}
              >
                {formData.items.length > 0
                  ? formData.items.join("")
                  : "Select Items"}
              </h1>
            </LabelInput> */}
              <DiscountSelectItems
                label="Items"
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
            </EarningModalItems>
          </div>
        )}
      </Modal>
    </>
  );
};

export default EarningModel;
