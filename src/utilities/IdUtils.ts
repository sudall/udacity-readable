import * as uuidv4 from "uuid/v4";

class IdUtils {
    static getUniqueId(): string {
        return uuidv4();
    }
}

export default IdUtils;