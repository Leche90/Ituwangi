const portfolioApi = {
  getHighlights: async () => {
    return await fetch("/api/portfolio/highlights").then((res) => res.json());
  },
};

export default portfolioApi;
