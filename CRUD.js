/* Variables */

let addButton = document.querySelector('.add');
let table = document.querySelector('table.employeeStock');
let form = document.querySelector('form.form');
let id = document.querySelector('[name=id]');
let fname = document.querySelector('[name=fname]');
let lname = document.querySelector('[name=lname]');
let department = document.querySelector('[name=department]');
let phone = document.querySelector('[name=phone]');
let save = document.querySelector('.save')

let q = 0;
let idNumber = 0;
let arrOfEmployee = [];
// getlocStorage()

if (localStorage.getItem('employee')) {
    localStorage.getItem('employee')
    arrOfEmployee = JSON.parse(localStorage.getItem('employee'))

    addToTable('table.employeeStock', arrOfEmployee)
}
addButton.addEventListener('click', () => {
    if (!(fname.value === '' || lname.value === '' || department.value === '' || phone.value === '')) {
        let arr = [fname.value, lname.value, department.value, phone.value];
        q = arrOfEmployee.length
        addToArray(arr)
        console.log(arrOfEmployee)
        id.value = fname.value = lname.value = department.value = phone.value = '';
    }
})

function addToArray(arr) {
    let Emp = {
        array: arr,
        id: Date.now()
    };
    arrOfEmployee.push(Emp);
    addToTable('table.employeeStock', arrOfEmployee)
    locStorage(arrOfEmployee)
}

function addToTable(tableclass, arr) { // table.employeeStock

    for (let i = q; i < arr.length; i++) {
        idNumber++;
        let table = document.querySelector(tableclass)
        let tr = table.insertRow(-1);
        let td = tr.insertCell(-1);
        td.textContent = idNumber
        for (let j = 0; j < arr[i].array.length; j++) {

            let td = tr.insertCell(-1);
            td.textContent = arr[i].array[j]
        }
        let td2 = tr.insertCell(-1);
        let iconEdit = document.createElement('i');
        iconEdit.setAttribute('class', 'fas fa-edit edit text-primary')
        iconEdit.setAttribute('data-id', arr[i].id)
        let iconDelete = document.createElement('i');
        iconDelete.setAttribute('class', 'las la-trash delete text-danger')
        iconDelete.setAttribute('data-id', arr[i].id)
        td2.append(iconEdit, iconDelete)
    }
}

table.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        deleted(e.target.getAttribute('data-id'))
        e.target.parentElement.parentElement.remove();
    } else if (e.target.classList.contains('edit')) {
        edit(e.target, e.target.getAttribute('data-id'))
    }
})

function edit(td, empId) {
    selectedRow = td.parentElement.parentElement

    save.classList.add('show')
    addButton.disabled = true;

    id.value = selectedRow.cells[0].textContent
    fname.value = selectedRow.cells[1].textContent
    lname.value = selectedRow.cells[2].textContent
    department.value = selectedRow.cells[3].textContent
    phone.value = selectedRow.cells[4].textContent

    update(td, empId)
}

function update(td, empId) {
    selectedRow = td.parentElement.parentElement
    save.addEventListener('click', () => {

        if (!(fname.value === '' || lname.value === '' || department.value === '' || phone.value === '')) {

            addButton.disabled = false;
            save.classList.remove('show')

            selectedRow.cells[1].textContent = fname.value
            selectedRow.cells[2].textContent = lname.value
            selectedRow.cells[3].textContent = department.value
            selectedRow.cells[4].textContent = phone.value
            arr = [fname.value, lname.value, department.value, phone.value];
            for (let i = 0; i < arrOfEmployee.length; i++) {
                if (arrOfEmployee[i].id == empId) {
                    arrOfEmployee[i].array = arr
                    locStorage(arrOfEmployee)
                }
            }
            id.value = fname.value = lname.value = department.value = phone.value = '';
        }
    })
}

function deleted(empId) {
    if (confirm('Are sure?')) {
        arrOfEmployee = arrOfEmployee.filter(emp => emp.id != empId)
        locStorage(arrOfEmployee)
    }
}

function locStorage(arr) {
    localStorage.setItem('employee', JSON.stringify(arr))
}

function getlocStorage() {
    let data = localStorage.getItem('employee');
    // if (data) {

    //     addToTable('table.employeeStock', JSON.parse(data))
    // }
}