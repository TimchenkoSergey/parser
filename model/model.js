const model = {
    save
};

export default model;

function save(table, options) {
    table.create(options);
}