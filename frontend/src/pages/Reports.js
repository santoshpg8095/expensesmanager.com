import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval } from 'date-fns';
import { useExpense } from '../context/ExpenseContext';
import { useTheme } from '../context/ThemeContext';
import ExpenseSummary from '../components/ExpenseSummary';
import ExpenseTable from '../components/ExpenseTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Reports = () => {
  const [reportType, setReportType] = useState('monthly');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredSummary, setFilteredSummary] = useState({ byCategory: [], total: 0 });
  const { expenses, getExpenses, loading } = useExpense();
  const { darkMode } = useTheme();

  useEffect(() => {
    getExpenses(1, 1000); // Get all expenses for filtering
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      filterExpenses();
    }
  }, [expenses, reportType, selectedDate]);

  const filterExpenses = () => {
    let startDate, endDate;
    
    if (reportType === 'monthly') {
      startDate = startOfMonth(selectedDate);
      endDate = endOfMonth(selectedDate);
    } else {
      startDate = startOfYear(selectedDate);
      endDate = endOfYear(selectedDate);
    }

    const filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return isWithinInterval(expenseDate, { start: startDate, end: endDate });
    });

    setFilteredExpenses(filtered);

    // Calculate summary
    const summary = {
      byCategory: [],
      total: 0,
    };

    const categoryMap = {};
    filtered.forEach(expense => {
      if (!categoryMap[expense.category]) {
        categoryMap[expense.category] = {
          _id: expense.category,
          total: 0,
          count: 0,
        };
      }
      categoryMap[expense.category].total += expense.amount;
      categoryMap[expense.category].count += 1;
      summary.total += expense.amount;
    });

    summary.byCategory = Object.values(categoryMap);
    setFilteredSummary(summary);
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleReportTypeChange = (type) => {
    setReportType(type);
  };

  const downloadPDF = () => {
    const input = document.getElementById('report-content');
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${reportType}-expense-report-${format(selectedDate, 'yyyy-MM')}.pdf`);
    });
  };

  const getReportTitle = () => {
    if (reportType === 'monthly') {
      return `Monthly Report - ${format(selectedDate, 'MMMM yyyy')}`;
    } else {
      return `Yearly Report - ${format(selectedDate, 'yyyy')}`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Reports</h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>View and download your expense reports</p>
      </div>

      {/* Report Controls */}
      <div className={`mb-8 p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex space-x-4">
            <button
              onClick={() => handleReportTypeChange('monthly')}
              className={`px-4 py-2 rounded-md ${reportType === 'monthly' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleReportTypeChange('yearly')}
              className={`px-4 py-2 rounded-md ${reportType === 'yearly' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
            >
              Yearly
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type={reportType === 'monthly' ? 'month' : 'year'}
              value={format(selectedDate, reportType === 'monthly' ? 'yyyy-MM' : 'yyyy')}
              onChange={handleDateChange}
              className={`px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
            />
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div id="report-content">
        <div className={`mb-8 p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {getReportTitle()}
          </h2>
          
          <ExpenseSummary summary={filteredSummary} />
        </div>

        <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Expense Details
          </h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <ExpenseTable
              expenses={filteredExpenses}
              onEdit={() => {}} // No edit in reports
              onDelete={() => {}} // No delete in reports
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;