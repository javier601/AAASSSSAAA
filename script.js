const ramos = {
  "Biología Celular e Histología": [],
  "Anatomía General": [],
  "Matemáticas": [],
  "Fundamentos de Enfermería": [],
  "Educación en Enfermería": [],
  "Electivo de Comunicación": [],
  "Microbiología y Parasitología": ["Biología Celular e Histología"],
  "Química General y Orgánica": [],
  "Bioestadística": ["Matemáticas"],
  "Socioantropología e Interculturalidad para el Cuidado": [],
  "Enfermería Basada en Evidencia": [],
  "Electivo de Desarrollo del Pensamiento": [],
  "Fisiología General": ["Anatomía General", "Microbiología y Parasitología"],
  "Psicología General y del Desarrollo": [],
  "Bioquímica": ["Química General y Orgánica"],
  "Gestión del Cuidado en Enfermería": [
    "Anatomía General",
    "Educación en Enfermería",
    "Microbiología y Parasitología",
    "Química General y Orgánica",
    "Enfermería Basada en Evidencia"
  ],
  "Enfermería en Salud Pública y Determinantes Sociales": [],
  "Fisiopatología": ["Fisiología General"],
  "Farmacología": ["Fisiología General", "Bioquímica"],
  "Gestión en Servicios de Salud": ["Enfermería en Salud Pública y Determinantes Sociales"],
  "Herramientas Informáticas para la Gestión en Salud": ["Enfermería en Salud Pública y Determinantes Sociales"],
  "Integrado de Ciclo Inicial": [
    "Educación en Enfermería",
    "Socioantropología e Interculturalidad para el Cuidado",
    "Fisiología General",
    "Bioquímica",
    "Enfermería en Salud Pública y Determinantes Sociales"
  ],
  "Gestión del Cuidado de la Mujer": [],
  "Calidad en la Gestión del Cuidado": ["Gestión en Servicios de Salud"],
  "Gestión del Cuidado en Adulto y Adulto Mayor": [
    "Gestión del Cuidado en Enfermería",
    "Fisiopatología",
    "Farmacología",
    "Integrado de Ciclo Inicial"
  ],
  "Gestión del Cuidado en Comunidades I": [
    "Gestión del Cuidado en Enfermería",
    "Fisiopatología",
    "Farmacología",
    "Integrado de Ciclo Inicial"
  ],
  "Enfermería del Adulto Mayor": [],
  "Electivo de Ética": [],
  "Bioética": ["Electivo de Ética"],
  "Metodología de la Investigación": [
    "Bioestadística",
    "Enfermería Basada en Evidencia",
    "Herramientas Informáticas para la Gestión en Salud"
  ],
  "Gestión del Cuidado en Salud Mental": [],
  "Cuidados Paliativos y Proceso de Morir": ["Enfermería del Adulto Mayor"],
  "Proyecto de la Investigación I": ["Metodología de la Investigación"],
  "Gestión del Cuidado en Urgencia": [
    "Gestión del Cuidado en Adulto y Adulto Mayor",
    "Gestión del Cuidado en Comunidades I"
  ],
  "Gestión del Cuidado del Niño y Adolescente": [
    "Gestión del Cuidado en Adulto y Adulto Mayor",
    "Gestión del Cuidado en Comunidades I"
  ],
  "Gestión del Cuidado en Comunidades II": ["Gestión del Cuidado en Comunidades I"],
  "Electivo de Desarrollo Personal": [],
  "Proyecto de la Investigación II": ["Proyecto de la Investigación I"],
  "Electivo de Responsabilidad Social": [],
  "Práctica Profesional I": ["Proyecto de la Investigación II"],
  "Práctica Profesional II": ["Proyecto de la Investigación II"],
  "Seminario de Integración de Enfermería": ["Proyecto de la Investigación II"]
};

const estadoRamos = {};
const contenedor = document.getElementById("malla");

function inicializar() {
  Object.keys(ramos).forEach((ramo) => {
    estadoRamos[ramo] = ramos[ramo].length ? "bloqueado" : "disponible";
    const div = document.createElement("div");
    div.classList.add("ramo");
    if (estadoRamos[ramo] === "bloqueado") div.classList.add("bloqueado");
    div.textContent = ramo;
    div.dataset.nombre = ramo;
    div.addEventListener("click", aprobarRamo);
    contenedor.appendChild(div);
  });
}

function aprobarRamo(event) {
  const nombre = event.currentTarget.dataset.nombre;
  if (estadoRamos[nombre] !== "disponible") return;

  estadoRamos[nombre] = "aprobado";
  event.currentTarget.classList.remove("bloqueado");
  event.currentTarget.classList.add("aprobado");

  desbloquearRamos();
}

function desbloquearRamos() {
  Object.entries(ramos).forEach(([ramo, prereqs]) => {
    if (estadoRamos[ramo] === "bloqueado") {
      const todosAprobados = prereqs.every((pr) => estadoRamos[pr] === "aprobado");
      if (todosAprobados) {
        estadoRamos[ramo] = "disponible";
        const div = [...document.querySelectorAll(".ramo")].find(d => d.dataset.nombre === ramo);
        div.classList.remove("bloqueado");
      }
    }
  });
}

inicializar();
