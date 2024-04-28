export const paths = {
  irregularVerbs: {
    path: "/irregular-verbs",
    name: "Irregular verbs",
  },
  allUserTerms: {
    path: "/collections/all-user-terms",
    name: "All terms",
  },
  collections: { path: "/collections/" },
  collection: {
    path: (id: string) => `/collections/${id}`,
  },
  learningCollection: {
    path: (id: string) => `/collections/${id}/learn`,
  },
};
