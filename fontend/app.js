const selectableItems = document.querySelectorAll(".selectable");
const submitButton = document.getElementById("submitButton");


// Determine if the scenario allows one or multiple selections
const selectionMode = document.body.dataset.selection || "multiple";


// Handle answer selection
selectableItems.forEach(function(item) {

    item.addEventListener("click", function() {

        // Single choice scenario
        if (selectionMode === "single") {

            selectableItems.forEach(function(otherItem) {
                otherItem.classList.remove("selected");
            });

            item.classList.add("selected");

        }

        // Multiple choice scenario
        else {

            item.classList.toggle("selected");

        }

    });

});


// Submit button
if (submitButton) {

    submitButton.addEventListener("click", function() {

        let correct = 0;

        selectableItems.forEach(function(item) {

            if (
                item.classList.contains("selected") &&
                item.dataset.answer === "correct"
            ) {
                correct++;
            }

        });


        // Get the scenario name
        const scenario = document.body.dataset.scenario;


        // Save the score
        localStorage.setItem(
            scenario + "Score",
            correct
        );


        // Send the user to the correct feedback page

        if (scenario === "badlink1") {

            window.location.href =
                "../../feedback/links/badlinkfeedback1.html";

        }

        else if (scenario === "badlink2") {

            window.location.href =
                "../../feedback/links/badlinkfeedback2.html";

}

        else if (scenario === "password1") {

            window.location.href =
                "../../feedback/password/passwordfeedback1.html";

        }

        else if (scenario === "physical1") {

            window.location.href =
                "../../feedback/physical/physicalfeedback1.html";

        }

        else if (scenario === "1") {

            window.location.href =
                "../../feedback/phishing/phishfeedback1.html";

        }

        else if (scenario === "2") {

            window.location.href =
                "../../feedback/phishing/phishfeedback2.html";

        }

    });

}