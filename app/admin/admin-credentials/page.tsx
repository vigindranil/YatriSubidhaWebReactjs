"use client"

import { useState, useEffect } from 'react';
import { 
  Search, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  Eye, 
  EyeOff,
  ShieldCheck,
  KeyRound,
  Loader2,
  X,        
  Lock,     
  Save      
} from "lucide-react";
import { AdminNav } from "@/components/admin-nav";
import { callApi } from "@/components/apis/commonApi";

// Interface matching your API response data structure
interface UserCredential {
  UserID: number;
  UserTypeName: string;
  UserName: string;
  UserPassword: string;
}

export default function AdminCredentialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set());
  
  // State for API data
  const [users, setUsers] = useState<UserCredential[]>([]);
  const [loading, setLoading] = useState(true);

  // --- NEW STATE FOR UPDATE PASSWORD MODAL ---
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserCredential | null>(null);
  const [passwordForm, setPasswordForm] = useState({ previous: '', new: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  // State for Modal Password Visibility
  const [showModalPrevPass, setShowModalPrevPass] = useState(false);
  const [showModalNewPass, setShowModalNewPass] = useState(false);

  // Fetch data on page load
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const payload = {
        UserID: 1,
        AuthInfo: "{}"
      };

      const response = await callApi("admin/get-user-list", payload);

      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle Password Visibility in Table
  const togglePasswordVisibility = (id: number) => {
    const newSet = new Set(visiblePasswords);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setVisiblePasswords(newSet);
  };

  // --- OPEN MODAL HANDLER ---
  const openUpdateModal = (user: UserCredential) => {
    setSelectedUser(user);
    setPasswordForm({ previous: '', new: '' }); // Reset form
    setShowModalPrevPass(false); // Reset visibility
    setShowModalNewPass(false); // Reset visibility
    setShowUpdateModal(true);
  };

  // --- API CALL: UPDATE PASSWORD ---
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    if (!passwordForm.previous || !passwordForm.new) {
      alert("Please fill in both password fields.");
      return;
    }

    setIsUpdating(true);

    try {
      // Constructing Payload
      const payload = {
        UserID: selectedUser.UserID,
        PreviousPassword: passwordForm.previous,
        NewPassword: passwordForm.new
      };

      // Calling the API
      const response = await callApi("admin/update-admin-password", payload);

      if (response.success) {
        alert("Password updated successfully!");
        setShowUpdateModal(false);
        fetchUsers(); // Refresh the list
      } else {
        alert(`Failed to update: ${response.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while connecting to the server.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter Logic
  const filteredData = users.filter(item => 
    (item.UserName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.UserTypeName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => window.print();
  const handleExport = (type: string) => alert(`Exporting to ${type}...`);

  return (
    <main className="min-h-screen bg-green-50/30 relative">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Security Management
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Admin Credentials</h1>
          <p className="text-lg text-gray-600">Manage system access, user roles, and security configurations.</p>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-green-100/50">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button onClick={() => handleExport('Excel')} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-green-200 text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all shadow-sm">
                <FileSpreadsheet size={18} /> Excel
              </button>
              <button onClick={() => handleExport('PDF')} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-green-200 text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all shadow-sm">
                <FileText size={18} /> PDF
              </button>
              <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-green-200 text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all shadow-sm">
                <Printer size={18} /> Print
              </button>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-96 space-y-2">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search by username or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-11 bg-green-50/50 border border-green-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all font-medium placeholder:text-gray-400"
                />
                <Search className="absolute left-3.5 top-3.5 text-green-600/60 group-hover:text-green-600 transition-colors" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-green-50 to-emerald-50/30 border-b border-green-100">
                  <th className="px-8 py-5 text-left text-xs font-bold text-green-800 uppercase tracking-wider">User Type</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-green-800 uppercase tracking-wider">Username</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-green-800 uppercase tracking-wider">Password</th>
                  <th className="px-8 py-5 text-center text-xs font-bold text-green-800 uppercase tracking-wider">Update Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-green-600">
                        <Loader2 className="w-10 h-10 animate-spin mb-2" />
                        <p className="text-sm font-medium">Loading credentials...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center text-gray-500">No users found</td>
                  </tr>
                ) : (
                  filteredData.map((user) => (
                    <tr key={user.UserID} className="hover:bg-green-50/40 transition-colors group border-l-4 border-l-transparent hover:border-l-green-500">
                      
                      {/* User Type */}
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${
                          user.UserTypeName === 'Counter Operator' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          user.UserTypeName === 'BOI' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          user.UserTypeName === 'Customs' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-gray-100 text-gray-700 border-gray-200'
                        }`}>
                          {user.UserTypeName}
                        </span>
                      </td>

                      {/* Username */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                            {user.UserName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-700">{user.UserName}</span>
                        </div>
                      </td>

                      {/* Password */}
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-between max-w-[200px] bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 group-hover:border-green-200 transition-colors">
                          <span className="font-mono text-sm text-gray-600 truncate mr-2">
                            {visiblePasswords.has(user.UserID) ? user.UserPassword : '••••••••'}
                          </span>
                          <button onClick={() => togglePasswordVisibility(user.UserID)} className="text-gray-400 hover:text-green-600 transition-colors focus:outline-none">
                            {visiblePasswords.has(user.UserID) ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </td>

                      {/* Actions - UPDATE BUTTON */}
                      <td className="px-8 py-5 text-center">
                        <button 
                          onClick={() => openUpdateModal(user)}
                          title="Update Password"
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-white hover:bg-green-600 hover:border-green-600 shadow-sm hover:shadow-md transition-all duration-200 group/btn"
                        >
                          <KeyRound size={18} className="group-hover/btn:rotate-12 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex items-center justify-between">
             <p className="text-xs text-gray-500 font-medium">Showing {filteredData.length} records</p>
          </div>
        </div>

        {/* ----------------- UPDATE PASSWORD MODAL ----------------- */}
        {showUpdateModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
              
              {/* Modal Header */}
              <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg border border-green-200 shadow-sm">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Update Password</h3>
                    <p className="text-xs text-gray-500">For user: <span className="font-semibold text-green-700">{selectedUser.UserName}</span></p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowUpdateModal(false)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleUpdatePassword} className="p-6 space-y-4">
                
                {/* Previous Password Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Previous Password</label>
                  <div className="relative">
                    <input
                      type={showModalPrevPass ? "text" : "password"}
                      placeholder="Enter old password"
                      value={passwordForm.previous}
                      onChange={(e) => setPasswordForm({ ...passwordForm, previous: e.target.value })}
                      className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowModalPrevPass(!showModalPrevPass)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-green-600 focus:outline-none transition-colors"
                    >
                      {showModalPrevPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* New Password Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">New Password</label>
                  <div className="relative">
                    <input
                      type={showModalNewPass ? "text" : "password"}
                      placeholder="Enter new password"
                      value={passwordForm.new}
                      onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                      className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowModalNewPass(!showModalNewPass)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-green-600 focus:outline-none transition-colors"
                    >
                      {showModalNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}