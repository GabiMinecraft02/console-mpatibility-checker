console.log("JS chargé correctement.");

const consoleSelect = document.getElementById("console");
const modelSelect = document.getElementById("model");
const checkBtn = document.getElementById("checkBtn");
const resultBox = document.getElementById("result");


// 🔹 Charger dynamiquement les modèles selon la console
consoleSelect.addEventListener("change", function () {
    const selectedConsole = this.value;

    modelSelect.innerHTML = "<option value=''>Chargement...</option>";
    resultBox.innerHTML = "";

    if (selectedConsole === "") {
        modelSelect.innerHTML = "<option value=''>-- Choisir une console d'abord --</option>";
        return;
    }

    fetch("/get_models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ console: selectedConsole })
    })
    .then(res => res.json())
    .then(data => {
        modelSelect.innerHTML = "<option value=''>-- Sélectionner un modèle --</option>";

        data.models.forEach(m => {
            const opt = document.createElement("option");
            opt.value = m;
            opt.textContent = m;
            modelSelect.appendChild(opt);
        });
    });
});


// 🔹 Vérifier les hacks disponibles
checkBtn.addEventListener("click", function () {
    const selectedConsole = consoleSelect.value;
    const selectedModel = modelSelect.value;

    if (selectedConsole === "") {
        resultBox.innerHTML = "❌ Veuillez sélectionner une console.";
        return;
    }

    if (selectedModel === "") {
        resultBox.innerHTML = "❌ Veuillez sélectionner un modèle.";
        return;
    }

    fetch("/get_hacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ console: selectedConsole, model: selectedModel })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.hacks || data.hacks.length === 0) {
            resultBox.innerHTML = "⚠ Aucun hack trouvé pour ce modèle.";
            return;
        }

        // Affiche la liste des hacks
        resultBox.innerHTML = `<strong>Hacks disponibles :</strong><br>• ${data.hacks.join("<br>• ")}`;
    });
});
