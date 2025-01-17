"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from '@/components/ui/Modal'

export default function RegisterPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <>
      <h1 className="mt-10 text-2xl font-bold text-blue-950 tracking-wide">
        Register | Login
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant="outline"
          className="mt-10 bg-gray-300 border-blue-950"
          onClick={openRegisterModal}
        >
          Register
        </Button>
        <Button
          variant="outline"
          className="mt-10 bg-gray-300 border-blue-950"
          onClick={openLoginModal}
        >
          Login
        </Button>
      </div>

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <Modal onClose={closeRegisterModal} title="Register">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-left ml-1 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-left ml-1 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-left ml-1 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-left ml-1 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
              Register
            </Button>
          </form>
        </Modal>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <Modal onClose={closeLoginModal} title="Login">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-left ml-1 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-left ml-1 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
              Login
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
}

