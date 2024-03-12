export function extractId(gid) {
  const id = gid.split('/').pop();
  return id;
}
