import { useState } from 'react';
import { Search } from 'lucide-react';

export default function BookingReport() {
  const [formData, setFormData] = useState({
    journeyType: '',
    slot: '',
    startDate: '',
    endDate: ''
  });

  const [bookings, setBookings] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGetDetails = () => {
    // Placeholder for fetching data
    console.log('Fetching details with:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium border border-teal-200">
              Smart Border Crossing Solution
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Booking Report</h1>
          <p className="text-lg text-gray-600">View and manage booking details with advanced filtering options</p>
        </div>

        {/* Filter Card */}
        <div className="bg-teal-50/30 rounded-2xl shadow-sm p-8 mb-8 border border-teal-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Journey Type */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Journey Type
              </label>
              <select
                name="journeyType"
                value={formData.journeyType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              >
                <option value="">Select Type</option>
                <option value="oneway">One Way</option>
                <option value="roundtrip">Round Trip</option>
                <option value="multicity">Multi City</option>
              </select>
            </div>

            {/* Select Slot */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Select Slot
              </label>
              <select
                name="slot"
                value={formData.slot}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              >
                <option value="">Select Slot</option>
                <option value="morning">Morning (6AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 6PM)</option>
                <option value="evening">Evening (6PM - 12AM)</option>
                <option value="night">Night (12AM - 6AM)</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                placeholder="yy-mm-dd"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                placeholder="yy-mm-dd"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Get Details Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGetDetails}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-teal-500 text-teal-600 font-medium rounded-lg transition-all shadow-sm hover:shadow-md hover:bg-teal-50"
            >
              <Search size={20} />
              Get Details
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Passport Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Reference Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Journey Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Slot Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Slot Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Attendance Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Attendance Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Nationality
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Search size={48} className="mb-4 opacity-30" />
                        <p className="text-lg font-medium text-gray-600">No bookings found</p>
                        <p className="text-sm mt-1 text-gray-500">Select filters and click "Get Details" to view bookings</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking, index) => (
                    <tr key={index} className="hover:bg-teal-50/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.passport}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.reference}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.journeyDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.slotName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.slotTime}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          booking.attendanceStatus === 'Confirmed' 
                            ? 'bg-teal-100 text-teal-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {booking.attendanceStatus === 'Confirmed' && (
                            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                          )}
                          {booking.attendanceStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.attendanceDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.nationality}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}