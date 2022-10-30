export default () => (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.APP_PUBLIC_URL);
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "10");
  next();
};
