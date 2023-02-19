import React from "react";
import currencyFormatter from "currency-formatter";
import PropTypes from "prop-types";
import styles from "./card.module.css";

const Card = ({ data, handleEdit, handleDelete }) => {
  const { id, description, category, amount, date, isHighlight } = data;
  return (
    <div className={`${styles.card} br-1 ${isHighlight ? "cardBg" : ""}`}>
      <div>
        <div className="flex justify-between">
          <div className={`${styles.heading}`}>{description}</div>
          <div className={`${styles.price}`}>
            {currencyFormatter.format(amount, { code: "INR" })}
          </div>
        </div>
        <div className="flex justify-between align-items-center">
          <div>
            <span className={`${styles.pill} bg-secondry secondry br-1`}>
              {category}
            </span>
            <div className={`${styles.pill} bg-secondry secondry br-1`}>
              {date}
            </div>
          </div>
          <div className="">
            <button
              onClick={() => handleEdit()}
              className="btn btn-outline-primary custom-btn "
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(id)}
              className="btn btn-outline-danger custom-btn "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.object,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

Card.defaultProps = {
  data: {},
  handleEdit: () => {},
  handleDelete: () => {},
};

export default Card;
