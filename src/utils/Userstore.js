/*
 * The "logged in" user, kept in this browser (localStorage).
 *
 * There is no server login yet, so this only remembers a display name.
 * Later it can be replaced by a real account without changing the navbar:
 * everything the navbar needs is  initialsOf(name)  and  colorFor(name).
 */

export const USER_KEY = "vlsi-learn-user";

/*
 * "Ravi Kumar"          -> "RK"
 * "ravi kumar singh"    -> "RS"   (first and last word)
 * "Ravi"                -> "RA"   (a single word gives its first two letters)
 * "  anna-maria  lopez" -> "AL"
 */
export function initialsOf(name) {
  const words = String(name ?? "")
    .split(/\s+/)
    .map((word) => Array.from(word).filter((char) => /[\p{L}\p{N}]/u.test(char)))
    .filter((letters) => letters.length > 0);

  if (words.length === 0) {
    return "";
  }

  const letters =
    words.length === 1
      ? words[0].slice(0, 2)
      : [words[0][0], words[words.length - 1][0]];

  return letters.join("").toLocaleUpperCase();
}

/* Same name -> same colour, so the circle always looks the same for a person. */
const COLORS = [
  "#2563eb", "#7c3aed", "#db2777", "#dc2626",
  "#ea580c", "#16a34a", "#0d9488", "#0891b2"
];

export function colorFor(name) {
  let hash = 0;

  for (const char of String(name ?? "")) {
    hash = (hash * 31 + char.codePointAt(0)) >>> 0;
  }

  return COLORS[hash % COLORS.length];
}

export function cleanName(raw) {
  return String(raw ?? "").replace(/\s+/g, " ").trim().slice(0, 40);
}

export function loadUser() {
  try {
    const data = JSON.parse(window.localStorage.getItem(USER_KEY));
    const name = cleanName(data?.name);

    return name ? { name } : null;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  try {
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify({ name: user.name }));
    } else {
      window.localStorage.removeItem(USER_KEY);
    }
  } catch {
    // storage blocked (private mode): the name still works until the page closes
  }
}