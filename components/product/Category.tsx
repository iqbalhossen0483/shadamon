import { AccordionDetails, AccordionSummary } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStore from "../../context/hooks/useStore";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { AllC, OrderDetails } from "./AddProduct";
import { useEffect, useRef, useState } from "react";
import { Details } from "../utilitize/Details";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));
type Props = {
  categories: AllC;
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetails>>;
  setShowItem: React.Dispatch<React.SetStateAction<number>>;
};

const Category = ({ categories, setOrderDetails, setShowItem }: Props) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const store = useStore();
  const accordinWrapper = useRef<HTMLDivElement>(null);

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
    categoryName: string,
    subCategoryName: string
  ) {
    setOrderDetails((prev) => {
      prev.category = categoryName;
      prev.parent_category = parentCategory;
      prev.subCategoryName = subCategoryName;
      return { ...prev };
    });
    setShowItem((prev) => prev + 1);
  }

  return (
    <section className='category'>
      <header>
        {!expanded && (
          <Image width={95} height={100} src='/shopping-bag.png' alt='logo' />
        )}
        <p>Welcome! {store?.auth.user?.displayName}</p>
        <p className='text-gray-700'>
          <b>Let&#39;s Add Your Post</b>
        </p>
        <p>Choice Your Option Below</p>
      </header>

      <main ref={accordinWrapper} className='mt-5 text-lg'>
        <Accordion expanded={expanded === 1} onChange={() => setExpanded(1)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              <b>Sell</b> Anything
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.sell_Anything.map((ct) => (
              <Details data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 2} onChange={() => setExpanded(2)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              <b>Rent</b> Anything
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.rent_Anything.map((ct) => (
              <Details data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 3} onChange={() => setExpanded(3)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              Post a <b>Job</b>
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.post_a_Job.map((ct) => (
              <Details data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 4} onChange={() => setExpanded(4)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              Create a <b>Office, Bit</b>
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.create_Office_Bit.map((ct) => (
              <Details data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 5} onChange={() => setExpanded(5)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              Look Something to <b>Buy</b>
            </p>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {categories.look_Something_to_Buy.map((ct) => (
              <Details data={ct} key={ct._id} fn={handleCategory} />
            ))}
          </AccordionDetails>
        </Accordion>
      </main>
    </section>
  );
};

export default Category;
