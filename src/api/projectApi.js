const projectApi = {
  getRecent: async () => {
    return await fetch("/api/projects/recent").then((res) => res.json());
  },
};

export default projectApi;
