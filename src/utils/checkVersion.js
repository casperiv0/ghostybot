function checkNodeVersion() {
    const v = process.version;
    
    if (v < 14) {
        throw Error("This bot requires version 14 of nodejs! Please upgrade to version 14");
    }
}

module.exports = checkNodeVersion;