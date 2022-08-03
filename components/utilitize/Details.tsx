import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import CircleIcon from "@mui/icons-material/Circle";
type Props = {
  data: Category;
  fn: (
    parentCategory: string,
    categoryName: string,
    subCategoryName: string
  ) => void;
};

export const Details = ({ data, fn }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div id='details-container' className={showDetails ? "bg-gray-100" : ""}>
      <div id='summery' onClick={() => setShowDetails((prev) => !prev)}>
        <Image height={15} width={15} src={data.icon.url} alt='icon' />
        <p>{data.category_name}</p>
        <div className='icon'>
          {showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>
      </div>
      {showDetails && (
        <div id='description'>
          {data.sub_category.map((stc) => (
            <div
              onClick={() =>
                fn(
                  data.parent_category,
                  data.category_name,
                  stc.sub_category_name
                )
              }
              key={stc._id}
            >
              <div>
                <CircleIcon sx={{ marginTop: 0.5 }} />
                <p>{stc.sub_category_name}</p>
              </div>
              <KeyboardDoubleArrowRightIcon />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
