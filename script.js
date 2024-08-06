function calculateFees() {
	// Get the value from the input field and convert it to a float
	let x = parseFloat(document.getElementById("assets").value);
	let result = ""; // String to accumulate all lines
	let totalFee = 0;
	let retainer = 1000;
	let tenM = 3333.33;
	let twentyM = 2500;

	// Define column widths
	const column1Width = 25; // Increased width for better spacing
	const column2Width = 10;
	const column3Width = 12;

	if (x < 2000000) {
		let monthlyFee = x / 1200;
		totalFee = monthlyFee;
		result += "Up to 2M:".padEnd(column1Width) + "".padEnd(column2Width) + monthlyFee.toFixed(2).padStart(column3Width) + "\n";
	} else if (x < 10000000) {
		let monthlyFee = (x * 0.004) / 12;
		result += "Retainer:".padEnd(column1Width) + "".padEnd(column2Width) + "1,000.00".padStart(column3Width) + "\n";
		result += "Up to 10M:".padEnd(column1Width) + ".0333%".padEnd(column2Width) + monthlyFee.toFixed(2).padStart(column3Width) + "\n";
		totalFee = retainer + monthlyFee;
	} else if (x < 20000000) {
		result += "Retainer:".padEnd(column1Width) + "".padEnd(column2Width) + "1,000.00".padStart(column3Width) + "\n";
		result += "Up to 10M:".padEnd(column1Width) + ".0333%".padEnd(column2Width) + tenM.toFixed(2).padStart(column3Width) + "\n";
		let monthlyFee = ((x - 10000000) * 0.003) / 12;
		result += "From 10M to 20M:".padEnd(column1Width) + ".0250%".padEnd(column2Width) + monthlyFee.toFixed(2).padStart(column3Width) + "\n";
		totalFee = retainer + tenM + monthlyFee;
	} else {
		result += "Retainer:".padEnd(column1Width) + "".padEnd(column2Width) + "1,000.00".padStart(column3Width) + "\n";
		result += "Up to 10M:".padEnd(column1Width) + ".0333%".padEnd(column2Width) + tenM.toFixed(2).padStart(column3Width) + "\n";
		result += "From 10M to 20M:".padEnd(column1Width) + ".0250%".padEnd(column2Width) + twentyM.toFixed(2).padStart(column3Width) + "\n";
		let monthlyFee = ((x - 20000000) * 0.0025) / 12;
		result += "Above 20M:".padEnd(column1Width) + ".0208%".padEnd(column2Width) + monthlyFee.toFixed(2).padStart(column3Width) + "\n";
		totalFee = retainer + tenM + twentyM + monthlyFee;
	}

	result += "_".repeat(column1Width + column2Width + column3Width) + "\n";
	result += "Monthly Fee:".padEnd(column1Width) + "".padEnd(column2Width) + totalFee.toFixed(2).padStart(column3Width) + "\n";
	result += "Annual Fee:".padEnd(column1Width) + "".padEnd(column2Width) + (totalFee * 12).toFixed(2).padStart(column3Width) + "\n";

	// Output the result to the document
	let outputDiv = document.getElementById("output");
	outputDiv.style.fontFamily = "Courier New, monospace"; // Ensure monospaced font
	outputDiv.style.whiteSpace = "pre"; // Preserve whitespace and line breaks
	outputDiv.innerText = result;
}

let button = document.getElementById("calculate");
button.addEventListener("click", calculateFees);
