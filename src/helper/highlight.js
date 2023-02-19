export const getHighlightedData = (arrGiven, budgetGiven) => {
  const temp_arr = [...arrGiven];
  const arr = temp_arr.sort((a, b) => a.amount - b.amount);
  const budget = Number(budgetGiven || 0);
  const newArray = [];
  let j = arr.length - 1;
  let ans = 0;
  while (0 <= j) {
    if (ans + Number(arr[j].amount) > budget) j--;
    else {
      newArray.push(arr[j].id);
      ans += Number(arr[j--].amount);
    }
  }
  return newArray;
};
