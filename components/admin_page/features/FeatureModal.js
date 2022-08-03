import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import React, { useEffect, useRef, useState } from "react";
import { featureType, modal_style } from "../shared";
import { Box, Button, Modal } from "@mui/material";
import { Remove } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

const FeatureModal = (props) => {
  const [subFeature, setSubFeature] = useState({ feature_1: "" });
  const [isSub, setIsSub] = useState(false);
  const { showModal, setShowModal, submitter, title, features } = props;
  const [featuresData, setFeaturesData] = useState({
    feature_name: "",
    feature_type: "input",
    ordering: "",
    status: "Yes",
  });
  const submitBtn = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const isUpdate =
      router.query.feature && router.query.name && title === "Update Feature";
    if (isUpdate) {
      const data = features.find((ft) => ft.feature_name === router.query.name);
      if (data) {
        setFeaturesData({
          feature_name: data.feature_name,
          feature_type: data.feature_type,
          ordering: data.ordering,
          status: data.status,
        });
        const sub = {};
        data.sub_features.forEach((value, i) => {
          sub[`feature_${i + 1}`] = value;
        });
        if (Object.keys(sub).length === 0) {
          sub.feature_1 = "";
        } else setIsSub(true);
        setSubFeature(sub);
      }
    }
  }, [features, router.query.feature, router.query.name, title, showModal]);

  function handleInput(name, value) {
    setFeaturesData((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  }

  function handleRemoveSub(key) {
    if (Object.keys(subFeature).length > 1) {
      setSubFeature((prev) => {
        delete prev[key];
        return { ...prev };
      });
    }
  }
  function handleAddSub(index) {
    setSubFeature((prev) => {
      prev[`feature_${index + 2}`] = "";
      return { ...prev };
    });
  }
  function handleIsSub(value) {
    if (value === "input" || value === "url" || value === "description") {
      setIsSub(false);
    } else {
      setIsSub(true);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const data = {};
    data.ordering = parseInt(featuresData.ordering);
    data.feature_name = featuresData.feature_name;
    data.feature_type = featuresData.feature_type;
    data.status = featuresData.status;
    data.sub_features = [];
    Object.entries(subFeature).forEach(([_, value]) => {
      if (value) {
        data.sub_features.push(value);
      }
    });

    const { error } = submitter(data, title);

    if (!error) {
      setSubFeature({ feature_1: "" });
      setShowModal(false);
      setIsSub(false);
      setFeaturesData({
        feature_name: "",
        feature_type: "input",
        ordering: "",
        status: "Yes",
      });
    }
  }

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Box sx={modal_style} className='modal add-feature-modal'>
        <header className='header'>
          <div>
            <AddBoxRoundedIcon /> <span>{title}</span>
          </div>
          <div>
            <Button
              onClick={() => submitBtn.current?.click()}
              variant='contained'
              className='save'
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setShowModal(false);
                setSubFeature({ feature_1: "" });
              }}
              variant='contained'
              className='cancel'
            >
              Cancel
            </Button>
          </div>
        </header>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className='col-span-3 grid grid-cols-3'>
            <div className='col-span-2'>
              <input
                value={featuresData.feature_name}
                onChange={(e) => handleInput("feature_name", e.target.value)}
                type='text'
                required
                placeholder='Feature Name'
              />
              <select
                onChange={(e) => {
                  handleIsSub(e.target.value);
                  handleInput("feature_type", e.target.value);
                }}
              >
                {featureType.map((type) => (
                  <option
                    selected={featuresData.feature_type === type}
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
              {Object.entries(subFeature).map(([key, value], i, arr) => (
                <div className='relative' key={key}>
                  <input
                    disabled={!isSub}
                    value={value}
                    required={isSub}
                    onChange={(e) =>
                      setSubFeature((prev) => {
                        prev[key] = e.target.value;
                        return { ...prev };
                      })
                    }
                    type='text'
                    placeholder='Sub-feature'
                  />
                  {i === arr.length - 1 && (
                    <section className='add-remove-in-feature'>
                      <button
                        disabled={!isSub}
                        onClick={() => handleAddSub(i)}
                        className='border'
                        type='button'
                      >
                        <AddIcon />
                      </button>
                      <button
                        onClick={() => handleRemoveSub(key)}
                        className='border'
                        type='button'
                      >
                        <Remove />
                      </button>
                    </section>
                  )}
                </div>
              ))}
              <div></div>
            </div>
          </div>
          <div className='col-span-2'>
            <input
              value={featuresData.ordering}
              onChange={(e) => handleInput("ordering", e.target.value)}
              type='number'
              required
              placeholder='Ordering'
            />
            <div className='flex justify-between items-center'>
              <p>Status</p>
              <div className='space-x-3'>
                <input
                  onChange={(e) => handleInput("status", e.target.value)}
                  id='yes'
                  value='Yes'
                  checked={featuresData.status === "Yes"}
                  type='radio'
                  name='status'
                />
                <label htmlFor='yes'>Yes</label>
                <input
                  onChange={(e) => handleInput("status", e.target.value)}
                  id='no'
                  checked={featuresData.status === "No"}
                  value='No'
                  type='radio'
                  name='status'
                />
                <label htmlFor='no'>No</label>
              </div>
            </div>
          </div>
          <button hidden ref={submitBtn} type='submit'>
            submit
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default FeatureModal;
