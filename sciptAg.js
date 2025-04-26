let fullName = document.getElementById("fullName");
let age = document.getElementById("age");
let result = document.getElementById("result");

let btn = document.querySelector(".btn");
let editBtn = document.querySelector(".editBtn");

let list = document.getElementById("list");

document.forms[0].addEventListener("submit", function (even) {
    even.preventDefault();
});

let students = [
    // { fullName: "Graham Lopez", Age: "41", result: "9" },
    // { fullName: "Jolie Tyler", Age: "61", result: "3" },
    // { fullName: "Cooper Fox", Age: "23", result: "3" },
    // { fullName: "Holmes Carney", Age: "93", result: "15" },
    // { fullName: "Regina Kennedy", Age: "34", result: "16" },
];

let studentsClone = [];

// btn.addEventListener("click", studentsList);
function studentsList() {
    let name = fullName.value;
    let ageS = age.value;
    let res = result.value;

    if (
        name.trim() != "" &&
        ageS.trim() != "" &&
        res.trim() != "" &&
        res <= 20 &&
        res >= 0
    ) {
        students.push({ fullName: name, Age: ageS, result: res });
        studentsClone = [...students];
        docStudent(students);
        clearInputs();
    } else {
        alert("Write some times");
    }

    // console.log(students);
}

function clearInputs() {
    fullName.value = "";
    age.value = "";
    result.value = "";
}

function docStudent(student) {
    list.innerHTML = "";

    for (let i = 0; i < student.length; i++) {
        let studentInfo = document.createElement("tr");
        studentInfo.setAttribute("class", "studRow");
        studentInfo.innerHTML = `
                <td>${student[i].fullName}</td>
                <td>${student[i].Age}</td>
                <td class ="note">${student[i].result}</td>
                <td class ="seccess">${isSucces(student[i].result)}</td>
                <td class ="delete"><i class="fa-solid fa-trash"></i></td>
                <td class ="update" onclick ="getStud(${i})"><i class="fa-solid fa-pen-to-square"></i></td>
                `;

        if (isSucces(student[i].result) == "moyen") {
            studentInfo.querySelector(".seccess").style.backgroundColor =
                "#6BBF59";
        } else if (isSucces(student[i].result) == "bien") {
            studentInfo.querySelector(".seccess").style.backgroundColor =
                "#21D375";
        } else if (isSucces(student[i].result) == "tres bien") {
            studentInfo.querySelector(".seccess").style.backgroundColor =
                "#0B6E4F";
        } else if (isSucces(student[i].result) == "exelent") {
            studentInfo.querySelector(".seccess").style.backgroundColor =
                "#073B3A";
        } else {
            studentInfo.querySelector(".seccess").style.backgroundColor = "red";
        }
        list.appendChild(studentInfo);
        // break;
    }
}

function isSucces(n) {
    let status = "";

    if (n >= 10 && n <= 20) {
        // console.log("success!");
        if (n >= 10 && n <= 12) {
            // document.querySelector(".seccess").style.backgroundColor =
            //     "#6BBF59";
            return (status = "moyen");
        } else if (n > 12 && n <= 14) {
            return (status = "bien");
        } else if (n > 14 && n <= 17) {
            return (status = "tres bien");
        } else {
            return (status = "exelent");
        }
    } else if (n >= 0 && n < 10) {
        return (status = "feild");
    } else {
        return "you have to double check this note";
    }
}

list.addEventListener("click", function (e) {
    let target = e.target;
    if (target.classList.contains("delete")) {
        students.forEach((ele, i) => {
            let nameStud = target.parentElement.children[0].innerText;
            let ageStud = target.parentElement.children[1].innerText;
            let noteStud = target.parentElement.children[2].innerText;
            if (
                ele.fullName == nameStud &&
                ele.Age == ageStud &&
                ele.result == noteStud
            ) {
                students.splice(i, 1);
                // console.log(students.splice(i, 1));
                // console.log(students);
            }
        });
        target.parentElement.remove();
    }
});

// editBtn.addEventListener("click");
// update
function getStud(index) {
    document.getElementById("fullName").value = students[index].fullName;
    age.value = students[index].Age;
    result.value = students[index].result;
    // btn.innerText = "EDITE";
    console.log(age.value);

    btn.style.display = "none";
    editBtn.style.display = "block";

    editBtn.onclick = function update() {
        console.log(index);
        students[index].fullName = document.getElementById("fullName").value;
        students[index].Age = document.getElementById("age").value;
        students[index].result = document.getElementById("result").value;
        console.log(students);

        docStudent(students);
        clearInputs();
        // btn.innerText = "Save";
        editBtn.style.display = "none";
        btn.style.display = "block";
    };
}

document.getElementById("noteSort").addEventListener("click", (e) => {
    // students.sort((a, b) => {
    //     return b.result - a.result;
    // });
    // docStudent(students);
    // console.log(typeof parseInt(students[0].result));

    for (let i = 0; i < students.length; i++) {
        // console.log(studentsClone);
        for (let j = 0; j < students.length - 1; j++) {
            // if (students[j].result < students[j + 1].result) {
            //     [students[j], students[j + 1]] = [students[j + 1], students[j]];
            // }
            if (
                parseInt(students[j].result) < parseInt(students[j + 1].result)
            ) {
                [students[j], students[j + 1]] = [students[j + 1], students[j]];
            }
        }
    }
    docStudent(students);
});
