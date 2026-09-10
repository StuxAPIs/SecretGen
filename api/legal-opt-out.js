const { renderPage } = require('./_render');

module.exports = async (req, res) => {
  renderPage(res, 'legal-opt-out');
};
