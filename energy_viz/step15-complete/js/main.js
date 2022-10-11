let data;

function dataIsReady(csv) {
    data = csv;
    update();
}

function transformRow(d) {
    return {
        name: d.name,
        id: d.id,
        hydroelectric: parseFloat(d.hydroelectric),
        nuclear: parseFloat(d.nuclear),
        oilgascoal: parseFloat(d.oilgascoal),
        renewable: parseFloat(d.renewable)
    };
}

d3.csv('data/data.csv', transformRow)
    .then(dataIsReady);
