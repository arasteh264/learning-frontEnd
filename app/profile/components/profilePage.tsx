"use client";
import React, { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import ProfileInfo from "./userInformation";

function ProfilePage() {
  return (
    <section className="w-full justify-center items-center flex-col flex">
      <ProfileInfo />
    </section>
  );
}

export default ProfilePage;
