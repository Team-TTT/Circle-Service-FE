import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import ServiceLayOut from "../layout/ServiceLayOut";
import HomePage from "../pages/Homepage";
import ChannelPage from "../pages/ChannelPage";
import ErrorPage from "../pages/ErrorPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/projects/:projectId" replace />}
      />
      <Route path="projects/:projectId" element={<ServiceLayOut />}>
        <Route index element={<HomePage />} />
        <Route path="channels/:channelId" element={<ChannelPage />} />
      </Route>
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}
