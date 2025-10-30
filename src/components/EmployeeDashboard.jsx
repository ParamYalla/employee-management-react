import axios from "axios";
import { useEffect, useState } from "react";
import Welcome from "./Welcome";
import WelcomeMenu from "./WelcomeMenu";
import Footer from "./Footer";

function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [editingEmp, setEditingEmp] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8080/getAll/")
      .then((response) => setEmployees(response.data))
      .catch(() => console.log("Something went wrong"));
  };

  const deleteemployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:8080/delete/${id}/`)
        .then(() => {
          alert("Employee deleted successfully");
          setEmployees((old) => old.filter((emp) => emp.id !== id));
        })
        .catch(() => alert("Failed to delete employee"));
    }
  };

  const startEdit = (emp) => {
    setEditingEmp(emp.id);
    setForm({ name: emp.name, email: emp.email, password: emp.password });
  };

  const updateEmployee = () => {
    axios
      .put(`http://localhost:8080/update/${editingEmp}/`, form)
      .then(() => {
        setEmployees((old) =>
          old.map((e) => (e.id === editingEmp ? { ...e, ...form } : e))
        );
        setEditingEmp(null);
        setForm({ name: "", email: "", password: "" });
      })
      .catch(() => alert("Failed to update employee"));
  };

  const addEmployee = () => {
    axios
      .post("http://localhost:8080/register/", form)
      .then((response) => {
        if (response.data.success) {
          fetchEmployees(); // refresh list
          setIsAdding(false);
          setForm({ name: "", email: "", password: "" });
        }
      })
      .catch(() =>
        alert(
          "Failed to add employee. Please try again by entering valid details"
        )
      );
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            👩‍💼 Employee Dashboard
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Password</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {employees.length > 0 ? (
                  employees.map((emp, index) => (
                    <tr
                      key={index}
                      className="hover:bg-indigo-50 transition-all duration-200">
                      <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                      <td className="py-3 px-4 text-gray-700">{emp.id}</td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {emp.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{emp.email}</td>
                      <td className="py-3 px-4 text-gray-500">
                        {emp.password}
                      </td>
                      <td className="py-3 px-4 flex justify-center gap-3">
                        <button
                          onClick={() => startEdit(emp)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm shadow-md transition-all duration-200">
                          Edit
                        </button>
                        <button
                          onClick={() => deleteemployee(emp.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm shadow-md transition-all duration-200">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-8 text-gray-500 italic">
                      No employees found 😔
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ADD NEW BUTTON */}
          <div className="text-center mt-8">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200">
              Add New Employee
            </button>
          </div>
        </div>

        {/* EDIT / ADD MODAL */}
        {(editingEmp || isAdding) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                {isAdding ? "Add New Employee" : "Edit Employee"}
              </h2>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="text"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEditingEmp(null);
                    setIsAdding(false);
                    setForm({ name: "", email: "", password: "" });
                  }}
                  className="bg-gray-400 text-white px-3 py-1 rounded">
                  Cancel
                </button>
                <button
                  onClick={isAdding ? addEmployee : updateEmployee}
                  className="bg-blue-600 text-white px-3 py-1 rounded">
                  {isAdding ? "Add" : "Update"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
        <Footer />
    </div>
  );
}

export default EmployeeDashboard;
