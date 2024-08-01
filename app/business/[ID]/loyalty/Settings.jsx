import GridLayout from "@/components/GridLayout";
import React, { useEffect, useState } from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import RuleTable from "./RuleTable";
import RewardTable from "./RewardTable";
import SelectLocations from "./SelectLocations";
import DashBtn from "@/components/buttons/DashBtn";
import { useDispatch, useSelector } from "react-redux";
import FadeLoad from "@/components/loaders/FadeLoader";
import {
  getAllRewardAndEarnings,
  updateEarningAndRewardStoreIdsAsync,
  updateStoreIds,
} from "@/redux/features/business/loyaltySlice";
import { getBusiness } from "@/utils";
import LabelSelectLocations from "@/components/label/LabelSelectLocations";
import { getAllStoresAsync } from "@/redux/features/business/storeSlice";
const Settings = () => {
  const btnLoading = useSelector((state) => state.loyalty.btnLoading);

  const storeIds = useSelector((state) => state.loyalty.storeIds);
  const storesArr = useSelector((state) => state.loyalty.stores);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleLoactionsChange = (checkedStores) => {
    dispatch(updateStoreIds(checkedStores));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getAllRewardAndEarnings({ business_id: getBusiness()?.id }))
      .unwrap()
      .then((res) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (storesArr.length > 0) {
      const store = storesArr.map((st) => `${st.name}__${st.id}`); //returning just the name and id so i can use t for my select stores
      setStores(store);
    }
  }, [storesArr]);

  return (
    <GridLayout GridComponent={<GridComponent />}>
      <div className="mb-[32px]">
        <BreadCrumb main="Loyalty Rewards" link="Settings" />
      </div>

      {loading ? (
        <div className="h-[50vh] w-full flex items-center justify-center ">
          <FadeLoad />
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-[32px]">
            <RuleTable />
            <RewardTable />
            <LabelSelectLocations
              locations={stores}
              showLabel={false}
              checkedValues={storeIds}
              handleLoactionsChange={(checkedStores) => {
                handleLoactionsChange(checkedStores);
              }}
              fontweight="sodo600"
            />
          </div>

          <div className="flex justify-end">
            <div className=" items-center justify-end space-x-[12px] inline-flex w-fit mt-[32px] pb-[32px]">
              <DashBtn
                text="Save"
                padding="7px 52px 7px 52px"
                btnLoading={btnLoading}
                handleClick={() => {
                  console.log(storeIds);
                  dispatch(
                    updateEarningAndRewardStoreIdsAsync({
                      store_ids: storeIds,
                      business_id: getBusiness()?.id,
                    })
                  );
                }}
              />
              <DashBtn
                text="Discard"
                padding="7px 24px 7px 24px"
                handleClick={() => {}}
              />
            </div>
          </div>
        </>
      )}
    </GridLayout>
  );
};

export default Settings;
