import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchApi } from "../../client/services/fetchApi";
import useStore from "../../context/hooks/useStore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderDetails } from "./AddProduct";

type Props = {
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetails>>;
  setShowItem: React.Dispatch<React.SetStateAction<number>>;
  
};

const Location = ({ setOrderDetails, setShowItem }: Props) => {
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [expanded, setExpanded] = useState(-1);
  const store = useStore();

  useEffect(() => {
    (async () => {
      const { data, error } = await fetchApi("/api/location");
      if (!error) {
        setLocations(data);
      } else
        store?.State.setAlert({
          msg: "Ops!, Something went wrong",
          type: "error",
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLocation(location: string, sublocation: string) {
    setOrderDetails((prev) => {
      prev.location = location;
      prev.subLocation = sublocation;
      return { ...prev };
    });
    setShowItem(3);
  }

  return (
    <div className='location-container'>
      <h3 className='text-xl font-semibold'>Select Your Location</h3>
      {locations?.map((loc, index) => (
        <Accordion
          expanded={expanded === index}
          disableGutters
          onChange={() => setExpanded(index)}
          sx={{ boxShadow: "none" }}
          key={loc._id}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {loc.location_name}
          </AccordionSummary>
          <AccordionDetails className='details'>
            {loc.sub_location.map((subLoc) => (
              <p
                onClick={() =>
                  handleLocation(loc.location_name, subLoc.sub_location_name)
                }
                key={subLoc._id}
              >
                {subLoc.sub_location_name}
              </p>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Location;
