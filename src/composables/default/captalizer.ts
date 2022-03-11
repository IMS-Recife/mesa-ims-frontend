export function capitalize(str: any) {
  return str
    .split(" ")
    .map(
      (word: any) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
    )
    .join(" ");
}
