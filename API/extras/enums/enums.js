getTurnos = () => {
    return [
        " MAÑANA",
        " TARDE",
        " NOCHE"
    ];
}

getModalidad = () => {
    return [
        " PRIMARIO",
        " SECUNDARIO"
    ]
}

getAniosCursada = () => {
    return [
        " 1_A",
        " 1_B",
        " 2_A",
        " 2_B",
        " 3_A",
        " 3_B",
        " 4_A",
        " 4_B",
        " 5_A",
        " 5_B",
        " 6_A",
        " 6_B"
    ]
}

module.exports = { getTurnos, getModalidad, getAniosCursada };