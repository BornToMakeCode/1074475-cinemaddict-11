
import {getRandomDate} from "../mock/utils.js";

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
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
      author: authors[Math.floor(Math.random() * authors.length)],
      createdDate: getRandomDate(),
    });

  }

  return comments;
};

export {getComments};
