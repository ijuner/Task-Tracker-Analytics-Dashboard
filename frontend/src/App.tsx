
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { useAuth } from "./context/AuthContext";    
import ProtectedRoute from "./components/ProtectedRoute";
import Stats from "./pages/Stats";

<Routes>
  <Route path="/login" element={<Login />} />
  {/* <Route path="/register" element={<Register />} /> */}
  <Route
    path="/tasks"
    element={
      <ProtectedRoute>
        <Tasks />
      </ProtectedRoute>
    }
  />

  <Route
    path="/stats"
    element={
      <ProtectedRoute>
        <Stats />
      </ProtectedRoute>
    }
  />


  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>