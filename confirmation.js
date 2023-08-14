document.addEventListener("DOMContentLoaded", () => {
    const checkouttable = document.getElementById("confirmationTable");

    // Load summary table values from localStorage
    const SUMdate = localStorage.getItem("summaryDate");
    const SUMtime = localStorage.getItem("summaryTime");
    const SUMduration = localStorage.getItem("summaryDuration");
    const SUMtkts = localStorage.getItem("summaryTickets");
    const SUMtot = localStorage.getItem("summaryTotal");

    // Populate the confirmation table with summary data
    const tableRows = `
        <tr><td>Name</td><td>${localStorage.getItem("fullName") || "-"}</td></tr>
        <tr><td>Date</td><td>${SUMdate || "-"}</td></tr>
        <tr><td>Time</td><td>${SUMtime || "-"}</td></tr>
        <tr><td>Duration</td><td>${SUMduration || "-"}</td></tr>
        <tr><td>Mobile</td><td> ${localStorage.getItem("mobileNumber") || "-"}</td></tr>
        <tr><td>Email</td><td>${localStorage.getItem("email") || "-"}</td></tr>
        <tr><td>Gender</td><td>${localStorage.getItem("gender") || "-"}</td></tr>
        <tr><td>Tickets</td><td>${SUMtkts || "-"}</td></tr>
        <tr><td>Total Price </td><td>${SUMtot || "-"}</td></tr>
    `;

    checkouttable.innerHTML = tableRows;
});
