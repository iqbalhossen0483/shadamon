import { Box, Modal } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchApi } from "../../client/services/fetchApi";
import useStore from "../../context/hooks/useStore";
import { modal_style } from "../admin_page/shared";
import Category from "./Category";

const AddProduct = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState(null);
  const store = useStore();

  useEffect(() => {
    (async () => {
      const { error, data } = await fetchApi("/api/category");
      if (!error) {
        setCategories(data);
      } else setError(error.message);
    })();
  }, []);

  return (
    <div>
      <Modal
        open={store?.State.showProductModal || false}
        onClose={() => store?.State.setShowProductModal(false)}
      >
        <Box style={modal_style} className='modal add-product'>
          <Category categories={categories} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddProduct;
