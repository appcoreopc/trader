let id = 0;
const idFactory = (tag : string) => `${tag}-${id++}`;
export default idFactory;
