import {
  deleteIconGray,
  deleteRedIcon,
  downloadIcon,
  plusIconBlue,
  qrCodeIcon,
} from "@/SVGs";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import CustomSearch from "@/components/CustomSearch";
import CustomSelect from "@/components/CustomSelect";
import Input from "@/components/Input";
import StoreHeader from "@/components/StoreHeader";
import DashBtn from "@/components/buttons/DashBtn";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import CustomLabelSwitchSelect from "@/components/label/customLabelSwitchSelect";
import FadeLoad from "@/components/loaders/FadeLoader";
import {
  createQrCodeAsync,
  deleteQrCode,
  getDineInInfo,
  getQrCodes,
  updateQrCodeAsync,
} from "@/redux/features/stores/dineInSlice";
import { getAllCategories } from "@/redux/features/stores/menuSlice";
import { generateShortId, getMenu, getStore } from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateQrCodePage = ({ handleClose }) => {
  const categoriesData = useSelector((state) => state.menu.categoriesData);
  const qrData = useSelector((state) => state.dineIn.qrData);
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false); // State to control the visibility of options
  const [loader, setLoader] = useState(true);

  const [qrTable, setQrTable] = useState([
    {
      id: generateShortId(),
      label: "",
      categories: [],
      categoryName: "Select Categories",
      edit: false,
      new: true,
      saving: false,
    },
  ]);

  const handleAddTable = () => {
    setQrTable((prevOptions) => [
      ...prevOptions,
      {
        id: generateShortId(),
        label: "",
        categoryIds: [],
        categoryName: "Select Categories",
        edit: false,
        new: true,
      },
    ]);
  };

  const handleSelectCategories = (itemId, categories, names) => {
    const updatedQrTable = qrTable.map((item) => {
      // Check if the current item is the one you want to update (based on some condition like id)
      if (item.id === itemId) {
        // Return a new object with updated categoryIds
        return {
          ...item, // Copy existing properties
          categories: categories, // Update categoryIds with new array
          categoryName:
            names?.join(", ") === "" ? "Select Categories" : names?.join(", "),
        };
      }
      // If it's not the item you want to update, return the original item unchanged
      return item;
    });

    setQrTable(updatedQrTable);
  };

  useEffect(() => {
    setLoader(true);

    const menuId = getMenu();

    const store = getStore();

    dispatch(getAllCategories(menuId));
    dispatch(
      getQrCodes({
        storeId: store.id,
      })
    )
      .unwrap()
      .then((res) => {
        if (res) {
          setLoader(false);
        }
      });
  }, []);

  useEffect(() => {
    if (qrData?.length > 0) {
      const qrArr = qrData.map((item) => {
        let categName = [];
        categName = item.categories.map((categ) => categ.name);
        return {
          id: item.id,
          label: item.label,
          categories: item.categories,
          categoryName: categName?.join(", "),
          edit: true,
          new: false,
          saving: false,
        };
      });

      setQrTable(qrArr);
      setLoader(false);
    } else {
      setQrTable([
        {
          id: generateShortId(),
          label: "",
          categories: [],
          categoryName: "Select Categories",
          edit: false,
          new: true,
          saving: false,
        },
      ]);
    }
  }, [qrData, categoriesData]);

  const createQrCode = (arg) => {
    console.log(arg);
    dispatch(createQrCodeAsync(arg))
      .unwrap()
      .then((res) => {
        if (res) {
          const id = res.data.response.id;
          const arr = qrTable;
          const newArr = arr.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                saving: false,
                edit: true,
              };
            } else {
              return item;
            }
          });
          setQrTable(newArr);
        }
      });
  };

  const updateQrCode = (arg) => {
    console.log("update");
    console.log(arg);
    dispatch(updateQrCodeAsync(arg))
      .unwrap()
      .then((res) => {
        if (res) {
          const id = res.data.response.id;
          const arr = qrTable;
          const newArr = arr.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                saving: false,
                edit: true,
              };
            } else {
              return item;
            }
          });
          setQrTable(newArr);
        }
      });
  };

  const deleteQr = (id) => {
    dispatch(
      deleteQrCode({
        id: id,
      })
    );
    const newQr = qrTable.filter((qr) => qr.id !== id);
    setQrTable(newQr);
  };

  return (
    // Please note the classname here is for the child element of the component modal layout
    // <ComponentModalLayout handleClose={handleClose} XIconHideMobile={true} className='  w-full md:w-[70%] h-full  mx-auto '>
    <div className="flex justify-between w-full space-x-[5rem]">
      <div className="flex flex-col space-y-[1rem] w-full md:w-[60%]">
        <div className="max-w-[17rem] ">
          <StoreHeader
            header="Create QR codes"
            showXIconMobile={true}
            handleClose={handleClose}
            headerClass="sodo700 text-[1.25rem] text-black tracking-[-0.8px]"
          />
        </div>

        {loader ? (
          <div className="w-full  h-[70%] flex items-center justify-center">
            <FadeLoad />
          </div>
        ) : (
          <div className="flex flex-col space-y-[2rem]">
            {/* <LabelSearchInput
            label="Label"
            placeholder="Example: Table"
            handleChange={(e) => {
              setTableName(e.target.value);
            }}
            value={tableName}
          /> */}
            {
              <table>
                <thead className="w-full">
                  <tr className="w-full py-[0.75rem] ">
                    <th className="text-black  py-[0.75rem]  text-start  sodo600 tracking-[-0.24px] text-[0.75rem] ">
                      Label
                    </th>
                    <th className="text-black  py-[0.75rem]  text-start  sodo600 tracking-[-0.24px] text-[0.75rem] ">
                      Categories
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {qrTable?.map((table) => (
                    // <div
                    //   className="flex items-center justify-between py-[0.75rem]"
                    //   style={{
                    //     background: "#FFF",
                    //     boxShadow: "0px 0.5px 0px 0px #F0F0F0",
                    //   }}
                    // >
                    <tr className="py-[0.75rem]">
                      <td className="py-[0.75rem]">
                        <input
                          className={`border-none outline-none placeholder:text-[#A9ADB5] text-[0.75rem] sodo400 tracking-[-0.24px] ${
                            table.saving ? "text-[#D8DBE1]" : "text-black"
                          } w-full `}
                          placeholder="Enter Label (Example: Table 1)"
                          readOnly={table.edit || table.saving ? true : false}
                          value={table?.label}
                          onChange={(e) => {
                            const qr = qrTable;

                            let newQr = qr.map((item) => {
                              if (item.id === table.id) {
                                return {
                                  ...item,
                                  label: e.target.value,
                                };
                              } else {
                                return item;
                              }
                            });

                            setQrTable(newQr);
                          }}
                          // value={option.option_name}
                          // onChange={(e) =>
                          //   handleOptionChange(index, "option_name", e.target.value)
                          // }
                        />
                      </td>

                      <td className="py-[0.75rem]">
                        {table.edit ? (
                          <h2
                            className={`text-[0.75rem] sodo400 ${
                              table.saving ? "text-[#D8DBE1]" : "text-black"
                            } tracking-[-0.03rem]  w-[7.75rem] truncate `}
                          >
                            {" "}
                            {table.categoryName}
                          </h2>
                        ) : (
                          <CustomLabelSwitchSelect
                            selectedValue={table.categoryName}
                            handleSelectCategories={handleSelectCategories}
                            option={table}
                            height="1.62rem"
                            labelHeader="Select categories"
                            open={showOptions}
                            setOpen={setShowOptions}
                            selectedData={table.categories}
                            selectedNames={table.categories.map(
                              (cat) => cat.name
                            )}
                            handleChange={(name, id) => {
                              setShowOptions(ture);
                              setQrTable((prev) => ({
                                ...prev,
                              }));
                            }}
                            data={categoriesData ? categoriesData : []}
                          />
                        )}
                      </td>

                      <td className="py-[0.75rem]">
                        <div className="flex space-x-[2px] items-center cursor-pointer">
                          <span>
                            {downloadIcon(
                              !table.edit || table.saving
                                ? "#D8DBE1"
                                : "#06AE68"
                            )}
                          </span>
                          <h2
                            className={`${
                              !table.edit || table.saving
                                ? "text-[#D8DBE1]"
                                : "text-[#06AE68]"
                            } text-[0.75rem] sodo400 tracking-[-0.015rem]`}
                          >
                            Download
                          </h2>
                        </div>
                      </td>

                      {!table.edit ? (
                        <td
                          className={`py-[0.75rem] ${
                            table.saving ? "text-[#D8DBE1" : "text-[#072A85]"
                          } text-[0.75rem] sodo600 tracking-[-0.005rem]  text-center cursor-pointer`}
                          onClick={() => {
                            const qr = qrTable;

                            let newQr = qr.map((item) => {
                              if (item.id === table.id) {
                                return {
                                  ...item,
                                  edit: true,
                                  saving: true,
                                };
                              } else {
                                return item;
                              }
                            });

                            setQrTable(newQr);

                            table.new
                              ? createQrCode(table)
                              : updateQrCode(table);
                          }}
                        >
                          save changes
                        </td>
                      ) : (
                        <td className="py-[0.75rem]  h-[3.62rem] flex justify-between items-center text-center ">
                          <h2
                            className={` ${
                              table.saving ? "text-[#D8DBE1]" : "text-[#072A85]"
                            } text-[0.75rem] sodo600 tracking-[-0.005rem] cursor-pointer`}
                            onClick={() => {
                              const qr = qrTable;

                              let newQr = qr.map((item) => {
                                if (item.id === table.id) {
                                  return {
                                    ...item,
                                    edit: false,
                                    new: false,
                                  };
                                } else {
                                  return item;
                                }
                              });

                              setQrTable(newQr);
                            }}
                          >
                            Edit
                          </h2>
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              deleteQr(table.id);
                            }}
                          >
                            {table.saving ? deleteIconGray : deleteRedIcon}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>

                <div
                  className="space-x-[0.25rem] mt-[1rem] flex cursor-pointer"
                  onClick={handleAddTable}
                >
                  {plusIconBlue}
                  <h2 className="text-[#072A85] text-[0.75rem] sodo700 tracking-[-0.48px]">
                    Add table
                  </h2>
                </div>
              </table>
            }
          </div>
        )}

        {/* <div className="w-full flex md:space-x-[0.75rem] flex-col md:flex-row space-y-[1.25rem] md:space-y-0 ">
          <span className="w-full md:w-fit">
            <DashBtn padding="9px 37px" text="Generate ordering cards" />
          </span>
          <span className="w-full md:w-fit">
            <DashBtn
              padding="9px 35px"
              text="Generate QR Codes only"
              lightTheme={true}
            />
          </span>
        </div> */}
      </div>

      <div className="border border-[#E6E6E6] hidden  rounded-[8px] py-[2rem] px-[4rem] md:flex flex-col items-center space-y-[2rem]  md:w-[40%]">
        <h1 className="sodo400 text-[2.5rem] tracking-[-0.5px] text-black">
          {" "}
          Toasties{" "}
        </h1>
        <div className="flex flex-col items-center  space-y-[1rem] ">
          <h2 className="text-[0.75rem] sodo600 tracking-[-0.48px] uppercase ">
            Scan to order
          </h2>
          <div className="">{qrCodeIcon}</div>

          <div className="flex flex-col items-center space-y-[0.5rem]">
            <h2 className="text-[0.75rem] sodo600 tracking-[-0.48px] uppercase ">
              SECTION 1
            </h2>
            <div className="border border-[#E6E6E6] rounded-[4px] flex items-center justify-center py-[6px] px-[1rem]">
              <h3 className="text-[0.75rem] sodo400 tracking-[-0.48px] ">
                Table 5
              </h3>
            </div>
          </div>
        </div>
        <h1 className="text-[0.75rem] sodo400 tracking-[-0.48px] text-center ">
          Scan the QR code , place your order and <br /> wait for it to be
          brought to your table.
        </h1>
      </div>
    </div>
    // </ComponentModalLayout>
  );
};

export default CreateQrCodePage;
