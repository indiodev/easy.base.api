export function extractQuery(query: any): any {
  return Object.entries(query)
    .filter(([k]) => !k.includes("order-"))
    .reduce((acc, [key, value]) => {
      const isMultiRelacional = String(value)?.includes(",");

      if (isMultiRelacional) {
        acc[key] = { $in: String(value)?.split(",") };
      } else {
        acc[key] = value;
      }

      return acc;
    }, {} as any);
}

export function extractOrder(query: any): any {
  return Object.entries(query)
    .filter(([k]) => k.includes("order-"))
    .reduce((acc, [key, value]) => {
      const slug = key.replace("order-", "");
      acc[slug] = Number(value);
      return acc;
    }, {} as any);
}
