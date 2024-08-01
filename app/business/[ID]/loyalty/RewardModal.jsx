import Modal from "@/components/modal/Modal";
import LabelInput from "@/components/label/LabelInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import React, { useEffect, useState } from "react";
import LabelDiscount from "@/components/label/LabelDiscount";
import { useDispatch, useSelector } from "react-redux";
import {
  createRewardAsync,
  updateRewardAsync,
} from "@/redux/features/business/loyaltySlice";
import { getBusiness } from "@/utils";

const Label = ({ label }) => {
  return <h1 className="text-[13px] sodo700 tracking-[-0.52px]  ">{label}</h1>;
};

const RewardModal = ({ data }) => {
  const [formData, setFormData] = useState({
    rewardType: data ? data.type : "",
    name: data ? data.name : "",
    points_required: data ? data.points_required : "",
    discount: data ? data.discount : "",
    discountType: data
      ? data.discount_type === "amount"
        ? "Amount"
        : "Percent"
      : "Amount",
  });

  const [selectedValue, setSelectedValue] = useState("");
  const [Discsel, setDiscSel] = useState("Amount");
  const modalBtnLoad = useSelector((state) => state.loyalty.btnLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    if (data) {
      setSelectedValue(data.rewardType);
    }
  }, [data]);

  const handleDiscountClick = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      ["discountType"]: type,
    }));
  };

  const handleCreateReward = () => {
    console.log(formData);
    const payload = {
      type: formData.rewardType,
      points_required: Number(formData.points_required),
      discount: formData.discount,
      name: formData.name,
      discount_type: `${formData.discountType}`.toLowerCase(),
      business_id: getBusiness()?.id,
    };

    console.log(payload);
    dispatch(createRewardAsync(payload));
  };

  const handleUpdateReward = () => {
    const payload = {
      id: data?.id,
      type: formData.rewardType,
      points_required: Number(formData.points_required),
      discount: formData.discount,
      name: formData.name,
      discount_type: `${formData.discountType}`.toLowerCase(),
      business_id: getBusiness()?.id,
    };

    console.log(payload);
    dispatch(updateRewardAsync(payload));
  };

  return (
    <>
      <Modal
        header={data ? "Edit Reward" : "Add New Reward"}
        minHeight="min-h-[477px]"
        handleClick={data ? handleUpdateReward : handleCreateReward}
        btnText={data ? "Update" : "Save"}
        btnLoading={modalBtnLoad}
      >
        <div className="flex flex-col space-y-[40px]">
          <LabelSelect
            width=" md:w-[26%]"
            selectedValue={formData.rewardType}
            label="Reward Type"
            defaultValue="Select reward type"
            name="rewardType"
            hideInput={true}
            handleChange={handleChange}
            option={[
              // { text: "Order Discount", value: "orderDiscount" },
              // { text: "Delivery Discount", value: "deliveryDiscount" },
              { text: "Discount", value: "discount" },
            ]}
          />

          {formData.rewardType !== "" && (
            <div>
              <LabelInput
                width=" md:w-[26%]"
                label={<Label label="Points Required" />}
                padding="13px 0px 14px 16px"
              >
                <div className="flex pr-[16px]">
                  <input
                    type="text"
                    placeholder="0"
                    name="points_required"
                    value={formData.points_required}
                    onChange={(e) => handleChange(e)}
                    className="outline-none flex-grow sodo400 tracking-[-0.52px] text-[13px]"
                  />
                  <span className="text-[#818A98] sodo600 text-[13px] tracking-[-0.52px] text-right ">
                    Points
                  </span>
                </div>
              </LabelInput>
              <LabelDiscount
                value={formData.discount}
                name="discount"
                handleChange={handleChange}
                discountType={formData.discountType}
                handleClick={handleDiscountClick}
              />
            </div>
          )}

          <LabelSearchInput
            width=" md:w-[26%]"
            label="Reward Name"
            placeholder="Reward name"
            fontweight="sodo700"
            name="name"
            value={formData.name}
            handleChange={handleChange}
            inputFont="sodo400"
          />
        </div>
      </Modal>
    </>
  );
};

export default RewardModal;
