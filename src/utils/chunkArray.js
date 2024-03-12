export function chunkArray(array, itemsPerChunk) {
  return Array.from({ length: Math.ceil(array.length / itemsPerChunk) }, (_, i) => array.slice(i * itemsPerChunk, i * itemsPerChunk + itemsPerChunk));
}
