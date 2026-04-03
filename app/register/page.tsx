"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Account created! Please login.");
      window.location.href = "/login";
    } else {
      const data = await res.json();
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-20 flex justify-center items-center">
      <Card className="bg-white max-w-sm md:max-w-md min-w-xs md:min-w-sm shadow-sm py-6">
        <CardTitle className="text-xl md:text-2xl font-semibold text-secondary-foreground text-center">
          Create Account
        </CardTitle>
        <CardContent>
          <form onSubmit={handleRegister}>
            <FieldGroup>
              <Field>
                <Input
                  name="email"
                  placeholder="Email"
                  required
                  className="border rounded-sm text-xs md:text-sm"
                />
              </Field>

              <Field>
                <Input
                  name="name"
                  placeholder="Name"
                  required
                  className="border rounded-sm text-xs md:text-sm"
                />
              </Field>

              <Field>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="text-xs md:text-sm"
                />
              </Field>

              <Field orientation="horizontal">
                <Button
                  type="submit"
                  className="w-full rounded-full bg-primary text-xs md:text-sm lg:text-base font-medium text-white hover:bg-secondary-foreground"
                >
                  {loading ? "Creating..." : "Register"}
                </Button>
              </Field>
              <div className="flex gap-1 justify-center text-xs md:text-sm">
                <p className="text-neutral-400">Already have an account? </p>{" "}
                <Link href="/login">
                  <p className="text-secondary-foreground font-medium">Login</p>
                </Link>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
