function showErrors(errors) {
    return new Promise((resolve, reject) => {
        let mapaErrores = new Map();

        errors.map(error => {
            let msgArray = [];

            if (mapaErrores.has(error['param'])) {
                msgArray.push(mapaErrores.get(error['param']));
                msgArray.push(error['msg']);
                mapaErrores.set(error['param'], msgArray);
            } else {
                mapaErrores.set(error['param'], error['msg']);
            }
        });
        resolve([...mapaErrores]);
    });

}

module.exports = showErrors;