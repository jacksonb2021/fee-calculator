function calculateFees() {
	let x = parseFloat(document.getElementById('assets').value.replaceAll(",", ''));
	let totalFee;
	let retainer = 1000;
	let tenM = 3333.33;
	let twentyM = 2500;
	let effectiveRate = -1;
	let effectiveRateAnnual = -1;
	let y = "$"+x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	let formatted = new Intl.NumberFormat('en-US',{
		style: 'currency',
		currency: 'USD',
	});

	const column1Width = 25;
	const column2Width = 10;
	const column3Width = 13;
	let result = "Total Assets:".padEnd(column1Width) + "".padEnd(column2Width) + y.padStart(column3Width) + "\n\n"; // String to accumulate all lines

	if (x < 2000000) {
		let monthlyFee = x / 1200;
		totalFee = monthlyFee;
		result += "Up to 2M:".padEnd(column1Width) + ".0833%".padEnd(column2Width) + formatted.format(monthlyFee).padStart(column3Width) + "\n";
		effectiveRate = .0833;
		effectiveRateAnnual = 1;
	} else {
		result += "Retainer:".padEnd(column1Width) + "".padEnd(column2Width) + formatted.format(retainer).padStart(column3Width) + "\n";
		result += "Up to 2M:".padEnd(column1Width) + ".0833%".padEnd(column2Width) + formatted.format(0).padStart(column3Width) + "\n";
		if (x < 10000000) {
			let monthlyFee = (x * 0.004) / 12;
			result += "From 2M to 10M:".padEnd(column1Width) + ".0333%".padEnd(column2Width) + formatted.format(monthlyFee).padStart(column3Width) + "\n";
			totalFee = retainer + monthlyFee;
		} else if (x < 20000000) {
			result += "From 2M to 10M:".padEnd(column1Width) + ".0333%".padEnd(column2Width) + formatted.format(tenM).padStart(column3Width) + "\n";
			let monthlyFee = ((x - 10000000) * 0.003) / 12;
			result += "From 10M to 20M:".padEnd(column1Width) + ".0250%".padEnd(column2Width) + formatted.format(monthlyFee).padStart(column3Width) + "\n";
			totalFee = retainer + tenM + monthlyFee;
		} else {
			result += "From 2M to 10M:".padEnd(column1Width) + ".0333%".padEnd(column2Width) + formatted.format(tenM).padStart(column3Width) + "\n";
			result += "From 10M to 20M:".padEnd(column1Width) + ".0250%".padEnd(column2Width) + formatted.format(twentyM).padStart(column3Width) + "\n";
			let monthlyFee = ((x - 20000000) * 0.0025) / 12;
			result += "Above 20M:".padEnd(column1Width) + ".0208%".padEnd(column2Width) + formatted.format(monthlyFee).padStart(column3Width) + "\n";
			totalFee = retainer + tenM + twentyM + monthlyFee;
		}
	}
	if (effectiveRate === -1) {
		effectiveRate = totalFee / x * 100;
		effectiveRateAnnual = (totalFee * 12) / x * 100;
	}

	console.log(effectiveRate);
	result += "_".repeat(column1Width + column2Width + column3Width) + "\n";
	result += "Monthly Fee:".padEnd(column1Width) + `${effectiveRate.toFixed(4)}%`.padEnd(column2Width) + formatted.format(totalFee).padStart(column3Width) + "\n";
	result += "Annual Fee:".padEnd(column1Width) + `${effectiveRateAnnual.toFixed(4)}%`.padEnd(column2Width) + formatted.format(totalFee * 12).padStart(column3Width) + "\n";

	let outputDiv = document.getElementById("output");
	// outputDiv.style.fontFamily = "Courier New, monospace";
	// outputDiv.style.whiteSpace = "pre";
	outputDiv.innerText = result;
}

let button = document.getElementById("calculate");
button.addEventListener("click", calculateFees);

//adds commas while typing input numbers
document.getElementById("assets").addEventListener('input', (e)=>{
	let value = e.target.value;
	value = value.replace(/[^0-9.]/g, '');
	value = Number(value).toLocaleString('en-US')
	e.target.value = value;
});