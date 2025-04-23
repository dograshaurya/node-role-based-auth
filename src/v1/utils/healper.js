export async function filterFields(obj, fields) {
    return new Promise((resolve) => {
        const filteredData = Object.keys(obj)
            .filter(key => fields.includes(key))
            .reduce((acc, key) => {
                acc[key] = obj[key];
                return acc;
            }, {});

        resolve(filteredData);
    });
}
