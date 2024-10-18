export const columnsOptions = {
  todo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};

export const columnKeys = Object.keys(columnsOptions);

export const columnDropdownOptions = columnKeys.map((key) => ({
  value: key,
  label: columnsOptions[key],
}));
