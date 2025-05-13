import { resolve, parse } from "path";
import fs from "fs/promises";
import fileUtils from "../utils/file.js";

import coloring, { colors } from "../utils/colors.js";

const func = async (params, env) => {
  if (!params.length) return env.messages.InvalidParameters;
  const resolveParam = resolve(params[0]);
  const { base } = parse(resolveParam);
  const destination = resolve(env.workPath, base);
  if (resolveParam != destination) return env.messages.InvalidParameters;

  try {
    const check = await fileUtils.checkDestinationNotExist(destination);
    if (!check.checked) {
      return env.messages.OperationFailedWithError(check.errMsg);
    }

    await fs.mkdir(destination, { recursive: false });
    return env.messages.OperationSuccessful;
  } catch (err) {
    return env.messages.OperationFailedWithError(err);
  }
};

const about = coloring(
  `Usage: mkdir <new_directory_name>\nCreate new directory in current working directory`,
  colors.fg.green
);

const mkdir = () => {
  return { func, about };
};

export default mkdir;
