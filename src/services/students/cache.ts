import NodeCache from "node-cache";

const studentCache = new NodeCache({ stdTTL: 10, deleteOnExpire: true });

export default studentCache;
