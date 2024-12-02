export function extractQuery(query: any): any {
  return Object.entries(query)
    .filter(([k]) => !k.includes("order-"))
    .reduce((acc, [key, value]) => {
      const isMultiRelacional = String(value)?.includes(",");
      const isFilterDate = key.includes("-initial") || key.includes("-final");

      if (isFilterDate) {
        const field = key.split("-")[0];

        if (!acc[field]) {
          acc[field] = {};
        }

        if (key.includes("-initial")) {
          acc[field].$gte = value;
        }

        if (key.includes("-final")) {
          acc[field].$lte = value;
        }
      } else if (isMultiRelacional) {
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
