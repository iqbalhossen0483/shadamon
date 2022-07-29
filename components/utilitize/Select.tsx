import {
  Cancel,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import React, { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  label: string;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const Select = (props: Props) => {
  const [options, setOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const selectDiv = useRef<HTMLDivElement>(null);
  const { children, label, selectedOptions, setSelectedOptions } = props;

  useEffect(() => {
    const childrenArr = Array.from(children as ArrayLike<ReactNode>);
    const textArr: string[] = [];
    if (childrenArr.length) {
      childrenArr.forEach((child) => {
        if (!selectedOptions.includes(child?.props.children)) {
          textArr.push(child?.props.children);
        }
      });
      setOptions(textArr);
    } else {
      const text = children?.props?.children;
      if (text) setOptions([text]);
    }

    window.addEventListener("click", (e) => {
      const isActive = selectDiv.current?.contains(e.target as Node);
      if (!isActive) {
        setIsOpen(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  function handleAdd(target: any) {
    if (
      target.innerText !== "None" &&
      !selectedOptions.includes(target.innerText)
    ) {
      setSelectedOptions((prev) => [...prev, target.innerText]);
      const exist = options.filter((opt) => opt !== target.innerText);
      setOptions(exist);
    }
  }
  function handleRemove(text: string) {
    const exist = selectedOptions.filter((opt) => opt !== text);
    setSelectedOptions(exist);
    setOptions((prev) => [...prev, text]);
  }

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      ref={selectDiv}
      className='select-component'
    >
      {selectedOptions.length ? (
        <div className='selected'>
          {selectedOptions.map((opt, i) => (
            <div
              style={{ marginTop: 0 }}
              onClick={() => handleRemove(opt)}
              key={i}
              className='chip'
            >
              <span>{opt.length > 5 ? opt.slice(0, 5) + ".." : opt}</span>
              <Cancel />
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-400'>{label}</p>
      )}
      <div className='icons'>
        {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </div>
      {isOpen && (
        <div onClick={(e) => e.stopPropagation()} className='options'>
          {options?.map((opt, index) => (
            <button
              onClick={(e) => handleAdd(e.target)}
              type='button'
              key={index}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
