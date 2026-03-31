document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("booking-form");
    const message = document.getElementById("booking-message");
    const dateInput = document.getElementById("booking-date");
    const googleFormConfig = window.GOOGLE_FORM_CONFIG || {};

    if (!form || !message) {
        return;
    }

    if (dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0];
    }

    function getGoogleFormPayload(formData) {
        const entries = googleFormConfig.entries || {};

        return {
            [entries.full_name]: formData.get("full_name"),
            [entries.booking_date]: formData.get("booking_date"),
            [entries.phone_number]: formData.get("phone_number"),
            [entries.email]: formData.get("email"),
            [entries.temple]: formData.get("temple"),
            [entries.seva_type]: formData.get("seva_type"),
            [entries.ticket_count]: formData.get("ticket_count")
        };
    }

    function ensureHiddenFrame() {
        let frame = document.getElementById("google-form-frame");

        if (!frame) {
            frame = document.createElement("iframe");
            frame.id = "google-form-frame";
            frame.name = "google-form-frame";
            frame.hidden = true;
            document.body.appendChild(frame);
        }

        return frame;
    }

    function submitToGoogleForm(payload) {
        ensureHiddenFrame();

        const postForm = document.createElement("form");
        postForm.method = "POST";
        postForm.action = googleFormConfig.formAction;
        postForm.target = "google-form-frame";
        postForm.hidden = true;

        Object.entries(payload).forEach(function ([key, value]) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            postForm.appendChild(input);
        });

        document.body.appendChild(postForm);
        postForm.submit();
        document.body.removeChild(postForm);
    }

    function isGoogleFormConfigReady() {
        const entries = googleFormConfig.entries || {};

        return Boolean(
            googleFormConfig.formAction &&
            entries.full_name &&
            entries.booking_date &&
            entries.phone_number &&
            entries.email &&
            entries.temple &&
            entries.seva_type &&
            entries.ticket_count
        );
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        if (!isGoogleFormConfigReady()) {
            message.className = "status-message error";
            message.textContent = "Add your Google Form URL and entry IDs in google-form-config.js.";
            return;
        }

        const payload = getGoogleFormPayload(formData);
        submitToGoogleForm(payload);

        message.className = "status-message success";
        message.textContent = "Booking submitted. Check your linked Google Sheet.";
        form.reset();

        if (dateInput) {
            dateInput.min = new Date().toISOString().split("T")[0];
        }
    });
});
