import React, { useEffect, useState } from "react";
import { AllC, OrderDetails } from "./AddProduct";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";

const Features = (props) => {
  const { orderDetails, categories, setShowItem, setRedirect } = props;
  const [category, setCategory] = useState(null);
  function handleChange(name) {
    if (name === "location") {
      setShowItem(2);
    } else if (name === "category") {
      setShowItem(1);
      setRedirect(3);
    }
  }

  useEffect(() => {
    let parent;
    for (const p in categories) {
      if (
        p.replaceAll("_", " ") ===
        orderDetails.parentCategory.replaceAll(",", "")
      ) {
        parent = p;
      }
    }
    const category = categories[parent].find(
      (ct) => ct.category_name === orderDetails.category
    );
    const sub = category.sub_category.find(
      (ct) => ct.sub_category_name === orderDetails.subCategory
    );
    setCategory(sub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='features-container'>
      <h3 className='text-xl font-semibold'>Fill in the details</h3>
      <header>
        <div>
          <LocationOnIcon />
          <b>{orderDetails.subLocation}</b>
          <small
            onClick={() => handleChange("location")}
            className='text-primary cursor-pointer'
          >
            CHANGE
          </small>
        </div>
        <div>
          <CategoryIcon />
          <b>{orderDetails.subCategory}</b>
          <small
            onClick={() => handleChange("category")}
            className='text-primary cursor-pointer'
          >
            CHANGE
          </small>
        </div>
      </header>
      {category?.active_features.map((feature) => (
        <p key={feature._id}>{feature.feature_name}</p>
      ))}
    </div>
  );
};

export default Features;
