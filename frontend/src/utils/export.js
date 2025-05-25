import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportCSV(summaryData) {
    if (!summaryData || typeof summaryData !== "object") {
        alert("No data to export.");
        return;
    }

    const summaryArray = Object.entries(summaryData).map(([year, val]) => ({
        year,
        count: val.duration.count,
        mean: val.duration.mean,
    }));

    if (summaryArray.length === 0) {
        alert("No data to export.");
        return;
    }

    const csvContent = [
        ["Year", "Heatwave Count", "Avg Duration (days)"].join(","),
        ...summaryArray.map(row => [row.year, row.count, row.mean].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "heatwave_summary.csv";
    link.click();
}

export function exportPDF(summaryData) {
    if (!summaryData || typeof summaryData !== "object") {
        alert("No data to export.");
        return;
    }

    const summaryArray = Object.entries(summaryData).map(([year, val]) => ({
        year,
        count: val.duration.count,
        mean: val.duration.mean,
    }));

    if (summaryArray.length === 0) {
        alert("No data to export.");
        return;
    }

    const doc = new jsPDF();
    doc.text("Heatwave Summary Report", 14, 15);

    const headers = [["Year", "Heatwave Count", "Avg Duration (days)"]];
    const rows = summaryArray.map(row => [row.year, row.count, row.mean]);

    autoTable(doc, {
        head: headers,
        body: rows,
        startY: 20,
        theme: "striped",
    });

    doc.save("heatwave_summary.pdf");
}
