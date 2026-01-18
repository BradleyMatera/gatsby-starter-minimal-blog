const joinClasses = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export default joinClasses;
