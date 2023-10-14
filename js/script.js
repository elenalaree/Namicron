// Collect the names from the json file
const maleFirstNames = [];
const femaleFirstNames = [];
const lastNames = [];
const favoriteNames = JSON.parse(localStorage.getItem('names')) || [];
console.log(favoriteNames)


// Selected elements

let generateName = document.getElementById("generateName");
const checkedNames = document.getElementsByName('names');
const finalName = document.getElementById('finalName');
const saveName = document.getElementById("saveName");
const saved = document.getElementById('savedId');
buildFavorites()
// functions
function collectNames() {
    console.log(favoriteNames)
    // Collect male and female first names
    fetch('/namicron/json/firstNames.json')
        .then(response => response.json())
        .then(data => {
            const male = data.maleFirstNames;
            male.forEach(element => {
                maleFirstNames.push(element)
            });
            const female = data.femaleFirstNames;
            female.forEach(element => {
                femaleFirstNames.push(element)
            });

        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
    // Collect last names
    fetch('../json/lastNames.json')
        .then(response => response.json())
        .then(data => {
            let last = data.lastNames;
            last.forEach(element => {
                lastNames.push(element)
            });
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

function createName(name) {
    const first = getRandomName(name);
    return first;
}

function firstMiddle(name) {
    let fname = createName(name);
    let second = "";
    do {
        second = getRandomName(name);
    }
    while (fname == second);
    return fname + " " + second;
}

// build favorites
function buildFavorites(){
    saved.innerHTML = "";
    favoriteNames.forEach(element => {
        let li = document.createElement('li');
        li.innerHTML = element
        saved.appendChild(li);
    });
}

generateName.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let final = '';

    const gender = document.querySelector('input[name=gender]:checked')
    let genderType = "";
    if(gender == null){
        final = "Please pick a gender."
    } else {
        genderType = gender['id'];
    }
    ;
    
    const names = [];

    for (let i = 0; i < checkedNames.length; i++) {
        if (checkedNames[i].checked) {
            names.push(checkedNames[i].id);
        }

    }
    
    if (genderType == 'male') {
        // if only first name is checked, return 1 name
        if ((names.includes('firstName') || names.includes('middleName')) && (names.length == 1)) {
            final = createName(maleFirstNames);
        }
        // if first and middle are checked, return 2 names
        else if ((names.includes('firstName') && names.includes('middleName')) && (names.length == 2)) {
            final = firstMiddle(maleFirstNames);
        }
        else if ((names.includes('firstName') || names.includes('middleName')) && (names.includes('lastName')) && (names.length == 2)) {
            let first = createName(maleFirstNames);
            let last = createName(lastNames);

            final = first + " " + last;

        }
        else if ((names.includes('firstName') && names.includes('middleName')) && (names.includes('lastName'))) {
            let firstHalf = firstMiddle(maleFirstNames);
            let last = createName(lastNames);

            final = firstHalf + " " + last;

        }
        else {
            final = "Please select one of the three options."
        }
        if (genderType == 'male') {
            // if only first name is checked, return 1 name
            if ((names.includes('firstName') || names.includes('middleName')) && (names.length == 1)) {
                final = createName(maleFirstNames);
            }
            // if first and middle are checked, return 2 names
            else if ((names.includes('firstName') && names.includes('middleName')) && (names.length == 2)) {
                final = firstMiddle(maleFirstNames);
            }
            // if first or middle name and last are checked
            else if ((names.includes('firstName') || names.includes('middleName')) && (names.includes('lastName')) && (names.length == 2)) {
                let first = createName(maleFirstNames);
                let last = createName(lastNames);
                final = first + " " + last;
            }
            // if first, middle, and last are checked
            else if ((names.includes('firstName') && names.includes('middleName')) && (names.includes('lastName'))) {
                let firstHalf = firstMiddle(maleFirstNames);
                let last = createName(lastNames);
                final = firstHalf + " " + last;
            }
            else if ((names.includes('lastName')) && (names.length == 1)) {
                final = createName(lastNames);
            }
            else {
                final = "Please select one of the three options."
            }
            
        }
    } 
    else if (genderType == 'female') {
        // if only first name is checked, return 1 name
        if ((names.includes('firstName') || names.includes('middleName')) && (names.length == 1)) {
            final = createName(femaleFirstNames);
        }
        // if first and middle are checked, return 2 names
        else if ((names.includes('firstName') && names.includes('middleName')) && (names.length == 2)) {
            final = firstMiddle(femaleFirstNames);
        }
        // if first or middle name and last are checked
        else if ((names.includes('firstName') || names.includes('middleName')) && (names.includes('lastName')) && (names.length == 2)) {
            let first = createName(femaleFirstNames);
            let last = createName(lastNames);
            final = first + " " + last;
        }
        // if first, middle, and last are checked
        else if ((names.includes('firstName') && names.includes('middleName')) && (names.includes('lastName'))) {
            let firstHalf = firstMiddle(femaleFirstNames);
            let last = createName(lastNames);
            final = firstHalf + " " + last;
        }
        else if ((names.includes('lastName')) && (names.length == 1)) {
            final = createName(lastNames);
        }
        else {
            final = "Please select one of the three options."
        }
    }
    else {
        final = "Please select gender."
    }
    finalName.textContent = final
});
// event listener for saveName
saveName.addEventListener("click", (e)=> {
    e.preventDefault();
    let saveThis = finalName.textContent;
    favoriteNames.push(saveThis);
    buildFavorites(favoriteNames);
    
    localStorage.setItem("names",JSON.stringify(favoriteNames));
    console.log(favoriteNames);
})