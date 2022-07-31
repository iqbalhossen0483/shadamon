import {
  Tooltip,
  IconButton,
  Modal,
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { Remove } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { featureType, modal_style } from "../shared";
import useStore from "../../../context/hooks/useStore";

type Props = {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
};
type F = { i: number; uid: string };
const fea = [{ i: 1, uid: "feature_1" }];

const AddFeature = ({ features, setFeatures }: Props) => {
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [subFeature, setSubFeature] = useState<F[]>(fea);
  const [isSub, setIsSub] = useState(false);
  const submitBtn = useRef<HTMLButtonElement>(null);
  const { register, handleSubmit, reset } = useForm<any>();
  const featureHeader = ["Feature Name", "Input", "Order", "Status", ""];
  const store = useStore();

  function handleRemove() {
    if (subFeature.length > 1) {
      setSubFeature([...subFeature.slice(0, -1)]);
    }
  }
  function handleAdd(featue: any) {
    const uid = featue.uid.split("_")[0] + "_" + parseInt(featue.i) + 1;
    setSubFeature((prev) => [...prev, { i: featue.i + 1, uid }]);
  }
  function handleIsSub(value: string) {
    if (value === "input") {
      setIsSub(false);
    } else if (value === "url") {
      setIsSub(false);
    } else {
      setIsSub(true);
    }
  }

  function onSubmit(data: any) {
    data.ordering = parseInt(data.ordering);

    const sub_features = [];
    for (let i = 0; i < subFeature.length; i++) {
      const element = subFeature[i];
      if (data[element.uid]) {
        sub_features.push(data[element.uid]);
      }
      delete data[element.uid];
    }
    data.sub_features = sub_features;

    //validation is exist
    const exist = features.find(
      (opt) => opt.feature_name === data.feature_name
    );
    if (exist)
      return store?.State.setAlert({
        msg: "Alreary added this feature",
        type: "warning",
      });
    //till;

    //change ordering
    const neddOrdered = features.find((opt) => opt.ordering === data.ordering);
    if (neddOrdered) {
      const feature = features;
      feature.forEach((opt) => {
        opt.ordering = opt.ordering + 1;
      });
      feature.push(data);
      setFeatures(feature);
    } else setFeatures((prev) => [...prev, data]);
    //till;

    reset();
    setSubFeature([{ i: 1, uid: "feature_1" }]);
    setShowAddFeature(false);
    setIsSub(false);
  }

  function deleteFeature(name: string) {
    const exist = features.filter((opt) => opt.feature_name !== name);
    setFeatures(exist);
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
                    <button>
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

      <Modal open={showAddFeature} onClose={() => setShowAddFeature(false)}>
        <Box sx={modal_style} className='modal add-feature-modal'>
          <div className='header'>
            <div>
              <AddBoxRoundedIcon /> <span>New Feature</span>
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
                  setShowAddFeature(false);
                  setSubFeature([{ i: 1, uid: "feature_1" }]);
                }}
                variant='contained'
                className='cancel'
              >
                Cancel
              </Button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='col-span-3 grid grid-cols-3'>
              <div className='col-span-2'>
                <input
                  {...register("feature_name", { required: true })}
                  type='text'
                  required
                  placeholder='Feature Name'
                />
                <select
                  {...register("feature_type", { required: true })}
                  defaultValue='input'
                  onChange={(e) => handleIsSub(e.target.value)}
                >
                  {featureType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {subFeature.map((featue, i, arr) => (
                  <div className='relative' key={featue.uid}>
                    <input
                      {...register(featue.uid, { required: isSub })}
                      disabled={!isSub}
                      required={isSub}
                      type='text'
                      placeholder='Sub-feature'
                    />
                    {i === arr.length - 1 && (
                      <section className='add-remove'>
                        <button
                          disabled={!isSub}
                          onClick={() => handleAdd(featue)}
                          className='border'
                          type='button'
                        >
                          <AddIcon />
                        </button>
                        <button
                          onClick={handleRemove}
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
                {...register("ordering", { required: true })}
                type='number'
                required
                placeholder='Ordering'
              />
              <div className='flex justify-between items-center'>
                <p>Status</p>
                <div className='space-x-3'>
                  <input
                    {...register("status")}
                    id='yes'
                    defaultChecked
                    value='Yes'
                    type='radio'
                    name='status'
                  />
                  <label htmlFor='yes'>Yes</label>
                  <input
                    {...register("status")}
                    id='no'
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
    </section>
  );
};

export default AddFeature;
