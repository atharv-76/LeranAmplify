'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ViewList from "@/components/ViewList";

export default function Dashboard() {
  const { data: session } = useSession();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User"); // Default value for the dropdown
  const router = useRouter();

  const openAddUserModal = () => setIsAddUserModalOpen(true);
  const closeAddUserModal = () => setIsAddUserModalOpen(false);
  const openViewAllModal = () => setIsViewAllModalOpen(true);
  const closeViewAllModal = () => setIsViewAllModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted with role:", role);

      const res = await fetch("api/addRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
        }),
      });

      if (res.ok) {
        e.target.reset();
        router.push("/");

        toast.success('User Added Successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } else {
        toast.error('User Addition Failed', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("User registration by Admin failed.");
      }
    } catch (error) {
      console.log(error);
    }
    closeAddUserModal();
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="p-4">
          <img
            src="data:image/png;base64,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"
            alt="admin default profile"
            className="w-12 border border-gray-400 rounded-full"
          />
        </div>

        <div className="flex flex-col mt-4">
          <span className="font-bold font-gray-300">{session?.user?.name}</span>
          <span className="font-bold">{session?.user?.email}</span>
        </div>

        <div className="flex flex-wrap gap-4 ml-auto pr-4 pt-4">
          <button
            className="border border-gray-200 w-28 h-12 bg-gray-200 hover:bg-gray-100"
            onClick={openAddUserModal}
          >
            Add User
          </button>
          <button
            className="border border-gray-200 w-28 h-12 bg-gray-200 hover:bg-gray-100"
            onClick={openViewAllModal}
          >
            View all
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              onClick={closeAddUserModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="User">User</option>
                  <option value="Instructor">Instructor</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeAddUserModal}
                  className="px-4 py-2 mr-2 text-sm text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View All Modal */}
      {isViewAllModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-4/5 p-6 relative">
            <button
              onClick={closeViewAllModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">View All</h2>
            <ViewList />
          </div>
        </div>
      )}
    </>
  );
}
