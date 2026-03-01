import NodeCache from "node-cache";

const studentCache = new NodeCache({ stdTTL: 3600, deleteOnExpire: true });

export default studentCache;
