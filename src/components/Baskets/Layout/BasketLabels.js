import deleteIcon from "../assets/deleteIcon.svg";
import starIcon from "../assets/starIcon.svg";
import starredIcon from "../assets/starredIcon.svg";
import styles from "./BasketLabel.module.css";

const BasketLabel = ({
  existingbasket,
  passData,
  setCurrentBasket,
  deletebasket,
  handleCheck,
  setDeleteBasketClicked,
  addToFavourites,
}) => {
  return (
    <div className={styles.basketLabel}>
      <div>
        <img
          src={existingbasket.is_favorite ? starredIcon : starIcon}
          onClick={() => addToFavourites(existingbasket)}
          alt=""
        />
      </div>

      <label
        className={styles.basketLabel__name}
        id={existingbasket.id}
        onClick={() => {
          console.log(existingbasket);
          passData(existingbasket);
          setCurrentBasket(existingbasket.name);
        }}
      >
        {existingbasket.name}
      </label>

      <img
        className={styles.basketLabel__delete}
        src={deleteIcon}
        alt=""
        onClick={() => {
          deletebasket(existingbasket);
          handleCheck();
          setDeleteBasketClicked("true");
        }}
      />
    </div>
  );
};

export default BasketLabel;
