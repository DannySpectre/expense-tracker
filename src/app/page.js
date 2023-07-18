"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "/src/images/logo.png";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center mt-4">
        <Image src={logo} width={100} height={100} alt="Brand Logo" />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          FinCal
        </h1>
      </div>
      <div className="flex justify-center items-center mt-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Achieve your financial goals
        </h3>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Link href="/signup" className="bg-black rounded text-white py-1 px-3">
          Sign Up
        </Link>
        <Link href="/login" className="bg-black rounded text-white py-1 px-3">
          Login
        </Link>
      </div>
    </div>
  );
}
