export type LiteralObject = Record<string, unknown>;

export const isObject = (value: unknown): value is LiteralObject => {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
};
