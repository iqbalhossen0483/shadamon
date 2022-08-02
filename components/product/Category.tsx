import { AccordionDetails, AccordionSummary } from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStore from "../../context/hooks/useStore";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";

type Props = { categories: Category[] | null };

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

const Category = ({ categories }: Props) => {
  const store = useStore();

  return (
    <section className='category'>
      <header>
        <Image width={95} height={100} src='/shopping-bag.png' alt='logo' />
        <p>Welcome! {store?.auth.user?.displayName}</p>
        <p className='text-gray-700'>
          <b>Let&#39;s Add Your Post</b>
        </p>
        <p>Choice Your Option Below</p>
      </header>

      <main className='mt-5'>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p>
              <b>Sell</b> Anything
            </p>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </main>
    </section>
  );
};

export default Category;
