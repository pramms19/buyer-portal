"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    setLoading(false);

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-14 flex justify-center items-center">
      <Card className="bg-white max-w-sm md:max-w-md min-w-xs md:min-w-sm shadow-sm py-6">
        <CardTitle className="text-xl md:text-2xl font-semibold text-secondary-foreground text-center">
          Login
        </CardTitle>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <Input
                  placeholder="Email"
                  required
                  className="border rounded-sm text-xs md:text-sm"
                />
              </Field>

              <Field>
                <Input
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
                  {loading ? "Loading..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
