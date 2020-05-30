import AbstractComponent from "./abstract-component.js";

const getUserRankName = (number) => {
  let rankName;

  switch (true) {
    case (number === 0):
      rankName = ``;
      break;
    case number <= 10:
      rankName = `novice`;
      break;
    case number <= 20:
      rankName = `fan`;
      break;
    case (number > 20):
      rankName = `movie buff`;
      break;
  }

  return rankName;
};

const createUserRankTemplate = (rank) => {
  const rankName = getUserRankName(rank);
  return (
    `<p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rankName}</span>
      </p>`
  );
};

export default class UserRank extends AbstractComponent {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return createUserRankTemplate(this._rank);
  }
}

