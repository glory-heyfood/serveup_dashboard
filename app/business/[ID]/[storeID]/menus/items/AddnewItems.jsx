import { plusIconBlack } from "@/SVGs";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import UploadImage from "@/components/UploadImage";
import DashBtn from "@/components/buttons/DashBtn";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";
import CustomLabel from "@/components/label/CustomLabel";
import LabelInput from "@/components/label/LabelInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import LabelText from "@/components/label/LabelText";
import LabelTextarea from "@/components/label/LabelTextarea";
import { options } from "@/data";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuModal from "../MenuModal";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import {
  createItem,
  getAllCategories,
  getAllModifiers,
  updateItem,
} from "@/redux/features/stores/menuSlice";
import FadeLoad from "@/components/loaders/FadeLoader";
import ImageCropper from "@/components/ImageCropper";

const AddnewItems = ({ handleClose, editData }) => {
  const showModal = useSelector((state) => state.modal.showModal);
  const categoriesData = useSelector((state) => state.menu.categoriesData);
  const modifiersData = useSelector((state) => state.menu.modifiersData);
  const btnLoading = useSelector((state) => state.menu.loading);
  const [categoryOptions, setCategoryOptions] = useState();
  const dataLoading = useSelector((state) => state.menu.dataLoading);
  const [inStock, setInStock] = useState({});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: null,
    category_names: "",
    image: "",
  });
  const [checkedModifiers, setCheckedModifiers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleToggleModifier = (modifier) => {
    // Check if the modifier is already in the array
    if (checkedModifiers.includes(modifier)) {
      // If it's already checked, remove it
      setCheckedModifiers((prevModifiers) =>
        prevModifiers.filter((data) => data !== modifier)
      );
    } else {
      // If it's not checked, add it
      setCheckedModifiers((prevModifiers) => [...prevModifiers, modifier]);
    }
  };
  const handleCreateItem = () => {
    const menu_id = JSON.parse(
      window.localStorage.getItem("serveup_store")
    )?.menu_id;
    const payload = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category_names: [formData.category_names],
      in_stock: {
        status: true,
        reference_date: "",
        message: "In Stock",
      },
      img_url: formData.image,
      menu_id: menu_id,
      modifier_ids: checkedModifiers.map((data) => data.id),
    };
    console.log(payload);

    dispatch(createItem(payload));
  };

  const handleEditItem = () => {
    const menu_id = JSON.parse(
      window.localStorage.getItem("serveup_store")
    )?.menu_id;
    const payload = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category_names: [formData.category_names],
      in_stock: inStock,
      img_url: formData.image,
      id: editData.id,
      menu_id: menu_id,
      modifier_ids: checkedModifiers.map((data) => data.id),
    };
    console.log(payload);

    dispatch(updateItem(payload));
  };

  useEffect(() => {
    if (editData) {      
      setFormData({
        name: editData.name,
        description: editData.description,
        price: editData.price,
        image: editData.img_url,
        category_names: editData.category_names[0],
      });
    }
  }, [editData]);

  useEffect(() => {
    const menu_id = JSON.parse(
      window.localStorage.getItem("serveup_store")
    )?.menu_id;
    dispatch(getAllCategories(menu_id));
    dispatch(getAllModifiers(menu_id));
  }, []);

  useEffect(() => {
    if (editData) {
      const checkedData = [];
      modifiersData?.forEach((data) => {
        editData?.modifier_ids?.forEach((element) => {
          console.log(data, element);
          data.id === element && checkedData.push(data);
        });
      });
      setCheckedModifiers(checkedData);
    }
  }, [modifiersData]);

  useEffect(() => {
    if (categoriesData?.length > 0) {
      let categData = categoriesData.map((data) => {
        const options = {
          value: data.name,
          text: data.name,
        };
        return options;
      });

      setCategoryOptions(categData);
    }
  }, [categoriesData]);

  return (
    <ComponentModalLayout handleClose={handleClose}>
      <div className="w-full px-[20px] pb-[32px]">
        <h1 className="dashHeader !mb-[32px] ml-[44px] md:ml-0">
          {editData ? "Edit" : "Create new"} Item
        </h1>
        <div className="flex flex-col space-y-[2em]">
          <CustomLabel header="Item details">
            <div className="flex flex-col md:flex-row md:space-x-[1rem] space-y-[2rem] md:space-y-0">
              <div className="w-full md:w-fit">
                <UploadImage
                  handleImage={(image) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      image: image,
                    }));
                  }}
                  image={formData.image}
                />
              </div>
              <div className="w-full flex flex-col space-y-[1rem]">
                <LabelSearchInput
                  label="Item name"
                  name="name"
                  handleChange={handleChange}
                  value={formData.name}
                  width="w-[35%]"
                  fontweight="sodo700"
                  placeholder="Item name"
                />
                <LabelTextarea
                  label="Description"
                  width="w-[35%]"
                  handleChange={handleChange}
                  value={formData.description}
                  name="description"
                  placeholder="Item description"
                />
              </div>
            </div>

            <LabelSelect
              label="Category"
              defaultValue={
                dataLoading
                  ? "Loading categories..."
                  : categoryOptions?.length === 0
                  ? "Please create a category before creating an item"
                  : "Select catgory"
              }
              option={categoryOptions?.length === 0 ? options : categoryOptions}
              handleChange={handleChange}
              name="category_names"
              selectedValue={formData.category_names}
              fullWidth
            />

            <LabelInput
              padding="13px 15px"
              label={<LabelText fontWeight="sodo700" label="Price" />}
            >
              <span className="inter600 text-black text-[0.825rem] tracking-[-0.56px] ">
                ₦{" "}
              </span>
              <input
                className="sodo400 border-none outline-none text-[0.825rem] tracking-[-0.56px]  "
                name="price"
                type="number"
                value={formData.price}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </LabelInput>
          </CustomLabel>

          <CustomLabel header="Modifiers">
            <div className="w-fit">
              <DashBtn
                text="Add modifiers"
                handleClick={() => {
                  dispatch(toggleModal(true));
                }}
                icon={plusIconBlack}
                lightTheme={true}
              />
            </div>
          </CustomLabel>

          <div className="mb-[2.5rem]">
            {checkedModifiers?.map((data, i) => (
              <div
                key={i}
                className="py-[1rem] items-center justify-between flex border-[0.5px] border-transparent border-b-[#E6E6E6] "
              >
                <h2 className="sodo400 text-[0.75rem] tracking-[-0.24px]  ">
                  {data.name}
                </h2>
              </div>
            ))}
          </div>

          {editData ? (
            <SaveDiscardBtn
              btnLoading={btnLoading}
              handleSaveClick={handleEditItem}
            />
          ) : (
            <div className="w-fit">
              <DashBtn
                text="Save"
                btnLoading={btnLoading}
                padding="11px 70px"
                handleClick={handleCreateItem}
              />
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <MenuModal
          btn={false}
          header="Add modifiers"
          subHeader="Select modifier sets to apply to this item"
        >
          <div className="mb-[2.5rem]">
            {modifiersData.length === 0 ? (
              <FadeLoad />
            ) : (
              modifiersData?.map((data, i) => (
                <div
                  key={i}
                  className="py-[1rem] cursor-pointer items-center space-x-[1rem] flex border-[0.5px] border-transparent border-b-[#E6E6E6] "
                  onClick={() => {
                    handleToggleModifier(data);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checkedModifiers.includes(data)}
                    onChange={() => handleToggleModifier(data)}
                  />
                  <h2 className="sodo400 text-[0.75rem] tracking-[-0.24px]  ">
                    {data.name}
                  </h2>
                </div>
              ))
            )}
          </div>
        </MenuModal>
      )}
    </ComponentModalLayout>
  );
};

export default AddnewItems;
