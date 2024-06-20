"use client";
import CustomSelect from "../../../../../components/CustomSelect";
import DashLayout from "../../../../../components/Dashboard/DashLayout";
import { options } from "../../../../../data";
import React from "react";
import BarChart from "./Chart";
import AnalyticsCard from "./AnalyticsCard";
import DateRangePicker from "../../../../../components/CustomDateRangePicker";
import CustomCalendarButton, {
  DateRange,
} from "../../../../../components/DateRangePicker";
import StoreDashLayout from "../../../../../components/Dashboard/storeDashLayout";

const Page = () => {
  return (
    <StoreDashLayout>
      <div className="pb-[40px]">
        <h1 className="dashHeader !mb-[24px]">Analytics</h1>
        <DateRangePicker
          defaultValue="This week . oct1 - oct7, 2023"
          selectedValue=""
          options={[
            {
              value: "Thisweek",
              label: "This Week",
            },
            {
              value: "Thismonth",
              label: "This month",
            },
            {
              value: "Thisyear",
              label: "This year",
            },
            {
              value: "custom",
              label: "Custom date range",
            },
          ]}
        />
        <div className="mt-[32px] flex flex-col space-y-[4px] mb-[32px]">
          <h3 className="text-[#5F6370] text-[12px] sodo400 tracking-[-0.24px] ">
            Total Sales{" "}
          </h3>
          <h1 className="sodo600 md:tracking-[-0.96px] md:text-[24px]  ">
            <span className="inter600 font-[100] tracking-[-0.96px] md:text-[24px] ">
              ₦{" "}
            </span>{" "}
            767,139.04{" "}
          </h1>
        </div>

        <DateRange />

        <BarChart />

        <div className="flex items-stretch gap-[20px] flex-col md:flex-row mt-[24px] ">
          <AnalyticsCard
            title="Orders"
            headerLeft="Total orders"
            headerRight="237"
            items={[
              {
                left: "Cancelled orders",
                right: "204",
              },
              {
                left: "Average spent per day",
                right: "₦1,897.65",
              },
              {
                left: "Cacelled orders value",
                right: "₦64,032.00",
              },
            ]}
          />
          <AnalyticsCard
            title="Customers"
            headerLeft="Total customers"
            headerRight="237"
            items={[
              {
                left: "Returning customers",
                right: "204",
              },
              {
                left: "Average per customer",
                right: "₦1,897.65",
              },
            ]}
          />
        </div>
      </div>
    </StoreDashLayout>
  );
};

export default Page;
