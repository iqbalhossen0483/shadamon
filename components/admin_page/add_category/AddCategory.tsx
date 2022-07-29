import {
  Button,
  IconButton,
  Modal,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AddFeature from "../add_feature/AddFeature";
import { Remove } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { buttonType, modal_style, parentCategory } from "../shared";
import Select from "../../utilitize/Select";
import { fetchApi } from "../../../client/services/fetchApi";

type S = { i: number; uid: string };
const sub = [{ i: 1, uid: "category_1" }];

const AddCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [subCategory, setSubCategory] = useState<S[]>(sub);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedFeature, setSeatectedFeature] = useState<string[]>([]);
  const [selectedBtn, setSelectedBtn] = useState<string[]>([]);
  const { handleSubmit, register, reset } = useForm<any>();
  const submitBtn = useRef<HTMLButtonElement>(null);

  const tableHeaders = [
    "Category Name",
    "Order",
    "Status",
    "Entry Date",
    "Created By",
    "",
  ];

  function handleRemove() {
    if (subCategory.length > 1) {
      setSubCategory([...subCategory.slice(0, -1)]);
    }
  }
  function handleAdd(featue: any) {
    const uid = featue.uid.split("_")[0] + `_${parseInt(featue.i) + 1}`;
    setSubCategory((prev) => [...prev, { i: featue.i + 1, uid }]);
  }

  async function onSubmit(payload: any) {
    //packeging..
    const sub_category = [];
    for (let i = 0; i < subCategory.length; i++) {
      const element = subCategory[i];
      if (payload[element.uid]) sub_category.push(payload[element.uid]);
      delete payload[element.uid];
    }
    const active_features = [];
    for (let i = 0; i < selectedFeature.length; i++) {
      const element = features.find(
        (opt) => opt.feature_name === selectedFeature[i]
      );
      if (element) active_features.push(element);
    }
    payload.sub_category = JSON.stringify(sub_category);
    payload.features = JSON.stringify(features);
    payload.active_features = JSON.stringify(active_features);
    payload.buttons = JSON.stringify(selectedBtn);
    //till;

    //create form data and post;
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    const { data, error } = await fetchApi("/api/category", {
      method: "POST",
      body: formData,
    });
    console.log({ data, error });
  }

  return (
    <div className='add-category-container'>
      <Header title='Add Category' />
      <div className='first-header'>
        <IconButton onClick={() => setShowModal(true)}>
          <AddIcon />
        </IconButton>
        <p>Categories</p>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={header}>
                <b>{header}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={modal_style} className='modal add-category-modal'>
          <section className='category'>
            <div className='header '>
              <div>
                <AddBoxRoundedIcon /> <span>New Category</span>
              </div>
              <div>
                <Button
                  onClick={() => submitBtn.current?.click()}
                  variant='contained'
                  className='save'
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setShowModal(false);
                    setSubCategory([{ i: 1, uid: "category_1" }]);
                  }}
                  variant='contained'
                  className='cancel'
                >
                  Cancel
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='col-span-3 grid grid-cols-3'>
                <div className='col-span-2'>
                  <select
                    {...register("parant_category")}
                    defaultValue='Sell Anything'
                  >
                    {parentCategory.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <input
                    {...register("category_name", { required: true })}
                    type='text'
                    required
                    placeholder='Category Name'
                  />
                  {subCategory.map((category, _, arr) => (
                    <div className='relative' key={category.uid}>
                      <input
                        {...register(category.uid)}
                        type='text'
                        placeholder='Sub-category'
                      />
                      {category.i === arr.length && (
                        <section className='add-remove'>
                          <button
                            onClick={() => handleAdd(category)}
                            className='border'
                            type='button'
                          >
                            <AddIcon />
                          </button>
                          <button
                            onClick={handleRemove}
                            className='border'
                            type='button'
                          >
                            <Remove />
                          </button>
                        </section>
                      )}
                    </div>
                  ))}
                </div>
                <div></div>
              </div>

              <div className='col-span-2'>
                <Select
                  selectedOptions={selectedFeature}
                  setSelectedOptions={setSeatectedFeature}
                  label='Features'
                >
                  {features.length ? (
                    features.map((feature, index) => (
                      <p key={index}>{feature.feature_name}</p>
                    ))
                  ) : (
                    <p>None</p>
                  )}
                </Select>
                <Select
                  selectedOptions={selectedBtn}
                  setSelectedOptions={setSelectedBtn}
                  label='Button Type'
                >
                  {buttonType.map((btn, index) => (
                    <p key={index}>{btn}</p>
                  ))}
                </Select>
                <input
                  {...register("free_post")}
                  type='text'
                  placeholder='Free Post'
                />
                <input
                  {...register("ordering")}
                  type='text'
                  placeholder='Ordering'
                />
                <input
                  {...register("logo", { required: true })}
                  required
                  type='file'
                  accept='image/*'
                />
                <div className='flex justify-between items-center'>
                  <p>Status</p>
                  <div className='space-x-3'>
                    <input
                      {...register("status")}
                      defaultChecked
                      id='yes'
                      value='Yes'
                      type='radio'
                      name='status'
                    />
                    <label htmlFor='yes'>Yes</label>
                    <input
                      {...register("status")}
                      id='no'
                      value='No'
                      type='radio'
                      name='status'
                    />
                    <label htmlFor='no'>No</label>
                  </div>
                </div>
              </div>
              <button ref={submitBtn} hidden type='submit'>
                submi
              </button>
            </form>
          </section>
          <AddFeature features={features} setFeatures={setFeatures} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddCategory;
