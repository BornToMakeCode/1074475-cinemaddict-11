
import {getRandomDate, getRandomIntegerNumber} from "../utils/common.js";

const commentTexts = [
  `Goood`,
  `Not goood`,
  `Very very good`,
  `Greate movie! Would buy it again`
];

const emojis = [`smile`, `sleeping`, `puke`, `angry`];

const authors = [
  `Ben`,
  `Ted`,
  `Admin`,
  `New user`,
  `Vasia`,
  `Natasha`
];

const getComments = (ids) => {
  const comments = [];
  for (let i = 0; i < ids.length; i++) {
    comments.push({
      id: ids[i],
      emoji: emojis[getRandomIntegerNumber(0, emojis.length)],
      text: commentTexts[getRandomIntegerNumber(0, commentTexts.length)],
      author: authors[getRandomIntegerNumber(0, authors.length)],
      createdDate: getRandomDate(),
    });

  }

  return comments;
};

export {getComments};
