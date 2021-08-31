export function copyObj(obj) {
  return obj && JSON.parse(JSON.stringify(obj))
}

