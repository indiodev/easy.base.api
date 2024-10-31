export function slugify(str: string, separator: string = "_"): string {
  return str
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, separator);
}

export function exclude(
  user: any,
  keys: any[],
): {
  [k: string]: unknown;
} {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

export function accentInsensitiveRegex(value: string): string {
  const accents: { [key: string]: string } = {
    a: "[aàáâãäå]",
    e: "[eèéêë]",
    i: "[iìíîï]",
    o: "[oòóôõö]",
    u: "[uùúûü]",
    c: "[cç]",
    n: "[nñ]",
  };

  return value
    .toLowerCase()
    .split("")
    .map((char) => accents[char] || char)
    .join("");
}
