
window.onload = function() {
    document.getElementById("popup").style.display = "block";
};


document.getElementById("close-popup").onclick = function() {
    document.getElementById("popup").style.display = "none";
};

window.onclick = function(event) {
    if (event.target == document.getElementById("popup")) {
        document.getElementById("popup").style.display = "none";
    }
};

 function cambiarColor() {
    var color = document.getElementById("colorPicker").value;
    document.getElementById("pagar").style.backgroundColor = color;
}

let fieldCounter = 6; // Inicia en 7

function handleFieldSelection() {
    const selectedValue = document.getElementById('fieldSelector').value;
    addNewRow(selectedValue);
}

function addNewRow(numFields) {
    const newRow = document.createElement('div');
    newRow.classList.add('row', 'g-3');

    for (let i = 0; i < numFields; i++) {
        fieldCounter++; // Incrementa antes de usarlo para asegurar que el ID es superior a 7

        if (fieldCounter > 6) { 
            const newFieldDiv = document.createElement('div');
            newFieldDiv.classList.add('col-md-4'); // Ajusta el ancho de las columnas según necesites
            newFieldDiv.innerHTML = `
                <div class="editable-label">
                    <label for="field${fieldCounter}" class="form-label">Campo Nuevo</label>
                    <button type="button" class="edit-btn bi bi-pencil" onclick="editLabel('field${fieldCounter}')"></button>
                    <button type="button" class="delete-btn bi bi-trash" onclick="deleteField('field${fieldCounter}', this)"></button>
                </div>
                <input type="text" class="w-full border-gray-300 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus-within:s-ring focus:border-primary-300 rounded-lg" id="field${fieldCounter}">
            `;
            newRow.appendChild(newFieldDiv);
        }
    }

    document.getElementById('formFields').appendChild(newRow);
}

function editLabel(id) {
    const label = document.querySelector(`label[for="${id}"]`);
    const currentText = label.innerText;
    const newText = prompt("Edita el texto del campo:", currentText);
    if (newText !== null && newText.trim() !== "") {
        label.innerText = newText;
    }
}

function deleteField(id) {
    const fieldToRemove = document.getElementById(id).parentNode;
    fieldToRemove.parentNode.removeChild(fieldToRemove);
}
