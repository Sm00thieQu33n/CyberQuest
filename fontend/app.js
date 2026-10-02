
const selectableItems = document.querySelectorAll(".selectable");
const submitButton = document.getElementById("submitButton");

const selectionMode = document.body.dataset.selection || "multiple";

// Let users select answers
selectableItems.forEach(function(item) {
    item.addEventListener("click", function() {
        if (selectionMode === "single") {
            selectableItems.forEach(function(otherItem) {
                otherItem.classList.remove("selected");
            });

            item.classList.add("selected");
        } else {
            item.classList.toggle("selected");
        }
    });
});

// Score the scenario and open its feedback page
if (submitButton) {
    submitButton.addEventListener("click", function() {
        const scenario = document.body.dataset.scenario;

        const selectedItems = Array.from(selectableItems).filter(
            item => item.classList.contains("selected")
        );

        const correctItems = Array.from(selectableItems).filter(
            item => item.dataset.answer === "correct"
        );

        const correctSelected = selectedItems.filter(
            item => item.dataset.answer === "correct"
        ).length;

        const incorrectSelected = selectedItems.filter(
            item => item.dataset.answer !== "correct"
        ).length;

        const totalCorrect = correctItems.length;

        let percentage = 0;

        if (totalCorrect > 0) {
            percentage = Math.round(
                Math.max(0, correctSelected - incorrectSelected)
                / totalCorrect * 100
            );
        }

        // Save the scenario score
        localStorage.setItem(scenario + "Score", correctSelected);
        localStorage.setItem(scenario + "Percent", percentage);

        // Record completed scenarios
        const completed = JSON.parse(
            localStorage.getItem("completedScenarios") || "[]"
        );

        if (!completed.includes(scenario)) {
            completed.push(scenario);
        }

        localStorage.setItem(
            "completedScenarios",
            JSON.stringify(completed)
        );

        // Navigate to feedback page
        const feedbackPages = {
            "1": "../../feedback/phishing/phishfeedback1.html",
            "2": "../../feedback/phishing/phishfeedback2.html",
            "badlink1": "../../feedback/links/badlinkfeedback1.html",
            "badlink2": "../../feedback/links/badlinkfeedback2.html",
            "password1": "../../feedback/password/passwordfeedback1.html",
            "password2": "../../feedback/password/passwordfeedback2.html",
            "physical1": "../../feedback/physical/physicalfeedback1.html",
            "physical2": "../../feedback/physical/physicalfeedback2.html"
        };

        if (feedbackPages[scenario]) {
            window.location.href = feedbackPages[scenario];
        } else {
            alert("Feedback page not found for this scenario.");
        }
    });
}

// LOGIN CODE — separate from scenario scoring
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "Brennan" && password === "cyberquest") {
            window.location.href = "dashboard.html";
        } else {
            alert("Incorrect username or password. Please try again.");
        }
    });
}