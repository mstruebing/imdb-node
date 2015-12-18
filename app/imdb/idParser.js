export function parseID(link) {
  console.log(link);
  const regex = /tt[0-9]{7}/
  return link.match(regex) ? link.match(regex)[0] : null;
}
