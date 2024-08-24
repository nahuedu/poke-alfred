const https = require('https');
const fs = require('fs');
const input = JSON.parse(process.argv[2])

fetch(input.url)
    .then((response) => response.json())
    .then((pokemon) => {
        const imgUrl = pokemon.sprites.other["official-artwork"].front_default
        checkImg(imgUrl, pokemon.name)
        console.log(titleMd(pokemon.name, pokemon.id))
        console.log("---")
        console.log(`### Height: \`${pokemon.height*10} cm\``)
        console.log(`### Weight: \`${pokemon.weight*100} g\``)
        console.log(`### Types: ${buildTypes(pokemon.types)}`)
        console.log(getMdImg(pokemon.name))
    })

const buildTypes = (types) => {
    return types
        .map(type => type.type.name)
        .map(typeName => `\`${typeName}\``)
        .join(' ')
}

const titleMd = (name, id) => {
    return `## \`${name} #${id}\``
}

const getMdImg = (name) => {
    return `![${name}](${getImgPath(name)})`;
}

const getImgPath = (name) => {
    return `img/${name}.jpeg`;
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