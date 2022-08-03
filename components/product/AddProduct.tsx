import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchApi } from "../../client/services/fetchApi";
import useStore from "../../context/hooks/useStore";
import { modal_style } from "../admin_page/shared";
import BackButton from "../utilitize/BackIButton";
import CloseButton from "../utilitize/CloseButton";
import Category from "./Category";
import Features from "./Features";
import Location from "./Location";
export type AllC = {
  Sell_Anything: Category[];
  Rent_Anything: Category[];
  Post_a_Job: Category[];
  Create_a_Office_Bit: Category[];
  Look_Something_to_Buy: Category[];
};
export type OrderDetails = {
  parentCategory: string;
  subCategory: string;
  category: string;
  location: string;
  subLocation: string;
};

const AddProduct = () => {
  const [showItem, setShowItem] = useState(1);
  const [redirect, setRedirect] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    parentCategory: "",
    category: "",
    subCategory: "",
    location: "",
    subLocation: "",
  });
  const [categories, setCategories] = useState<AllC>({
    Sell_Anything: [],
    Rent_Anything: [],
    Post_a_Job: [],
    Create_a_Office_Bit: [],
    Look_Something_to_Buy: [],
  });
  const store = useStore();

  useEffect(() => {
    (async () => {
      const { error, data } = await fetchApi("/api/category");
      if (!error) {
        if (data.length) {
          const categoryData: AllC = {
            Sell_Anything: [],
            Rent_Anything: [],
            Post_a_Job: [],
            Create_a_Office_Bit: [],
            Look_Something_to_Buy: [],
          };
          for (const category of data) {
            if (category.parent_category === "Sell Anything") {
              categoryData.Sell_Anything.push(category);
            } else if (category.parent_category === "Rent Anything") {
              categoryData.Rent_Anything.push(category);
            } else if (category.parent_category === "Post a Job") {
              categoryData.Post_a_Job.push(category);
            } else if (category.parent_category === "Create a Office, Bit") {
              categoryData.Create_a_Office_Bit.push(category);
            } else if (category.parent_category === "Look Something to Buy") {
              categoryData.Look_Something_to_Buy.push(category);
            }
          }
          categoryData.Sell_Anything = categoryData.Sell_Anything.sort(
            (a, b) => a.ordering - b.ordering
          );
          categoryData.Rent_Anything = categoryData.Rent_Anything.sort(
            (a, b) => a.ordering - b.ordering
          );
          categoryData.Post_a_Job = categoryData.Post_a_Job.sort(
            (a, b) => a.ordering - b.ordering
          );
          categoryData.Look_Something_to_Buy =
            categoryData.Look_Something_to_Buy.sort(
              (a, b) => a.ordering - b.ordering
            );
          categoryData.Create_a_Office_Bit =
            categoryData.Create_a_Office_Bit.sort(
              (a, b) => a.ordering - b.ordering
            );
          setCategories(categoryData);
        }
      } else
        store?.State.setAlert({
          msg: "Ops!, Something went wrong",
          type: "error",
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Modal
        open={store?.State.showProductModal || false}
        onClose={() => store?.State.setShowProductModal(false)}
      >
        <Box style={modal_style} className='modal add-product'>
          <CloseButton
            onClick={() => store?.State.setShowProductModal(false)}
          />
          {showItem !== 1 && (
            <BackButton onClick={() => setShowItem((prev) => prev - 1)} />
          )}
          {showItem === 1 && (
            <Category
              categories={categories}
              setOrderDetails={setOrderDetails}
              setShowItem={setShowItem}
              redirect={redirect}
            />
          )}
          {showItem === 2 && (
            <Location
              setOrderDetails={setOrderDetails}
              setShowItem={setShowItem}
            />
          )}
          {showItem === 3 && (
            <Features
              orderDetails={orderDetails}
              categories={categories}
              setShowItem={setShowItem}
              setRedirect={setRedirect}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AddProduct;
