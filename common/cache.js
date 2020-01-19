import { writeFileSync, readFileSync } from "fs";

let cache = (load, save) => name => {
    let obj;

    try {
        obj = load(name);
    } catch (error) {
        obj = {};
    }

    obj.save = () => save(name, obj);

    return obj;
};

let fileCache = cache(
    name => readFileSync(name, "json"),
    (name, obj) => writeFileSync(name, obj, "json")
);

export default cache;
export { fileCache };
