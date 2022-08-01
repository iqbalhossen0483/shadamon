import { Remove } from "@mui/icons-material";
import { Modal, Box, Button, Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { buttonType, modal_style, parentCategory } from "../shared";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AddIcon from "@mui/icons-material/Add";
import Select from "../../utilitize/Select";
import { useRouter } from "next/router";
import useStore from "../../../context/hooks/useStore";
import AddFeature from "../features/Feature";
import { fetchApi } from "../../../client/services/fetchApi";

const CategoryModal = (props) => {
  const [subCategory, setSubCategory] = useState({ category_1: "" });
  const [selectedFeature, setSetectedFeature] = useState([]);
  const [parant_category, setParentC] = useState("Sell Anything");
  const { showModal, setShowModal, submitter, title } = props;
  const [selectedBtn, setSelectedBtn] = useState([]);
  const [features, setFeatures] = useState([]);
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const submitBtn = useRef(null);
  const [basicData, setBasicData] = useState({
    free_post: "",
    ordering: "",
    category_name: "",
    status: "Yes",
  });
  const store = useStore();
  const router = useRouter();

  useEffect(() => {
    if (title === "Update Category" && router.query.id && showModal) {
      (async () => {
        const { data, error } = await fetchApi(
          `/api/category?id=${router.query.id}`
        );
        if (!error) {
          setFeatures(data.features);
          setSelectedBtn(data.buttons);
          const sft = [];
          data.active_features.forEach((ft) => {
            sft.push(ft.feature_name);
          });
          const subCategory = {};
          data.sub_category.forEach((sub, i) => {
            subCategory[`category_${i + 1}`] = sub;
          });
          setSubCategory(subCategory);
          setSetectedFeature(sft);
          setParentC(data.parant_category);
          setBasicData({
            category_name: data.category_name,
            free_post: data.free_post,
            ordering: data.ordering,
            status: data.status,
          });
          setIcon(data.icon);
          window.imgId = data.icon.id;
        } else store?.State.setAlert({ msg: error.message, type: "error" });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id, showModal]);

  function handleRemove(key, i) {
    if (i > 0) {
      const sub = subCategory;
      delete sub[key];
      setSubCategory({ ...sub });
    }
  }
  function handleAdd(index) {
    const sub = subCategory;
    sub[`category_${index + 2}`] = "";
    setSubCategory({ ...sub });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    //packeging..
    const payload = {};
    const sub_category = [];
    Object.entries(subCategory).forEach(([_, value]) => {
      sub_category.push(value);
    });
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
    const date = new Date().toISOString();
    payload.created_at = new Date(date);
    payload.created_by = JSON.stringify({
      uid: store?.auth.user?.uid,
      name: store?.auth.user?.displayName,
    });
    payload.icon = icon.length ? icon[0] : JSON.stringify(icon);
    payload.free_post = parseInt(basicData.free_post);
    payload.ordering = parseInt(basicData.ordering);
    payload.category_name = basicData.category_name;
    payload.status = basicData.status;
    payload.parant_category = parant_category;

    if (title === "Update Category") {
      payload.id = router.query.id;
    }
    if (title === "Update Category" && icon.length) {
      payload.imgId = window.imgId;
    }
    //till;

    //create form data and post;
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // do action
    const { error } = await submitter(formData);
    if (!error) {
      setSubCategory({ category_1: "" });
      setBasicData({
        free_post: "",
        ordering: "",
        category_name: "",
        status: "Yes",
      });
      setFeatures([]);
      setSetectedFeature([]);
      setSelectedBtn([]);
    }
    setLoading(false);
  }

  function handleInput(value, name) {
    const exist = basicData;
    exist[name] = value;
    setBasicData({ ...exist });
  }

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }
  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Box sx={modal_style} className='modal add-category-modal'>
        <section className='category'>
          <div className='header '>
            <div>
              <AddBoxRoundedIcon /> <span>{title}</span>
            </div>
            <div>
              <Button
                onClick={() => submitBtn.current?.click()}
                disabled={loading}
                variant='contained'
                className='save'
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setShowModal(false);
                }}
                variant='contained'
                className='cancel'
              >
                Cancel
              </Button>
            </div>
          </div>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className='col-span-3 grid grid-cols-3'>
              <div className='col-span-2'>
                <select onChange={(e) => setParentC(e.target.value)}>
                  {parentCategory.map((category) => (
                    <option
                      selected={parant_category === category}
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  onChange={(e) => handleInput(e.target.value, "category_name")}
                  type='text'
                  value={basicData.category_name}
                  required
                  placeholder='Category Name'
                />
                {Object.entries(subCategory).map(([key, value], i, arr) => (
                  <div className='relative' key={key}>
                    <input
                      onChange={(e) =>
                        setSubCategory((prev) => {
                          const newP = prev;
                          newP[key] = e.target.value;
                          return { ...newP };
                        })
                      }
                      value={value || ""}
                      type='text'
                      placeholder='Sub-category'
                    />
                    {i === arr.length - 1 && (
                      <section className='add-remove'>
                        <button
                          onClick={() => handleAdd(i)}
                          className='border'
                          type='button'
                        >
                          <AddIcon />
                        </button>
                        <button
                          onClick={() => handleRemove(key, i)}
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
                setSelectedOptions={setSetectedFeature}
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
                onChange={(e) => handleInput(e.target.value, "free_post")}
                type='number'
                value={basicData.free_post}
                placeholder='Free Post'
              />
              <input
                onChange={(e) => handleInput(e.target.value, "ordering")}
                value={basicData.ordering}
                type='number'
                placeholder='Ordering'
              />
              <input
                onChange={(e) => setIcon(e.target.files)}
                required={title === "Add Category"}
                type='file'
                accept='image/*'
              />
              <div className='flex justify-between items-center'>
                <p>Status</p>
                <div className='space-x-3'>
                  <input
                    onChange={(e) => handleInput(e.target.value, "status")}
                    checked={basicData.status === "Yes"}
                    id='yes'
                    value='Yes'
                    type='radio'
                    name='status'
                  />
                  <label htmlFor='yes'>Yes</label>
                  <input
                    onChange={(e) => handleInput(e.target.value, "status")}
                    checked={basicData.status === "No"}
                    value='No'
                    id='no'
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
  );
};

export default CategoryModal;
