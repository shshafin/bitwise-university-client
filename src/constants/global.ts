export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const genderNames = ["Male", "Female", "Other"];

export const bloodGroupNames = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const semesterStatus = [
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "ENDED", label: "Ended" },
];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const genderOptions = genderNames.map((item) => ({
  value: item,
  label: item,
}));

export const bloodGroupOptions = bloodGroupNames.map((item) => ({
  value: item,
  label: item,
}));
