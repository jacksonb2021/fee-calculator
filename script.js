function calculateFees() {
	// Get the value from the input field and convert it to a float
	let x = parseFloat(document.getElementById("assets").value);
	let result = ""; // String to accumulate all lines
	let totalFee = 0;
	let retainer = 1000;
	let tenM = 3333.33;
	let twentyM = 2500;

	// Define the width for alignment
	const padding = 30;

	if (x < 2000000) {
		let monthlyFee = x / 1200;
		totalFee = monthlyFee;
		result+="Up to 2M:".padEnd(padding)+monthlyFee.toFixed(2).padStart(10)+'\n'
		result+="1% annually, .0833%/month"+'\n'
	} else if (x < 10000000) {
		let monthlyFee = (x * 0.004) / 12;
		result += "Retainer:".padEnd(padding) + "1,000.00".padStart(10) + "\n";
		result += "Up to 10M:".padEnd(padding) + monthlyFee.toFixed(2).padStart(10) + "\n";
		result += ".4% annually, .0333%/month\n";
		totalFee = retainer + monthlyFee;
	} else if (x < 20000000) {
		result += "Retainer:".padEnd(padding) + "1,000.00".padStart(10) + "\n";
		result += "Up to 10M:".padEnd(padding) + tenM.toFixed(2).padStart(10) + "\n";
		result += ".4% annually, .0333%/month\n";
		let monthlyFee = ((x - 10000000) * 0.003) / 12;
		result += "From 10M to 20M:".padEnd(padding) + monthlyFee.toFixed(2).padStart(10) + "\n";
		result += ".3% annually, .025%/month\n";
		totalFee = retainer + tenM + monthlyFee;
	} else {
		result += "Retainer:".padEnd(padding) + "1,000.00".padStart(10) + "\n";
		result += "Up to 10M:".padEnd(padding) + tenM.toFixed(2).padStart(10) + "\n";
		result += ".4% annually, .0333%/month\n";

		result += "From 10M to 20M:".padEnd(padding) + twentyM.toFixed(2).padStart(10) + "\n";
		result += ".3% annually, .025%/month\n";

		let monthlyFee = ((x - 20000000) * 0.0025) / 12;
		result += "Above 20M:".padEnd(padding) + monthlyFee.toFixed(2).padStart(10) + "\n";
		result += ".25% annually, .0208%/month\n";

		totalFee = retainer + tenM + twentyM + monthlyFee;
	}

	result += "_".repeat(padding) + "\n";
	result += "Monthly Fee:".padEnd(padding) + totalFee.toFixed(2).padStart(10) + "\n";
	result += "Annual Fee:".padEnd(padding) + (totalFee * 12).toFixed(2).padStart(10) + "\n";

	// Output the result to the document
	let outputDiv = document.getElementById("output");
	outputDiv.style.fontFamily = "Courier New, monospace"; // Ensure monospaced font
	outputDiv.style.whiteSpace = "pre"; // Preserve whitespace and line breaks
	outputDiv.innerText = result;
}
let button = document.getElementById("calculate");
button.addEventListener("click", calculateFees);
