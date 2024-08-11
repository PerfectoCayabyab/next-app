"use client";

import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import Image from "next/image";
import superman from "@/public/images/superman.jpg";
import HeavyComponent from "./components/HeavyComponent";
import { useState } from "react";


export default function Home() {
  return (
    <main className="relative h-screen">
      <h1>Hello World</h1>
      <button
        onClick={async () => {
          const _ = (await import("lodash")).default;
          const users = [{ name: "c" }, { name: "b" }, { name: "a" }];
          const sorted = _.orderBy(users, ["name"]);
          console.log(sorted);
        }}
      >
        Show
      </button>
    </main>
  );
}
