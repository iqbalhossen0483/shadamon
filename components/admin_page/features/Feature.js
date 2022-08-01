import {
  Tooltip,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import useStore from "../../../context/hooks/useStore";
import FeatureModal from "./FeatureModal";
import { useRouter } from "next/router";

const Feature = ({ features, setFeatures }) => {
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [showUpdateFeature, setShowUpdateFeature] = useState(false);
  const featureHeader = ["Feature Name", "Input", "Order", "Status", ""];
  const store = useStore();
  const router = useRouter();

  function handleUpdate(name) {
    setShowUpdateFeature(true);
    router.push(
      router.pathname + "?add_category=true&feature=true&name=" + name
    );
  }

  function deleteFeature(name) {
    const exist = features.filter((opt) => opt.feature_name !== name);
    setFeatures(exist);
  }

  function addAndUpdateFeature(data, type) {
    let featuresData;
    if (type === "Update Feature") {
      featuresData = features.filter(
        (ft) => ft.feature_name !== router.query.name
      );
    } else featuresData = features;

    //validate is exist
    const exist = featuresData.find(
      (opt) => opt.feature_name === data.feature_name
    );
    if (exist) {
      store?.State.setAlert({
        msg: "Alreary added this feature",
        type: "warning",
      });
      return { error: true };
    }
    //till;

    //change ordering
    const neddOrdered = featuresData.find(
      (opt) => opt.ordering === data.ordering
    );
    if (neddOrdered) {
      let i = data.ordering;
      for (const feature of featuresData) {
        const exist = feature.ordering === i;
        if (exist) {
          feature.ordering = feature.ordering + 1;
          i++;
        }
      }
    }
    const sorted = [...featuresData, data].sort(
      (a, b) => a.ordering - b.ordering
    );
    setFeatures(sorted);
    //till;
    return { error: false };
  }

  return (
    <section className='features'>
      <header>
        <Tooltip title='Add Feature'>
          <IconButton onClick={() => setShowAddFeature(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </header>
      <Table>
        <TableHead>
          <TableRow>
            {featureHeader.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {features.length ? (
            features.map((feature, index) => (
              <TableRow key={index}>
                <TableCell>{feature.feature_name}</TableCell>
                <TableCell>{feature.feature_type}</TableCell>
                <TableCell>{feature.ordering}</TableCell>
                <TableCell>
                  {feature.status === "Yes" ? <DoneIcon /> : <ClearIcon />}
                </TableCell>
                <TableCell>
                  <div className='space-x-2'>
                    <button onClick={() => handleUpdate(feature.feature_name)}>
                      <BorderColorIcon />
                    </button>
                    <button onClick={() => deleteFeature(feature.feature_name)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <tr className='text-center text-gray-500'>
              <th>No Features Added</th>
            </tr>
          )}
        </TableBody>
      </Table>
      <FeatureModal
        showModal={showAddFeature}
        setShowModal={setShowAddFeature}
        submitter={addAndUpdateFeature}
        title='New Feature'
      />
      <FeatureModal
        showModal={showUpdateFeature}
        setShowModal={setShowUpdateFeature}
        submitter={addAndUpdateFeature}
        title='Update Feature'
        features={features}
      />
    </section>
  );
};

export default Feature;
