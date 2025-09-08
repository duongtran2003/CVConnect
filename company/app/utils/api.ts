export function objectToQuery(obj: Record<string, any>): string {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(obj)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)]),
    ),
  ).toString();
}
