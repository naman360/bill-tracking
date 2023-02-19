import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import Card from "../../container/card";
import currencyFormatter from "currency-formatter";
import {
  addBill,
  editBill,
  deleteBill,
  setBudget,
} from "../../app/reducers/billReducer";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import styles from "./bill.module.css";
import Chart from "../chart";

export function Bill() {
  const { bills, categories } = useSelector((state) => state.bills);
  const totalAmount = bills.reduce((total, curr) => {
    return total + parseInt(curr.amount);
  }, 0);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [budgetValue, setBudgetValue] = useState("");
  const [modalData, setModalData] = useState({
    heading: "",
    edit: false,
  });
  const initialForm = {
    id: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const budget = localStorage.getItem("item");

    if (budget !== "") {
      setBudgetValue(budget);
      dispatch(setBudget(budget));
    }
  }, []);

  const submissionAllowed =
    formData.description !== "" &&
    formData.category !== "" &&
    formData.amount !== "" &&
    formData.date !== "";

  const handleOpen = (heading, isEdit, data) => {
    setFormData(data);
    setModalData({
      heading,
      edit: isEdit,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialForm);
  };

  const handleDelete = (id) => {
    dispatch(deleteBill(id));
  };

  const handleEdit = (d) => {
    if (formData?.id) {
      dispatch(
        editBill({
          id: formData?.id,
          description: formData?.description,
          category: formData?.category,
          amount: formData?.amount,
          date: formData?.date,
        })
      );
      handleClose();
    }
  };

  const handleAddBill = () => {
    if (submissionAllowed) {
      const id = uuid();
      dispatch(
        addBill({
          id,
          description: formData?.description,
          category: formData?.category,
          amount: formData?.amount,
          date: formData?.date,
        })
      );
      handleClose();
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilter = (ev) => {
    if (ev.target.value === "Reset Filter") {
      setSelectedFilter("");
    } else setSelectedFilter(ev.target.value);
  };

  const handleBudget = (ev) => {
    const budget = ev.target.value;
    setBudgetValue(budget);
    dispatch(setBudget(budget));
    localStorage.setItem("item", budget);
  };

  return (
    <div className={`${styles.homeBillWrapper} fixed-container`}>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData?.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label className="required-field mt-3">Description</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={formData?.description}
              placeholder="Description"
              name="description"
            />

            <Form.Label className="required-field mt-3">Category</Form.Label>
            <Form.Select
              onChange={handleChange}
              value={formData?.category}
              name="category"
            >
              <option defaultValue disabled={formData?.category}>
                Select Category
              </option>
              {categories && categories.length > 0
                ? categories.map((val, index) => {
                    return <option key={`${val} ${index}`}>{val}</option>;
                  })
                : null}
            </Form.Select>

            <Form.Label className="required-field mt-3">Amount</Form.Label>
            <Form.Control
              type="number"
              onChange={handleChange}
              value={formData?.amount}
              placeholder="Amount"
              name="amount"
            />

            <Form.Label className="required-field mt-3">Date</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              value={formData?.date}
              name="date"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="btn btn-outline-danger">
            Close
          </button>
          <button
            disabled={!submissionAllowed}
            onClick={modalData?.edit ? handleEdit : handleAddBill}
            className="btn btn-outline-primary"
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
      <div className={styles.homeLeftPart}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Form.Label className="mt-3">Enter Your Budget</Form.Label>
          <Form.Control
            type="number"
            onChange={handleBudget}
            value={budgetValue}
            placeholder="Enter budget to highlight bills"
            className="w-50 mb-3"
          />
          <Form.Select
            onChange={handleFilter}
            value={selectedFilter}
            className={`${styles.filter} w-50`}
          >
            <option defaultValue>
              {selectedFilter ? "Reset Filter" : " Select Category"}
            </option>
            {categories && categories.length > 0
              ? categories.map((val, index) => {
                  return <option key={`${val} ${index}`}>{val}</option>;
                })
              : null}
          </Form.Select>

          <div className="mb-3 mt-3">
            <button
              onClick={() => handleOpen("Add Bill", false, initialForm)}
              className="btn btn-outline-success"
            >
              + Add Bill
            </button>
          </div>
        </div>
        {bills && bills.length > 0
          ? selectedFilter
            ? bills
                .filter(
                  (bill) =>
                    bill.category.toLowerCase() === selectedFilter.toLowerCase()
                )
                .map((data) => {
                  return (
                    <Card
                      key={data?.id}
                      data={data}
                      handleDelete={handleDelete}
                      handleEdit={() => handleOpen("Edit Bill", true, data)}
                    />
                  );
                })
            : bills.map((data) => {
                return (
                  <Card
                    key={data?.id}
                    data={data}
                    handleDelete={handleDelete}
                    handleEdit={() => handleOpen("Edit Bill", true, data)}
                  />
                );
              })
          : null}
      </div>
      <div className={styles.homeRightPart}>
        <Chart />
        <h4 className="mt-3">
          Total Spend=
          <span className="primary">
            <h4 className="d-inline-block">
              {currencyFormatter.format(totalAmount, { code: "INR" })}{" "}
            </h4>
          </span>
        </h4>
      </div>
    </div>
  );
}
