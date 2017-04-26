const model = {
    save
};

export default model;

async function save(table, options) {
    table.create(options);
}