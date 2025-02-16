document.getElementById("dataForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe
  
    // Obtener los valores del formulario
    const supervisor = document.getElementById("supervisor").value;
    const asesor = document.getElementById("asesor").value;
    const curp = document.getElementById("curp").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const lugarNacimiento = document.getElementById("lugarNacimiento").value;
    const dn1 = document.getElementById("dn1").value;
    const dn2 = document.getElementById("dn2").value;
    const nip = document.getElementById("nip").value;
    const fechaVigencia = document.getElementById("fechaVigencia").value;
    const equipo = document.getElementById("equipo").value;
    const cuotas = document.getElementById("cuotas").value;
    const colores = document.getElementById("colores").value;
    const fechaPago = document.getElementById("fechaPago").value;
    const horaSucursal = document.getElementById("horaSucursal").value;
    const correo = document.getElementById("correo").value;
    const cac = document.getElementById("cac").value;
  
    // Validar que los campos obligatorios no estén vacíos
    if (
      supervisor &&
      asesor &&
      curp &&
      fechaNacimiento &&
      lugarNacimiento &&
      dn1 &&
      nip &&
      fechaVigencia &&
      equipo &&
      cuotas &&
      colores &&
      fechaPago &&
      horaSucursal &&
      correo &&
      cac
    ) {
      // Crear una nueva fila en la tabla
      const tableBody = document.querySelector("#dataTable tbody");
      const newRow = document.createElement("tr");
  
      // Agregar celdas con los datos
      newRow.innerHTML = `
        <td>${supervisor}</td>
        <td>${asesor}</td>
        <td>${curp}</td>
        <td>${fechaNacimiento}</td>
        <td>${lugarNacimiento}</td>
        <td>${dn1}</td>
        <td>${dn2 || "N/A"}</td>
        <td>${nip}</td>
        <td>${fechaVigencia}</td>
        <td>${equipo}</td>
        <td>${cuotas}</td>
        <td>${colores}</td>
        <td>${fechaPago}</td>
        <td>${horaSucursal}</td>
        <td>${correo}</td>
        <td>${cac}</td>
        <td class="actions">
          <button onclick="editRow(this)">Editar</button>
          <button onclick="deleteRow(this)">Eliminar</button>
        </td>
      `;
  
      // Agregar la fila a la tabla
      tableBody.appendChild(newRow);
  
      // Limpiar el formulario
      document.getElementById("dataForm").reset();
    } else {
      alert("Por favor, completa todos los campos obligatorios.");
    }
  });
  
  // Función para eliminar una fila
  function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
  }
  
  // Función para editar una fila
  function editRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");
  
    // Obtener los datos de la fila
    const supervisor = cells[0].textContent;
    const asesor = cells[1].textContent;
    const curp = cells[2].textContent;
    const fechaNacimiento = cells[3].textContent;
    const lugarNacimiento = cells[4].textContent;
    const dn1 = cells[5].textContent;
    const dn2 = cells[6].textContent;
    const nip = cells[7].textContent;
    const fechaVigencia = cells[8].textContent;
    const equipo = cells[9].textContent;
    const cuotas = cells[10].textContent;
    const colores = cells[11].textContent;
    const fechaPago = cells[12].textContent;
    const horaSucursal = cells[13].textContent;
    const correo = cells[14].textContent;
    const cac = cells[15].textContent;
  
    // Llenar el formulario con los datos
    document.getElementById("supervisor").value = supervisor;
    document.getElementById("asesor").value = asesor;
    document.getElementById("curp").value = curp;
    document.getElementById("fechaNacimiento").value = fechaNacimiento;
    document.getElementById("lugarNacimiento").value = lugarNacimiento;
    document.getElementById("dn1").value = dn1;
    document.getElementById("dn2").value = dn2 === "N/A" ? "" : dn2;
    document.getElementById("nip").value = nip;
    document.getElementById("fechaVigencia").value = fechaVigencia;
    document.getElementById("equipo").value = equipo;
    document.getElementById("cuotas").value = cuotas;
    document.getElementById("colores").value = colores;
    document.getElementById("fechaPago").value = fechaPago;
    document.getElementById("horaSucursal").value = horaSucursal;
    document.getElementById("correo").value = correo;
    document.getElementById("cac").value = cac;
  
    // Eliminar la fila de la tabla
    row.remove();
  }

  function processData() {
    // Obtener el texto del textarea
    const dataInput = document.getElementById("dataInput").value;
  
    // Procesar el texto (ejemplo: "Supervisor: Elio Graterol Asesor: Moises Lopez CURP: ABC123456DEF789GHI ...")
    const data = {};
    const regex = /(\w+(?:\s+\w+)*):\s*([^:]+)(?=\s+\w+:|\s*$)/g; // Expresión regular para capturar pares clave-valor
    let match;
  
    while ((match = regex.exec(dataInput)) !== null) {
      const key = match[1].toLowerCase().replace(/ /g, ""); // Convertir clave a minúsculas y eliminar espacios
      const value = match[2].trim(); // Eliminar espacios alrededor del valor
      data[key] = value;
    }
  
    // Llenar los campos del formulario
    const fields = [
      { id: "supervisor", type: "text" },
      { id: "asesor", type: "text" },
      { id: "curp", type: "text" },
      { id: "fechaNacimiento", type: "date" }, // Campo de tipo date
      { id: "lugarNacimiento", type: "text" },
      { id: "dn1", type: "text" },
      { id: "dn2", type: "text" },
      { id: "nip", type: "text" },
      { id: "fechaVigencia", type: "date" }, // Campo de tipo date
      { id: "equipo", type: "text" },
      { id: "cuotas", type: "text" },
      { id: "colores", type: "text" },
      { id: "fechaPago", type: "date" }, // Campo de tipo date
      { id: "horaSucursal", type: "time" }, // Campo de tipo time
      { id: "correo", type: "email" },
      { id: "cac", type: "text" },
    ];
  
    fields.forEach((field) => {
    const inputElement = document.getElementById(field.id);
    if (inputElement && data[field.id]) {
      // Asignar el valor al campo
      if (field.type === "date") {
        // Asegurar que el valor de fecha esté en formato YYYY-MM-DD
        const dateValue = new Date(data[field.id]).toISOString().split("T")[0];
        inputElement.value = dateValue;
      } else {
        inputElement.value = data[field.id];
      }
    }
  });
  
    console.log("Datos procesados:", data); // Para depuración
  }