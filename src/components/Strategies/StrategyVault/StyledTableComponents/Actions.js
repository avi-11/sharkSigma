import { IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import activateIcon from "../../../../assets/Images/powerOnIcon.svg";
import editIcon from "../../../../assets/Images/editIcon.svg";
import deleteIcon from "../../../../assets/Images/deleteIcon.svg";
import viewIcon from "../../../../assets/Images/eyeIcon.svg";
import deactivateIcon from "../../../../assets/Images/cancelIcon.svg";

import {
  activateStrategy,
  deactivateStrategy,
} from "../../services/strategySlice/strategySlice";
import { toast } from "react-toastify";

const Actions = ({ strategy }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  function redirectToBacktest(id) {
    let path = `/backtesting?${id}`;
    history.push(path);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {!strategy.strategy_setting.is_active ? (
        <Tooltip title="Activate Strategy">
          <IconButton
            onClick={() => dispatch(activateStrategy(strategy.strategy_id))}
          >
            <img src={activateIcon} alt="" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Deactivate Strategy">
          <IconButton
            onClick={() => dispatch(deactivateStrategy(strategy.strategy_id))}
          >
            <img src={deactivateIcon} alt="" />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="View Generated Signals">
        <IconButton>
          <Link
            to={{
              pathname: "/scanner",
              state: {
                strategyId: strategy.strategy_id,
                strategyName: strategy.strategy_name,
              },
            }}
            style={{
              padding: "0px",
              margin: "0px",
              fontSize: "0px",
            }}
          >
            <img src={viewIcon} alt="" />
          </Link>
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Strategy">
        <IconButton onClick={() => redirectToBacktest(strategy.strategy_id)}>
          <img src={editIcon} alt="" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Strategy">
        <IconButton onClick={() => toast.warn("Feature not implemented!!")}>
          <img src={deleteIcon} alt="" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Actions;
