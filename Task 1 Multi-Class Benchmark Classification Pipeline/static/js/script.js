
document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------
    // PAGE NAVIGATION
    // --------------------------------

    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".page-section");
    const pageTitle = document.getElementById("page-title");

    // --------------------------------
// DATA VISUALIZATION CHARTS
// --------------------------------

let visualizationChartsLoaded = false;

async function loadVisualizationCharts() {

    if (visualizationChartsLoaded) return;

    const errorBox = document.getElementById("visualization-error");

    if (typeof Chart === "undefined") {
        errorBox.textContent = "Chart.js could not be loaded. Check your internet connection.";
        errorBox.classList.remove("hidden");
        return;
    }

    try {

        const response = await fetch("/api/dataset");
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.error || "Unable to load dataset.");
        }

        const records = result.records;

        const species = [
            "setosa",
            "versicolor",
            "virginica"
        ];

        const colors = {
            setosa: "#3478f6",
            versicolor: "#35b89a",
            virginica: "#f3ad55"
        };

        // PETAL SCATTER CHART

        new Chart(document.getElementById("petalScatterChart"), {

            type: "scatter",

            data: {
                datasets: species.map(name => ({
                    label: name.charAt(0).toUpperCase() + name.slice(1),

                    data: records
                        .filter(row => row.species.toLowerCase() === name)
                        .map(row => ({
                            x: row.petal_length,
                            y: row.petal_width
                        })),

                    backgroundColor: colors[name],
                    pointRadius: 4,
                    pointHoverRadius: 7
                }))
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                },

                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Petal Length (cm)"
                        }
                    },

                    y: {
                        title: {
                            display: true,
                            text: "Petal Width (cm)"
                        }
                    }
                }
            }

        });


        // SEPAL SCATTER CHART

        new Chart(document.getElementById("sepalScatterChart"), {

            type: "scatter",

            data: {
                datasets: species.map(name => ({
                    label: name.charAt(0).toUpperCase() + name.slice(1),

                    data: records
                        .filter(row => row.species.toLowerCase() === name)
                        .map(row => ({
                            x: row.sepal_length,
                            y: row.sepal_width
                        })),

                    backgroundColor: colors[name],
                    pointRadius: 4,
                    pointHoverRadius: 7
                }))
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                },

                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Sepal Length (cm)"
                        }
                    },

                    y: {
                        title: {
                            display: true,
                            text: "Sepal Width (cm)"
                        }
                    }
                }
            }

        });


        // AVERAGE FEATURE COMPARISON

        const features = [
            {
                key: "sepal_length",
                label: "Sepal Length"
            },
            {
                key: "sepal_width",
                label: "Sepal Width"
            },
            {
                key: "petal_length",
                label: "Petal Length"
            },
            {
                key: "petal_width",
                label: "Petal Width"
            }
        ];

        new Chart(document.getElementById("averageFeatureChart"), {

            type: "bar",

            data: {
                labels: features.map(feature => feature.label),

                datasets: species.map(name => ({
                    label: name.charAt(0).toUpperCase() + name.slice(1),

                    data: features.map(
                        feature => result.averages[name][feature.key]
                    ),

                    backgroundColor: colors[name],
                    borderRadius: 5
                }))
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Average Measurement (cm)"
                        }
                    }
                }
            }

        });

        visualizationChartsLoaded = true;

    } catch (error) {

        errorBox.textContent = "Visualization error: " + error.message;
        errorBox.classList.remove("hidden");

        console.error("Visualization error:", error);

    }
}

    function showSection(sectionId) {

        sections.forEach(section => {
            section.classList.toggle(
                "active",
                section.id === sectionId
            );
        });

        navItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.section === sectionId
            );
        });

        const selectedItem = document.querySelector(
            `.nav-item[data-section="${sectionId}"]`
        );

        if (selectedItem) {
            pageTitle.textContent = selectedItem.textContent.trim();
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
        if (sectionId === "visualization") {
            loadVisualizationCharts();
        }
    }

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            showSection(item.dataset.section);
        });
    });

    document.querySelectorAll("[data-go]").forEach(button => {
        button.addEventListener("click", () => {
            showSection(button.dataset.go);
        });
    });


    // --------------------------------
    // SPECIES DISTRIBUTION CHART
    // --------------------------------

    const chartCanvas = document.getElementById("speciesChart");

    if (chartCanvas) {
        new Chart(chartCanvas, {
            type: "doughnut",

            data: {
                labels: [
                    "Setosa",
                    "Versicolor",
                    "Virginica"
                ],

                datasets: [{
                    data: [50, 50, 50],
                    backgroundColor: [
                        "#3478f6",
                        "#35b89a",
                        "#f3ad55"
                    ],
                    borderWidth: 0,
                    hoverOffset: 6
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 11
                            }
                        }
                    }
                },

                cutout: "68%"
            }
        });
    }


    // --------------------------------
    // FLOWER PREDICTION API
    // --------------------------------

    const predictionForm = document.getElementById(
        "prediction-form"
    );

    const resultBox = document.getElementById(
        "prediction-result"
    );

    predictionForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const button = predictionForm.querySelector(
            'button[type="submit"]'
        );

        button.disabled = true;
        button.textContent = "Analyzing...";

        resultBox.classList.remove("hidden");
        resultBox.textContent = "Processing your prediction...";

        const payload = {
            sepal_length: Number(
                document.getElementById("sepal_length").value
            ),

            sepal_width: Number(
                document.getElementById("sepal_width").value
            ),

            petal_length: Number(
                document.getElementById("petal_length").value
            ),

            petal_width: Number(
                document.getElementById("petal_width").value
            ),

            model: document.getElementById("model").value
        };

        try {

            const response = await fetch("/api/predict", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Prediction failed.");
            }

            const probabilityHTML = Object.entries(
                result.probabilities
            ).map(([species, probability]) => `
                <p>
                    <strong>${species}</strong>:
                    ${probability.toFixed(2)}%
                </p>
            `).join("");

            resultBox.innerHTML = `
                <h3>Prediction Successful</h3>

                <p>
                    Predicted Species:
                    <strong>${result.predicted_species}</strong>
                </p>

                <p>
                    Model:
                    ${result.model.replaceAll("_", " ")}
                </p>

                <h4 style="margin-top: 15px;">
                    Prediction Probabilities
                </h4>

                ${probabilityHTML}
            `;

        } catch (error) {

            resultBox.textContent = "Error: " + error.message;

        } finally {

            button.disabled = false;
            button.textContent = "Predict Flower Species →";

        }

    });

});
