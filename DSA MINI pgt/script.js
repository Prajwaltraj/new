// Initialize the Priority Queue from Local Storage or as an Empty Array
let priorityQueue = JSON.parse(localStorage.getItem("priorityQueue")) || [];

// Function to Add a Patient
document.getElementById("patientForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload

  // Get input values
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const severity = parseInt(document.getElementById("severity").value);

  // Validate inputs
  if (!name || isNaN(age) || age <= 0) {
    alert("Please provide valid details for the patient.");
    return;
  }

  // Add the patient to the queue
  priorityQueue.push({ name, age, severity });

  // Sort the queue by severity (1 = Critical, 2 = Serious, 3 = Minor)
  priorityQueue.sort((a, b) => a.severity - b.severity);

  // Save the queue to local storage and update the display
  saveQueue();
  updateQueue();

  // Clear the form inputs
  document.getElementById("patientForm").reset();
});
function updateQueue() {
    const queueList = document.getElementById("queueList");
    queueList.innerHTML = ""; // Clear the current list
  
    if (priorityQueue.length === 0) {
      queueList.innerHTML = "<li>No patients in the queue.</li>";
      return;
    }
  
        // Render each patient dynamically
        priorityQueue.forEach((patient, index) => {
          const patientCard = document.createElement("div");
          patientCard.classList.add("patient-card", getSeverityClass(patient.severity));
      
          patientCard.innerHTML = `
            <p><strong>Name:</strong> ${patient.name}</p>
            <p><strong>Age:</strong> ${patient.age}</p>
            <p><strong>Severity:</strong> ${getSeverityText(patient.severity)}</p>
          `;
      
          // Append patient card to the list
          queueList.appendChild(patientCard);
        });
      }


// Function to Treat the First Patient in the Queue
document.getElementById("treatPatientBtn").addEventListener("click", () => {
  if (priorityQueue.length === 0) {
    alert("No patients to treat.");
    return;
  }

  // Remove the first patient in the queue
  const treatedPatient = priorityQueue.shift();

  // Show an alert with treated patient details
  alert(
    `Treating patient:\nName: ${treatedPatient.name}\nAge: ${treatedPatient.age}\nSeverity: ${getSeverityText(treatedPatient.severity)}`
  );

  // Save the updated queue and refresh the display
  saveQueue();
  updateQueue();
});

// Function to Save the Queue to Local Storage
function saveQueue() {
  localStorage.setItem("priorityQueue", JSON.stringify(priorityQueue));
}

// Helper Function to Get Severity Text
function getSeverityText(severity) {
    switch (severity) {
      case 1:
        return "Critical";
      case 2:
        return "Serious";
      case 3:
        return "Minor";
      default:
        return "Unknown";
    }
  }

// Helper Function to Assign a Class Based on Severity
function getSeverityClass(severity) {
    switch (severity) {
      case 1:
        return "critical";
      case 2:
        return "serious";
      case 3:
        return "minor";
      default:
        return "";
    }
  }

// Initial Render of the Queue
updateQueue();