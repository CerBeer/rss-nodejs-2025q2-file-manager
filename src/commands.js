import coloring, { colors } from "./utils/colors.js";
import about from "./commands/about.js";
import help from "./commands/help.js";
import exit from "./commands/exit.js";
import man from "./commands/man.js";
import add from "./commands/add.js";
import cat from "./commands/cat.js";
import cd from "./commands/cd.js";
import cp from "./commands/cp.js";
import mkdir from "./commands/mkdir.js";
import compress from "./commands/compress.js";
import decompress from "./commands/decompress.js";
import hash from "./commands/hash.js";
import ls from "./commands/ls.js";
import mv from "./commands/mv.js";
import remove from "./commands/rm.js";
import rn from "./commands/rn.js";
import up from "./commands/up.js";
import os from "./commands/os.js";

const commandsList = {
  ".exit": exit,
  "?": help,
  about: about,
  man: man,
  help: help,
  add: add,
  cat: cat,
  cd: cd,
  cp: cp,
  mkdir: mkdir,
  compress: compress,
  decompress: decompress,
  hash: hash,
  ls: ls,
  mv: mv,
  rm: remove,
  rn: rn,
  up: up,
  os: os,
};

const isKnownCommand = (command) => {
  return command.length && commandsList.hasOwnProperty(command);
};

const getCommand = (command) => {
  if (!command.length) {
    return () => {
      return "";
    };
  }
  if (!isKnownCommand(command)) {
    return () => {
      return coloring(
        'Invalid input\nCommand not found, try "help"',
        colors.fg.yellow
      );
    };
  }
  const { func } = commandsList[command]();
  return func;
};

export const getMan = (command) => {
  if (!isKnownCommand(command)) {
    return coloring(
      'Command not found, Try "man *" to get a list of commands',
      colors.fg.yellow
    );
  }
  const { about } = commandsList[command]();
  return about;
};

export const getCommandsList = () => {
  return Object.keys(commandsList).sort().join(", ");
};

export default getCommand;
