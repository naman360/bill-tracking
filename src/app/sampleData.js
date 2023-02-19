import { v4 as uuid } from "uuid";

export const bills = [
  {
    id: uuid(),
    description: "Dominos",
    category: "Food & Dining",
    amount: "430",
    date: "2022-01-02",
    isHighlight: false,
  },
  {
    id: uuid(),
    description: "Car wash",
    category: "Utility",
    amount: "500",
    date: "2022-02-01",
    isHighlight: false,
  },
  {
    id: uuid(),
    description: "Amazon",
    category: "Shopping",
    amount: "2030",
    date: "2022-03-07",
    isHighlight: false,
  },
  {
    id: uuid(),
    description: "House rent",
    category: "Food & Dining",
    amount: "3590",
    date: "2022-04-03",
    isHighlight: false,
  },
  {
    id: uuid(),
    description: "Tuition",
    category: "Education",
    amount: "2200",
    date: "2022-05-12",
    isHighlight: false,
  },
  {
    id: uuid(),
    description: "Laundry",
    category: "Personal Care",
    amount: "320",
    date: "2022-06-10",
    isHighlight: false,
  },
  {
    id: uuid(),
    description: "Vacation",
    category: "Travel",
    amount: "3430",
    date: "2022-07-10",
    isHighlight: false,
  },
];

export const categories = [
  "Food & Dining",
  "Utility",
  "Shopping",
  "Education",
  "Personal Care",
  "Travel",
];
