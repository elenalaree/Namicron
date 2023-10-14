// Collect the names from the json file
const maleFirstNames = [];
const femaleFirstNames = [];
const lastNames = []
function collectNames() {
    fetch('../json/firstNames.json')
        .then(response => response.json())
        .then(data => {
            const male = data.maleFirstNames;
            const female = data.femaleFirstNames;
            male.forEach(element => {
                maleFirstNames.push(element)

            });

        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
    fetch('../json/lastNames.json')
        .then(response => response.json())
        .then(data => {

            let lastNames = data.lastNames;
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

collectNames();

function getRandomName(name) {
    const rand = Math.floor(Math.random() * name.length);
    const randomName = name[rand];
    return randomName
}

function createName(name1) {
    const first = getRandomName(name1);
    return first;


}


let saveName = document.getElementById("saveName");
saveName.addEventListener("submit", (e) => {
    e.preventDefault();

    const gender = document.querySelector('input[name=gender]:checked')
    const genderType = gender['id']
    console.log(genderType)
    const names = [];
    const checkedNames = document.getElementsByName('names');
    for (let i = 0; i < checkedNames.length; i++) {
        if (checkedNames[i].checked) {
            names.push(checkedNames[i].id);
        }

    }
    let final = '';
    console.log(names)
    if (genderType == 'male') {
        if ((names.includes('firstName') || names.includes('middleName')) && (names.length == 1)) {
            let first = createName(maleFirstNames);
            final = first
            

        }
        else if ((names.includes('firstName') && names.includes('middleName')) && (names.length == 2)) {
            let first = createName(maleFirstNames);
            console.log(first)
            do {
                var second = getRandomName(maleFirstNames);
                
            }
            while (first == second);
            final = first + " " + second;
        }
        else {
            console.log("Nope.")
        }
    console.log(final);
    }
})