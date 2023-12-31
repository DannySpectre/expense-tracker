"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Label } from "/src/components/ui/label.jsx";
import { Input } from "/src/components/ui/input.jsx";
import { Button } from "/src/components/ui/button.jsx";
import supabase from "@/utils/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  async function signInWithEmail() {
    try {
      if (email && password) {
        const response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        const userId = response.data.user.id;
        console.log(userId);
        router.push("/dashboard");
      }
      if (response.error) throw response.error;
    } catch {}
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid max-w-sm max-h-20 mt-4 item`s-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="rounded"
          type="email"
          id="email"
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="Password">Password</Label>
        <Input
          className="rounded"
          type="password"
          id="password"
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <Button onClick={signInWithEmail}>Login</Button>
        </div>
      </div>
    </div>
  );
}
