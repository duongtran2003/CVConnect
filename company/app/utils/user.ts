import {
  DEFAULT_MONOGRAM_BACKGROUND_COLOR,
  MONOGRAM_BACKGROUND_COLOR,
} from "~/const/user";

const getMonogramColor = (id: number | undefined): string => {
  if (!id) {
    return DEFAULT_MONOGRAM_BACKGROUND_COLOR;
  }
  const colors = MONOGRAM_BACKGROUND_COLOR;
  const monogramColor =
    colors[id % colors.length] || DEFAULT_MONOGRAM_BACKGROUND_COLOR;
  return monogramColor;
};

export { getMonogramColor };
