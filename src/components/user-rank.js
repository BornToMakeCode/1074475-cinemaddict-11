import {getUserRankName} from "../mock/utils.js";

export const createUserRankTemplate = (rank) => {
  const rankName = getUserRankName(rank);
  return (
    `
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rankName}</span>
      </p>
    `
  );
};
