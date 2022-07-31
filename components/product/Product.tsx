import { Box, Modal } from "@mui/material";
import React from "react";
import useStore from "../../context/hooks/useStore";
import { modal_style } from "../admin_page/shared";

const Product = () => {
  const store = useStore();

  return (
    <div>
      <Modal
        open={store?.State.showProductModal || false}
        onClose={() => store?.State.setShowProductModal(false)}
      >
        <Box style={modal_style} className='modal'>
          <p>product</p>
        </Box>
      </Modal>
    </div>
  );
};

export default Product;
