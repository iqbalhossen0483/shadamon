import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Feature from "../features/Feature";
import { modal_style, parentCategory } from "../shared";
import SubCategoryModal from "./SubCategoryModal";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import useStore from "../../../context/hooks/useStore";
import { useRouter } from "next/router";
import { fetchApi } from "../../../client/services/fetchApi";

const CategoryModal = (props) => {
  const [features, setFeatures] = useState([]),
    [addSubCategory, setAddSubCategory] = useState(false),
    [updateSubCategory, setUpdateSubCategory] = useState(false),
    [loading, setLoading] = useState(false),
    { showModal, setShowModal, submitter, title } = props,
    [category, setCategory] = useState({
      parent_category: "Sell Anything",
      category_name: "",
      icon: "",
      status: "Yes",
      ordering: "",
    }),
    [subCategory, setSubCategory] = useState([]),
    submitBtn = useRef(null),
    subHeaders = ["Sub-Category Name", "Free Post", "Ordering", "Status"],
    store = useStore(),
    router = useRouter();

  function handleCategoryInput(name, value) {
    setCategory((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  }

  function addUpdateSubCategory(data, type) {
    data.ordering = parseInt(data.ordering);
    data.free_post = parseInt(data.free_post);
    let subCategoryData;
    if (type === "Update Sub-Category") {
      subCategoryData = subCategory.filter(
        (ft) => ft.sub_category_name !== router.query.name
      );
    } else subCategoryData = subCategory;

    //validate is exist
    const exist = subCategoryData.find(
      (opt) => opt.sub_category_name === data.sub_category_name
    );
    if (exist) {
      store?.State.setAlert({
        msg: "Alreary added this Sub Category",
        type: "warning",
      });
      return { error: true };
    }
    //till;

    //change ordering
    const neddOrdered = subCategoryData.find(
      (opt) => opt.ordering === data.ordering
    );
    if (neddOrdered) {
      let i = data.ordering;
      for (const sub of subCategoryData) {
        const exist = sub.ordering === i;
        if (exist) {
          sub.ordering = sub.ordering + 1;
          i++;
        }
      }
    }
    const sorted = [...subCategoryData, data].sort(
      (a, b) => a.ordering - b.ordering
    );
    setSubCategory(sorted);
    //till;
    return { error: false };
  }

  function deleteSubCategory(name) {
    const exist = subCategory.filter((sbt) => sbt.sub_category_name !== name);
    setSubCategory(exist);
  }
  function handleUpdate(name) {
    setUpdateSubCategory(true);
    const url = `/admin?add_category=true&id=${router.query.id}&sub_category=true&name=${name}`;
    router.push(url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = { ...category, features, sub_category: subCategory };
    data.sub_category = JSON.stringify(data.sub_category);
    data.features = JSON.stringify(data.features);
    const date = new Date().toISOString();
    data.created_at = new Date(date);
    data.created_by = JSON.stringify({
      uid: store.auth.user.uid,
      name: store.auth.user.displayName,
    });
    if (title === "Update Category") {
      data.id = router.query.id;
    }
    if (title === "Update Category" && !data.icon) {
      data.icon = JSON.stringify(window.icon);
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const { error } = await submitter(formData);
    if (!error) {
      setCategory({
        parent_category: "Sell Anything",
        category_name: "",
        icon: "",
        status: "Yes",
        ordering: "",
      });
      setFeatures([]);
      setSubCategory([]);
    }
    setLoading(false);
  }

  //for updating data
  useEffect(() => {
    if (title === "Update Category" && router.query.id && showModal) {
      (async () => {
        const { data } = await fetchApi(`/api/category?id=${router.query.id}`);
        if (data) {
          setCategory({
            parent_category: data.parent_category,
            category_name: data.category_name,
            icon: "",
            status: data.status,
            ordering: data.ordering,
          });
          setFeatures(data.features);
          setSubCategory(data.sub_category);
          window.icon = data.icon;
        }
      })();
    }
  }, [router.query.id, showModal, title]);

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
            <div className='space-y-3'>
              <select
                onChange={(e) =>
                  handleCategoryInput("parent_category", e.target.value)
                }
              >
                {parentCategory.map((ctg, index) => (
                  <option
                    selected={category.parent_category === ctg}
                    key={index}
                    value={ctg}
                  >
                    {ctg}
                  </option>
                ))}
              </select>
              <input
                type='text'
                onChange={(e) =>
                  handleCategoryInput("category_name", e.target.value)
                }
                required
                placeholder='Category Name'
                value={category.category_name}
              />
            </div>
            <div className='space-y-3'>
              <input
                type='number'
                placeholder='Ordering'
                required
                value={category.ordering}
                onChange={(e) =>
                  handleCategoryInput("ordering", e.target.value)
                }
              />
              <input
                required={title === "Add Category"}
                onChange={(e) => handleCategoryInput("icon", e.target.files[0])}
                type='file'
                accept='image/*'
              />

              <div className='status'>
                <p>Status</p>
                <div className='space-x-2'>
                  <input
                    checked={category.status === "Yes"}
                    onChange={(e) =>
                      handleCategoryInput("status", e.target.value)
                    }
                    id='yes'
                    value='Yes'
                    type='radio'
                    name='status'
                  />
                  <label htmlFor='yes'>Yes</label>
                  <input
                    checked={category.status === "No"}
                    onChange={(e) =>
                      handleCategoryInput("status", e.target.value)
                    }
                    value='No'
                    id='no'
                    type='radio'
                    name='status'
                  />
                  <label htmlFor='no'>No</label>
                </div>
              </div>
            </div>
            <button hidden type='submit' ref={submitBtn}>
              submit
            </button>
          </form>

          <Divider sx={{ marginTop: 5 }} />
          <Table>
            <TableHead>
              <TableRow>
                {subHeaders.map((head) => (
                  <TableCell key={head}>{head}</TableCell>
                ))}
                <TableCell>
                  <Tooltip title='Add Sub Category'>
                    <IconButton onClick={() => setAddSubCategory(true)}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategory.length ? (
                subCategory.map((sct) => (
                  <TableRow key={sct.sub_category_name}>
                    <TableCell>{sct.sub_category_name}</TableCell>
                    <TableCell>{sct.free_post}</TableCell>
                    <TableCell>{sct.ordering}</TableCell>
                    <TableCell>{sct.status}</TableCell>
                    <TableCell>
                      <div className='space-x-2'>
                        <button
                          onClick={() => handleUpdate(sct.sub_category_name)}
                        >
                          <BorderColorIcon />
                        </button>
                        <button
                          onClick={() =>
                            deleteSubCategory(sct.sub_category_name)
                          }
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <tr className='text-center text-gray-500'>
                  <th>No Sub Category Added</th>
                </tr>
              )}
            </TableBody>
          </Table>
        </section>

        <Feature features={features} setFeatures={setFeatures} />
        <SubCategoryModal
          showModal={addSubCategory}
          setShowModal={setAddSubCategory}
          submitter={addUpdateSubCategory}
          title='Add Sub-Category'
          features={features}
        />
        <SubCategoryModal
          showModal={updateSubCategory}
          setShowModal={setUpdateSubCategory}
          submitter={addUpdateSubCategory}
          title='Update Sub-Category'
          features={features}
          subCategoryArr={subCategory}
        />
      </Box>
    </Modal>
  );
};

export default CategoryModal;
