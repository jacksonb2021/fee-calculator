from pyscript import document

def main(event):
    # x = float(input("Enter total client assets\n"))
    x = float(document.querySelector("#assets").value)
    result = ""  # String to accumulate all lines

    if x < 2000000:
        monthly_fee = x / 1200
        # % per month .0833
        # result += "Percent per month: .0833%\n"
        total_fee = monthly_fee
    elif x < 10000000:
        retainer = 1000
        monthly_fee = (x * .004) / 12
        result += "retainer:".ljust(25) + "1,000.00".rjust(10) + "\n"
        # % per month = .0333
        result += "up to 10M:".ljust(25) + f'{monthly_fee:.2f}'.rjust(10) + "\n"
        result += ".4% annually, .0333PPM\n"
        total_fee = retainer + monthly_fee
    elif x < 20000000:
        retainer = 1000
        ten_m = 3333.33
        result += "retainer:".ljust(25) + "1,000.00".rjust(10) + "\n"
        result += "up to 10M:".ljust(25) + f"{ten_m:,.2f}".rjust(10) + "\n"
        result += ".4% annually, .0333PPM\n"
        # % per month .025
        monthly_fee = ((x - 10000000) * .003) / 12
        result += "from 10M to 20M:".ljust(25) + f"{monthly_fee:,.2f}".rjust(10) + "\n"
        result += ".3% annually, .025PPM\n"
        total_fee = retainer + ten_m + monthly_fee
    else:
        retainer = 1000
        ten_m = 3333.33
        result += "retainer:".ljust(25) + "1,000.00".rjust(10) + "\n"
        result += "up to 10M:".ljust(25) + f"{ten_m:,.2f}".rjust(10) + "\n"
        result += ".4% annually, .0333PPM\n"

        twenty_m = 2500
        result += "from 10M to 20M:".ljust(25) + f"{twenty_m:,.2f}".rjust(10) + "\n"
        result += ".3% annually, .025PPM\n"

        # % per month .025
        monthly_fee = ((x - 20000000) * .0025) / 12
        result += "above 20M:".ljust(25) + f"{monthly_fee:,.2f}".rjust(10) + "\n"
        result += ".25% annually, .0208PPM\n"

        total_fee = retainer + ten_m + twenty_m + monthly_fee

    result += "_" * 36 + "\n"
    result += "Monthly Fee:".ljust(25) + f'{total_fee:,.2f}'.rjust(10) + "\n"
    result += "Annual Fee:".ljust(25) + f'{(total_fee * 12):,.2f}'.rjust(10) + "\n"

    # Output the result to the document
    output_div = document.querySelector("#output")
    output_div.innerText = result
