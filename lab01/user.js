const fs = require('fs');
const path = require('path');

const userPath = path.join(__dirname, 'user.json');

function readUserFile() {
    const data = fs.readFileSync(userPath);
    return JSON.parse(data);
}

function writeUserFile(data) {
    fs.writeFileSync(userPath, JSON.stringify(data, null, 2));
}

function addLanguage(title, level) {
    const user = readUserFile();
    const duplicateLanguage = user.languages.find(language => language.title === title);
    if (duplicateLanguage) {
        console.log('Language already exists!');
        return;
    }
    user.languages.push({ title, level });
    writeUserFile(user);
    console.log('Language added successfully!');
}

function removeLanguage(title) {
    const user = readUserFile();
    const languages = user.languages.filter(language => language.title !== title);
    if (languages.length === user.languages.length) {
        console.log('Language not found!');
        return;
    }
    user.languages = languages;
    writeUserFile(user);
    console.log('Language removed successfully!');
}

function listLanguages() {
    const user = readUserFile();
    console.log('Languages:');
    user.languages.forEach(language => {
        console.log(`- ${language.title} (${language.level})`);
    });
}

function readLanguage(title) {
    const user = readUserFile();
    const language = user.languages.find(language => language.title === title);
    if (!language) {
        console.log('Language not found!');
        return;
    }
    console.log(`Title: ${language.title}, Level: ${language.level}`);
}

module.exports = {
    addLanguage,
    removeLanguage,
    listLanguages,
    readLanguage
};
