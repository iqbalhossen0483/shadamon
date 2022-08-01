import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { Box, Button, Modal } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Select from "../../utilitize/Select";
import { buttonType, modal_style } from "../shared";

const SubCategoryModal = (props) => {
  const {
    showModal,
    setShowModal,
    submitter,
    title,
    features,
    subCategoryArr,
  } = props;
  const [selectedFeature, setSetectedFeature] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategory, setSubCategory] = useState({
    sub_category_name: "",
    free_post: "",
    ordering: "",
    status: "Yes",
  });
  const submitBtn = useRef(null);
  const router = useRouter();

  function handleSubCaInput(name, value) {
    setSubCategory((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  }

  useEffect(() => {
    const isUpdate =
      router.query.sub_category &&
      router.query.name &&
      title === "Update Sub-Category";
    if (isUpdate) {
      const data = subCategoryArr.find(
        (ft) => ft.sub_category_name === router.query.name
      );
      if (data) {
        setSubCategory({
          sub_category_name: data.sub_category_name,
          free_post: data.free_post,
          ordering: data.ordering,
          status: data.status,
        });
        setButtons(data.buttons);
        const actFeature = [];
        data.active_features.forEach((ft) => actFeature.push(ft.feature_name));
        setSetectedFeature(actFeature);
      }
    }
  }, [
    title,
    showModal,
    subCategoryArr,
    router.query.sub_category,
    router.query.name,
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const active_features = [];
    for (let i = 0; i < selectedFeature.length; i++) {
      const element = features.find(
        (opt) => opt.feature_name === selectedFeature[i]
      );
      if (element) active_features.push(element);
    }
    const data = { ...subCategory, buttons, active_features };

    const { error } = submitter(data, title);

    if (!error) {
      setSubCategory({
        sub_category_name: "",
        free_post: "",
        ordering: "",
        status: "Yes",
      });
      setSetectedFeature([]);
      setButtons([]);
      setShowModal(false);
    }
    setLoading(false);
  }

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Box style={modal_style} className='modal sub-category-container'>
        <header className='header '>
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
        </header>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type='text'
            value={subCategory.sub_category_name}
            onChange={(e) =>
              handleSubCaInput("sub_category_name", e.target.value)
            }
            placeholder='Sub Category Name'
          />
          <Select
            selectedOptions={selectedFeature}
            setSelectedOptions={setSetectedFeature}
            label='Features'
          >
            {features.length ? (
              features.map((feature, index) => {
                if (feature.status === "Yes") {
                  return <p key={index}>{feature.feature_name}</p>;
                } else return null;
              })
            ) : (
              <p>None</p>
            )}
          </Select>
          <Select
            selectedOptions={buttons}
            setSelectedOptions={setButtons}
            label='Button Type'
          >
            {buttonType.map((btn, index) => (
              <p key={index}>{btn}</p>
            ))}
          </Select>
          <input
            type='number'
            value={subCategory.free_post}
            onChange={(e) => handleSubCaInput("free_post", e.target.value)}
            placeholder='Free Post'
          />
          <input
            type='number'
            value={subCategory.ordering}
            onChange={(e) => handleSubCaInput("ordering", e.target.value)}
            placeholder='Ordering'
          />
          <div className='status'>
            <p>Status</p>
            <div className='space-x-2'>
              <input
                checked={subCategory.status === "Yes"}
                onChange={(e) => handleSubCaInput("status", e.target.value)}
                id='yes'
                value='Yes'
                type='radio'
                name='status'
              />
              <label htmlFor='yes'>Yes</label>
              <input
                checked={subCategory.status === "No"}
                onChange={(e) => handleSubCaInput("status", e.target.value)}
                value='No'
                id='no'
                type='radio'
                name='status'
              />
              <label htmlFor='no'>No</label>
            </div>
          </div>
          <button hidden type='submit' ref={submitBtn}>
            submit
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default SubCategoryModal;
