// Collect the names from the json file
var maleFirstNames = [];
var femaleFirstNames = [];
var lastNames = []
function collectNames(){
    fetch('../json/firstNames.json')
    .then(response => response.json())
    .then(data => {
        let maleFirstNames = data.maleFirstNames;
        let femaleFirstNames = data.femaleFirstNames;
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
    fetch('../json/lastNames.json')
    .then(response => response.json())
    .then(data => {
        
        let lastNames = data.lastNames;
        console.log(lastNames);
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
}
collectNames();
function getRandomName(name){
    const rand = Math.floor(Math.random() * name.length);
    const randomName = name[rand];
    return randomName
}

function createName(name1, name2){
    const first = getRandomName(name1);
    console.log(first)
    do{
        var second = getRandomName(name2);
        console.log(second)
    }
    while(first == second)
    console.log(first,second);
}

function addToStorage(){
    
}

createName(firstNames, firstNames)

