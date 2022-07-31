import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { fetchApi } from "../../../client/services/fetchApi";
import useStore from "../../../context/hooks/useStore";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryModal from "./CategoryModal";
import { useRouter } from "next/router";
import Spinner from "../../utilitize/Spinner";

const Category = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const store = useStore();
  const router = useRouter();

  const tableHeaders = [
    "Category Name",
    "Order",
    "Status",
    "Entry Date",
    "Created By",
    "",
  ];

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchApi("/api/category");
      if (!error) {
        setCategories(data);
        setLoading(false);
      } else {
        store?.State.setAlert({ msg: error.message, type: "error" });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  // post category
  async function postCategory(formData: FormData) {
    const { data, error } = await fetchApi("/api/category", {
      method: "POST",
      body: formData,
    });
    if (!error) {
      store?.State.setAlert({
        msg: data.message,
        type: "success",
      });
      setUpdate((prev) => !prev);
      setAddCategory(false);
      return { error: false };
    } else {
      store?.State.setAlert({
        msg: error.message,
        type: "error",
      });
      return { error: true };
    }
  }

  async function deleteCategory(id: string, icon: string) {
    const { data, error } = await fetchApi("/api/category", {
      method: "DELETE",
      headers: {
        id,
        icon,
      },
    });
    if (!error && data.deletedCount > 0) {
      store?.State.setAlert({
        msg: "Category deleted successfully",
        type: "success",
      });
      const exist = categories?.filter((ct) => ct._id !== id);
      setCategories(exist || null);
    } else if (!error && data.deletedCount === 0) {
      store?.State.setAlert({
        msg: "Ops!, unaible to delete. Try again",
        type: "error",
      });
    } else {
      store?.State.setAlert({
        msg: error.message,
        type: "error",
      });
    }
  }

  async function putCategory(formData: FormData) {
    const { data, error } = await fetchApi("/api/category", {
      method: "PUT",
      body: formData,
    });
    if (!error && data.modifiedCount > 0) {
      store?.State.setAlert({ msg: "Update successful", type: "success" });
      setUpdateCategory(false);
      setUpdate((prev) => !prev);
      return { error: false };
    } else if (!error && data.modifiedCount === 0) {
      store?.State.setAlert({ msg: "Ops!, try again", type: "error" });
      return { error: true };
    } else {
      store?.State.setAlert({ msg: error.message, type: "error" });
      return { error: true };
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container className='category-container'>
      <Header title='Add Category' />
      <div className='first-header'>
        <Button variant='contained' onClick={() => setAddCategory(true)}>
          Add Category
        </Button>
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
        <TableBody>
          {categories?.map((category) => (
            <TableRow hover key={category._id}>
              <TableCell>{category.category_name}</TableCell>
              <TableCell>{category.ordering}</TableCell>
              <TableCell>{category.status}</TableCell>
              <TableCell>{category.created_at.slice(0, 10)}</TableCell>
              <TableCell>{category.created_by.name}</TableCell>
              <TableCell>
                <div className='space-x-2'>
                  <button
                    onClick={() => {
                      setUpdateCategory(true);
                      router.push(
                        `${router.pathname}?add_category=true&id=${category._id}`
                      );
                    }}
                  >
                    <BorderColorIcon />
                  </button>
                  <button
                    onClick={() =>
                      deleteCategory(category._id, category.icon.id)
                    }
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CategoryModal
        title='Add Category'
        setShowModal={setAddCategory}
        showModal={addCategory}
        submitter={postCategory}
      />
      <CategoryModal
        title='Update Category'
        setShowModal={setUpdateCategory}
        showModal={updateCategory}
        submitter={putCategory}
      />
    </Container>
  );
};

export default Category;
