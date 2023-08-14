document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("payment-form");
    const PAYbtn = document.getElementById("payButton");
    const payAmount = document.getElementById("payAmount");

    // Load summary table values from localStorage
    const SUMdate = localStorage.getItem("summaryDate");
    const SUMtime = localStorage.getItem("summaryTime");
    const SUMduraion = localStorage.getItem("summaryDuration");
    const SUMtkts = localStorage.getItem("summaryTickets");
    const SUMtot = localStorage.getItem("summaryTotal");

    // Populate the summary table on the Payment page
    const SUMtable = document.querySelector(".summary-section");
    SUMtable.innerHTML = `
        <h2>Summary</h2>
        <table>
            <tr>
                <td>Date</td>
                <td>${SUMdate || "-"}</td>
            </tr>
            <tr>
                <td>Time</td>
                <td>${SUMtime || "-"}</td>
            </tr>
            <tr>
                <td>Duration</td>
                <td>${SUMduraion || "-"}</td>
            </tr>
            <tr>
                <td>Tickets</td>
                <td>${SUMtkts || "-"}</td>
            </tr>
            <tr>
                <td>Total Payable</td>
                <td>${SUMtot || "-"}</td>
            </tr>
        </table>
    `;

    // Display the total amount to pay on the Pay button
    const totalPayable = SUMtot ? parseFloat(SUMtot.slice(1)) : 0;
    payAmount.textContent = `$${totalPayable.toFixed(2)}`;

    // Apply card number masking
    const cardNUMinput = document.getElementById("cardNumber");
    $(cardNUMinput).inputmask("9999-9999-9999-9999");

    // Apply expiry date masking
    const expDATEinput = document.getElementById("expiryDate");
    $(expDATEinput).inputmask("99/99");

    // Apply CVV masking
    const cvvInput = document.getElementById("cvv");
    $(cvvInput).inputmask("999");

    

    paymentForm.addEventListener("input", () => {
        const isFormValid = paymentForm.checkValidity();
        PAYbtn.disabled = !isFormValid;
    });

    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        // Redirect to Confirmation page
        window.location.href = "confirmation.html";
    });
});
