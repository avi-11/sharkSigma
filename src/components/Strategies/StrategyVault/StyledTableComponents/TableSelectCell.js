import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import downArrowIcon from "../../../../assets/Images/downArrow.svg";
import searchIcon from "../../../../assets/Images/searchIcon.svg";

import styles from "../StrategyVault.module.css";

const TableSelectCell = ({ value, index }) => {
  const cardRef = useRef(null);

  const [data, setData] = useState(value);
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const options = [
    { value: "default", label: "default" },
    { value: "zerodha", label: "Zerodha" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setSelectMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFilteredOptions(options);
  }, []);

  const searchOptions = (input) => {
    const newOptions = options.filter((option) => {
      if (option.label.toLowerCase().includes(input.toLowerCase())) {
        return true;
      }
      if (option.value.toLowerCase().includes(input.toLowerCase())) {
        return true;
      }
      return false;
    });

    setFilteredOptions(newOptions);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <button
        className={styles.brokerageSelectMenu}
        onClick={() => setSelectMenuOpen((currState) => !currState)}
      >
        <span>{data}</span>
        <img
          src={downArrowIcon}
          alt=""
          style={{
            transform: selectMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {selectMenuOpen && (
        <div
          className={styles.brokerageSelectMenu__options}
          ref={cardRef}
          style={{
            top: index > 2 ? "-100%" : "",
            transform: index > 2 ? "translateY(-95%)" : "",
          }}
        >
          <Card
            sx={{
              backgroundColor: "#292c3d",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color: "#ffffff",
                }}
              >
                <div>
                  <div className={styles.brokerageSearch}>
                    <img src={searchIcon} alt="" />
                    <input
                      type="text"
                      placeholder=""
                      onChange={(e) => searchOptions(e.target.value)}
                    />
                  </div>

                  <FormGroup style={{ margin: "10px auto" }}>
                    {filteredOptions.map((option) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={option.value === data}
                            onChange={() => setData(option.value)}
                            sx={{
                              color: "white !important",
                              "&.Mui-checked": {
                                color: "white !important",
                              },
                            }}
                          />
                        }
                        label={option.label}
                      />
                    ))}
                  </FormGroup>
                </div>
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TableSelectCell;
