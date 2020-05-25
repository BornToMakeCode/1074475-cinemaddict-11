export const createFooterStatisticsTemplate = (filmsCount) => {
  return (
    `
    <section class="footer__statistics">
      <p>${filmsCount.toLocaleString(`ru`)} movies inside</p>
    </section>
    `
  );
};
