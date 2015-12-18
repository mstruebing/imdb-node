export function parseID(link) {
  const regex = /tt[0-9]{7}$/;
  const regexLink = /tt[0-9]{7}\//;


  if (link.match(regexLink)) {
    const match = link.match(regexLink)[0];
    return match.substring(0, match.length - 1);
  } else if (link.match(regex)) {
    return link.match(regex)[0];
  } else {
    return null;
  }
}
