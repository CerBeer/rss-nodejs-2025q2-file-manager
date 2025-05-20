const userNameFromArgs = () => {
  const args = process.argv;
  let userName = "Incognito";
  if (args.length > 1) {
    args.forEach((val) => {
      const splitParam = val.split("=");
      if (splitParam.length > 1 && splitParam[0] === "--username")
        if (splitParam[1].length) {
          userName = splitParam[1];
        }
    });
  }
  return userName;
};

export default userNameFromArgs;
