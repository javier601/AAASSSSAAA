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
  "Gestión del Cuidado en Enfermería": ["Anatomía General", "Educación en Enfermería", "Microbiología y Parasitología", "Química General y Orgánica", "Enfermería Basada en Evidencia"],
  "Enfermería en Salud Pública y Determinantes Sociales": [],
  "Fisiopatología": ["Fisiología General"],
  "Farmacología": ["Fisiología General", "Bioquímica"],
  "Gestión en Servicios de Salud": ["Enfermería en Salud Pública y Determinantes Sociales"],
  "Herramientas Informáticas para la Gestión en Salud": ["Enfermería en Salud Pública y Determinantes Sociales"],
  "Integrado de Ciclo Inicial": ["Educación en Enfermería", "Socioantropología e Interculturalidad para el Cuidado", "Fisiología General", "Bioquímica", "Enfermería en Salud Pública y Determinantes Sociales"],
  "Gestión del Cuidado de la Mujer": [],
  "Calidad en la Gestión del Cuidado": ["Gestión en Servicios de Salud"],
  "Gestión del Cuidado en Adulto y Adulto Mayor": ["Gestión del Cuidado en Enfermería", "Fisiopatología", "Farmacología", "Integrado de Ciclo Inicial"],
  "Gestión del Cuidado en Comunidades I": ["Gestión del Cuidado en Enfermería", "Fisiopatología", "Farmacología", "Integrado de Ciclo Inicial"],
  "Enfermería del Adulto Mayor": [],
  "Electivo de Ética": [],
  "Bioética": ["Electivo de Ética"],
  "Metodología de la Investigación": ["Bioestadística"],
  "Gestión del Cuidado en Salud Mental": [],
  "Cuidados Paliativos y Proceso de Morir": ["Enfermería del Adulto Mayor"],
  "Proyecto de la Investigación I": ["Metodología de la Investigación"],
  "Gestión del Cuidado en Urgencia": ["Gestión del Cuidado en Adulto y Adulto Mayor", "Gestión del Cuidado en Comunidades I"],
  "Gestión del Cuidado del Niño y Adolescente": ["Gestión del Cuidado en Adulto y Adulto Mayor", "Gestión del Cuidado en Comunidades I"],
  "Gestión del Cuidado en Comunidades II": ["Gestión del Cuidado en Comunidades I"],
  "Electivo de Desarrollo Personal": [],
  "Proyecto de la Investigación II": ["Proyecto de la Investigación I"],
  "Integrado de Ciclo Intermedio": Object.keys(ramos).filter(r => !["Práctica Profesional", "Práctica Profesional II", "Seminario de Integración de Enfermería"].includes(r)),
  "Electivo de Responsabilidad Social": [],
  "Práctica Profesional": Object.keys(ramos),
  "Práctica Profesional II": Object.keys(ramos),
  "Seminario de Integración de Enfermería": Object.keys(ramos),
};

const estadoRamos = {};

function puedeAprobar(ramo) {
  return ramos[ramo].every(pr => estadoRamos[pr]);
}

function crearMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  Object.keys(ramos).forEach(ramo => {
    const div = document.createElement("div");
    div.classList.add("ramo");

    if (!estadoRamos[ramo]) {
      div.classList.add("locked");
    } else if (estadoRamos[ramo] === "approved") {
      div.classList.remove("locked");
      div.classList.add("approved");
    }

    div.innerText = ramo;

    div.addEventListener("click", () => {
      if (estadoRamos[ramo] === "approved") {
        estadoRamos[ramo] = false;
      } else if (puedeAprobar(ramo)) {
        estadoRamos[ramo] = "approved";
      }
      crearMalla();
    });

    if (estadoRamos[ramo] !== "approved" && !puedeAprobar(ramo)) {
      div.classList.add("locked");
    }

    malla.appendChild(div);
  });
}

window.onload = () => {
  Object.keys(ramos).forEach(r => (estadoRamos[r] = false));
  crearMalla();
};
