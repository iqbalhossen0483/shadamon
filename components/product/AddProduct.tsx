import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchApi } from "../../client/services/fetchApi";
import useStore from "../../context/hooks/useStore";
import { modal_style } from "../admin_page/shared";
import BackButton from "../utilitize/BackIButton";
import CloseButton from "../utilitize/CloseButton";
import Category from "./Category";
import Location from "./Location";
export type AllC = {
  sell_Anything: Category[];
  rent_Anything: Category[];
  post_a_Job: Category[];
  create_Office_Bit: Category[];
  look_Something_to_Buy: Category[];
};
export type OrderDetails = {
  parent_category: string;
  category: string;
  subCategoryName: string;
  location: string;
};

const AddProduct = () => {
  const [showItem, setShowItem] = useState(1);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    parent_category: "",
    category: "",
    subCategoryName: "",
    location: "",
  });
  const [categories, setCategories] = useState<AllC>({
    sell_Anything: [],
    rent_Anything: [],
    post_a_Job: [],
    create_Office_Bit: [],
    look_Something_to_Buy: [],
  });
  const store = useStore();

  useEffect(() => {
    (async () => {
      const { error, data } = await fetchApi("/api/category");
      if (!error) {
        if (data.length) {
          const categoryData: AllC = {
            sell_Anything: [],
            rent_Anything: [],
            post_a_Job: [],
            create_Office_Bit: [],
            look_Something_to_Buy: [],
          };
          for (const category of data) {
            if (category.parent_category === "Sell Anything") {
              categoryData.sell_Anything.push(category);
            } else if (category.parent_category === "Rent Anything") {
              categoryData.rent_Anything.push(category);
            } else if (category.parent_category === "Post a Job") {
              categoryData.post_a_Job.push(category);
            } else if (category.parent_category === "Create a Office, Bit") {
              categoryData.create_Office_Bit.push(category);
            } else if (category.parent_category === "Look Something to Buy") {
              categoryData.look_Something_to_Buy.push(category);
            }
          }
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
            />
          )}
          {showItem === 2 && <Location />}
        </Box>
      </Modal>
    </div>
  );
};

export default AddProduct;
