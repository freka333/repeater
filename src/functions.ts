import { Prisma } from "@prisma/client";

export const getMarkForLearning = ({
  unmarked,
  known,
  repeatable,
}: {
  unmarked: boolean;
  known: boolean;
  repeatable: boolean;
}) => {
  let mark: Prisma.UserTermsWhereInput = {};
  if (unmarked && known && !repeatable) {
    return (mark = {
      OR: [{ mark: null }, { mark: { isSet: false } }, { mark: "Known" }],
    });
  } else if (unmarked && !known && repeatable) {
    return (mark = {
      OR: [{ mark: null }, { mark: { isSet: false } }, { mark: "Repeatable" }],
    });
  } else if (unmarked && !known && !repeatable) {
    return (mark = {
      OR: [{ mark: null }, { mark: { isSet: false } }],
    });
  } else if (!unmarked && known && repeatable) {
    return (mark = {
      OR: [{ mark: "Known" }, { mark: "Repeatable" }],
    });
  } else if (!unmarked && known && !repeatable) {
    return (mark = { mark: "Known" });
  } else if (!unmarked && !known && repeatable) {
    return (mark = { mark: "Repeatable" });
  }
  return mark;
};
