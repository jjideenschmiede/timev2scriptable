// Define parameter
// Set API Token
const token = ""

// Set domainkey
const domainKey = ""

// Check time
const time = new Date()

// Get date
function date(time) {

    const year = time.getFullYear()

    // Save month
    function month() {
        if (time.getMonth() < 10) {
            return "0" + (time.getMonth() + 1)
        } else {
            return time.getMonth() + 1
        }
    }

    return year + "-" + month()

}

// Get month
function month(time) {

    // Define months
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "December"]

    // Return
    return months[time.getMonth()]

}

// Send to timev2 Backend
let request = new Request(`https://${domainKey}.timev2.de/report?month=${date(time)}`)

// Define method
request.method = "GET"

// Define header
request.headers = {
    "authentication": token
}

// Read JSON data
const respone = await request.loadJSON()

// Check widget is running
if (config.runsInWidget) {

    // To save widget
    let widget = null

    // Check widget size
    if (config.widgetFamily == "small") {
        widget = createSmallWidget(respone.report.net_sales)
    } else {
        widget = createWidget(respone.report.net_sales)
    }

    // Create widget
    Script.setWidget(widget)
    Script.complete()

} else {

    // Create table
    const table = new UITable()

    // Add header
    const row = new UITableRow()
    row.isHeader = true
    row.addText(`timev2`)

    // Add to table
    table.addRow(row)

    // Add rows
    table.addRow(createRow(`${respone.report.net_sales} €`))
    table.addRow(createRow(`Umsätze für ${month(time)} ${time.getFullYear()}.`))

    // Show table
    table.present()

}


// Create new row
function createRow(title) {

    // Create new element
    const row = new UITableRow()

    // Add new title
    row.addText(title)

    // Return
    return row

}

// Create small widget
function createSmallWidget(data) {

    // Define widget
    let widget = new ListWidget()

    // Set background color
    widget.backgroundColor = new Color("#e72933")

    // Spacer
    widget.addSpacer(70)

    // Set and define first text element
    let header = widget.addText("timev2")
    header.textColor = Color.white()
    header.textOpacity = 0.7
    header.font = Font.systemFont(12)

    // Set body text
    let body = widget.addText(`${data} €`)
    body.textColor = Color.white()
    body.font = Font.systemFont(25)

    // Footer
    let footer = widget.addText(`Umsätze für ${month(time)} ${time.getFullYear()}.`)
    footer.textColor = Color.white()
    footer.font = Font.systemFont(9)

    return widget

}

// Create widget
function createWidget(data) {

    // Define widget
    let widget = new ListWidget()

    // Set background color
    widget.backgroundColor = new Color("#e72933")

    // Spacer
    widget.addSpacer(40)

    // Set and define first text element
    let header = widget.addText("timev2")
    header.textColor = Color.white()
    header.textOpacity = 0.7
    header.font = Font.systemFont(12)

    // Set body text
    let body = widget.addText(`${data} €`)
    body.textColor = Color.white()
    body.font = Font.systemFont(40)

    // Footer
    let footer = widget.addText(`Umsätze für ${month(time)} ${time.getFullYear()}.`)
    footer.textColor = Color.white()
    footer.font = Font.systemFont(20)

    return widget

}