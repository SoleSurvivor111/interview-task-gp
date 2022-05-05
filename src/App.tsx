import * as React from "react";
import { VerticalTabs } from "components/VerticalTabs";
import { Routes, Route, Navigate } from "react-router-dom";
import { UsersPage } from "pages/users";
import { PostsPage } from "pages/posts";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import { UserPage } from "pages/user";
import { PostPage } from "pages/post";

function App() {
  return (
    <div className="App">
      <VerticalTabs />
      <div className="page">
        <Routes>
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="*" element="404" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
