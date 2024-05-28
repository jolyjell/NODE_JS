// Підключення модуля lodash
const _ = require('lodash');

// 1. _.chunk - розбиває масив на менші масиви заданого розміру
const array = ['a', 'b', 'c', 'd'];
const chunkedArray = _.chunk(array, 2);
console.log('_.chunk:', chunkedArray);

// 2. _.random - генерує випадкове число в заданому діапазоні
const randomNum = _.random(1, 100);
console.log('_.random:', randomNum);

// 3. _.capitalize - перетворює першу букву рядка в велику
const string = 'hello world';
const capitalizedString = _.capitalize(string);
console.log('_.capitalize:', capitalizedString);

// 4. _.merge - глибоке злиття двох об'єктів
const object1 = { 'a': 1, 'b': { 'c': 2 } };
const object2 = { 'b': { 'd': 3 }, 'e': 4 };
const mergedObject = _.merge(object1, object2);
console.log('_.merge:', mergedObject);

// 5. _.uniq - створює новий масив з унікальними значеннями
const arrayWithDuplicates = [1, 2, 1, 4, 1, 3];
const uniqueArray = _.uniq(arrayWithDuplicates);
console.log('_.unique:', uniqueArray);
