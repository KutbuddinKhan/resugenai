import { v4 as uuidv4 } from "uuid";

export const INITIAL_THEME_COLOR="#22C55E"

export const generateDocUUID = (): string => {
  const uuid = uuidv4().replace(/-/g, "");
  return `doc-${uuid.substring(0, 16)}`;
};
