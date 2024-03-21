export const paths = {
  irregularVerbs: {
    path: "/irregular-verbs",
    name: "Irregular verbs",
  },
  allUserTerms: {
    path: "/collections/all-user-terms",
    name: "All terms",
  },
  collection: {
    path: (id: string) => `/collections/${id}`,
  },
};
