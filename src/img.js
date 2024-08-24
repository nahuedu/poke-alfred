const https = require('https');
const fs = require('fs');
const pokemon = JSON.parse(process.argv[2])

fetch(pokemon.url)
    .then((response) => response.json())
    .then((response) => {
        const imgUrl = response.sprites.other["official-artwork"].front_default
        checkImg(imgUrl, pokemon.name)
        console.log(`# ${pokemon.name}`)
        console.log(getMdImg(pokemon.name))
    })

const getMdImg = (name) => {
    return `![${name}](${getImgPath(name)})`;
}

const getImgPath = (name) => {
    return `${name}.jpeg`;
}

const checkImg = (imgUrl, name) => {
    fs.access(getImgPath(name), fs.constants.F_OK, (err) => {
        if (err) {
            downloadImg(imgUrl, name)
        }
    });
}

const downloadImg = (url, name) => {
    const file = fs.createWriteStream(getImgPath(name));

    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
        });
    }).on('error', (err) => {
        fs.unlink(destination);
    });
}