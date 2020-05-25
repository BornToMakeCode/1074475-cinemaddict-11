const menuNames = [`all movies`, `watchlist`, `history`, `favorites`];

const getMenu = () => {
  return menuNames.map((element) => {
    return {
      name: element,
      count: Math.floor(Math.random() * 100)
    };
  });
};

export {getMenu};
