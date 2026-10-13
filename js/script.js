
console.log("Portfolio website loaded successfully!");

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "";
        formStatus.className = "form-status";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                formStatus.textContent =
                    "Message sent successfully! I'll get back to you soon.";

                formStatus.classList.add("success");
                contactForm.reset();
            } else {
                formStatus.textContent =
                    "Unable to send your message. Please try again.";

                formStatus.classList.add("error");
            }
        } catch (error) {
            formStatus.textContent =
                "Something went wrong. Please check your connection and try again.";

            formStatus.classList.add("error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}
