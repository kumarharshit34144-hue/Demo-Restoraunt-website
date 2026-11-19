
// =============================
// 1. MENU CATEGORY FILTER
// =============================

const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        const selectedCategory = this.dataset.category;

        // Filter menu items
        menuCards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === cardCategory
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});


// =============================
// 2. MOBILE NAVIGATION
// =============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("show");

});

// Close menu after clicking a link

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show");

    });

});


// =============================
// 3. RESERVATION FORM
// =============================

const reservationForm = document.getElementById("reservationForm");

const formMessage = document.getElementById("formMessage");

const bookingDate = document.getElementById("bookingDate");

const bookingTime = document.getElementById("bookingTime");


// Set today's date as minimum booking date

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

bookingDate.min = localToday;


reservationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();

    const email = document.getElementById("customerEmail").value.trim();

    const phone = document.getElementById("customerPhone").value.trim();

    const date = bookingDate.value;

    const time = bookingTime.value;

    const guests = document.getElementById("guests").value;


    // Validate booking date

    if (date < localToday) {

        formMessage.textContent =
            "Please select today or a future date.";

        formMessage.style.color = "#ff8b8b";

        return;

    }


    // Validate phone number

    if (!/^[0-9]{10}$/.test(phone)) {

        formMessage.textContent =
            "Please enter a valid 10-digit phone number.";

        formMessage.style.color = "#ff8b8b";

        return;

    }


    // Show confirmation message

    formMessage.style.color = "#d8bd82";

    formMessage.textContent =
        `Thank you, ${name}! Your reservation request for ${guests} guests on ${date} at ${time} has been received. We will contact you at ${phone} to confirm.`;


    // Display details in browser console

    console.log("Reservation Request:", {
        name,
        email,
        phone,
        date,
        time,
        guests
    });


    // Reset form

    reservationForm.reset();

    bookingDate.min = localToday;

});
