import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStore from "../../context/hooks/useStore";
import { AllC, OrderDetails } from "./AddProduct";
import { useEffect, useRef, useState } from "react";
import { SubCategory } from "./SubCategory";

type Props = {
  categories: AllC;
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetails>>;
  setShowItem: React.Dispatch<React.SetStateAction<number>>;
  redirect: number | null;
};

const Category = (props: Props) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showPic, setShowPic] = useState(true);
  const store = useStore();
  const accordinWrapper = useRef<HTMLDivElement>(null);
  const { categories, setOrderDetails, setShowItem, redirect } = props;

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const isContain = accordinWrapper.current?.contains(e.target as Node);
      if (!isContain) {
        setExpanded(null);
      }
    });
  }, []);

  function handleCategory(
    parentCategory: string,
    category: string,
    subCategory: string
  ) {
    setOrderDetails((prev) => {
      prev.category = category;
      prev.parentCategory = parentCategory;
      prev.subCategory = subCategory;
      return { ...prev };
    });
    setShowItem((prev) => redirect || prev + 1);
  }

  return (
    <section className='category'>
      <header>
        {showPic && (
          <Image width={95} height={100} src='/shopping-bag.png' alt='logo' />
        )}
        <p>Welcome! {store?.auth.user?.displayName}</p>
        <p className='text-gray-700'>
          <b>Let&#39;s Add Your Post</b>
        </p>
        <p>Choice Your Option Below</p>
      </header>

      <main
        onClick={() => setShowPic(false)}
        ref={accordinWrapper}
        className='mt-5 text-lg'
      >
        <Accordion
          disableGutters
          sx={{ boxShadow: "none" }}
          expanded={expanded === 1}
          onChange={() => setExpanded(1)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              <b>Sell</b> Anything
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.Sell_Anything.map((ct) => (
              <SubCategory data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          sx={{ boxShadow: "none" }}
          expanded={expanded === 2}
          onChange={() => setExpanded(2)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              <b>Rent</b> Anything
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.Rent_Anything.map((ct) => (
              <SubCategory data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          sx={{ boxShadow: "none" }}
          expanded={expanded === 3}
          onChange={() => setExpanded(3)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              Post a <b>Job</b>
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.Post_a_Job.map((ct) => (
              <SubCategory data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          sx={{ boxShadow: "none" }}
          expanded={expanded === 4}
          onChange={() => setExpanded(4)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              Create a <b>Office, Bit</b>
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.Create_a_Office_Bit.map((ct) => (
              <SubCategory data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          sx={{ boxShadow: "none" }}
          expanded={expanded === 5}
          onChange={() => setExpanded(5)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              Look Something to <b>Buy</b>
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.Look_Something_to_Buy.map((ct) => (
              <SubCategory data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>
      </main>
    </section>
  );
};

export default Category;
