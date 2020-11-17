const hasNumber = (value) => {
  return new RegExp(/[0-9]/).test(value);
};
const hasMixed = (value) => {
  return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
};
const hasSpecial = (value) => {
  return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
};
export const strengthWord = (count) => {
  if (count <= 2) return "Weak";
  if (count <= 3) return "Fair";
  if (count <= 4) return "Good";
  if (count <= 5) return "Strong";
  if (count <= 6) return "Very Strong";
};
export const strengthIndicator = (value) => {
  let strengths = 1;
  if (value.length > 5) strengths++;
  if (value.length > 7) strengths++;
  if (hasNumber(value)) strengths++;
  if (hasSpecial(value)) strengths++;
  if (hasMixed(value)) strengths++;
  return strengths;
};
