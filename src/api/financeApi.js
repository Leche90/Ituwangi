const financeApi = {
  getEarnings: async () => {
    return await fetch("/api/finance/earnings").then((res) => res.json());
  },
};

export default financeApi;
