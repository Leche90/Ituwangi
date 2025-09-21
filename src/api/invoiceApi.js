const invoiceApi = {
  getRecent: async () => {
    return await fetch("/api/invoices/recent").then((res) => res.json());
  },
};

export default invoiceApi;
