"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { UseFormReturn } from "react-hook-form";

import { GetProfile, Login } from "@/app/serverActions";

import useAuthContext from "@/hooks/useAuthContext";
import { Midwife } from "@/lib/models";
import z from "zod";
import { LoginSchema } from "@/lib/zodSchema";
import { useRouter } from "next/navigation";

const LoginForm = ({
  form,
  setAuthType,
}: {
  form: UseFormReturn<
    {
      email: string;
      password: string;
    },
    any,
    undefined
  >;
  setAuthType: React.Dispatch<React.SetStateAction<"signUp" | "login">>;
}) => {
  const { login } = useAuthContext();
  const router = useRouter();

  const handleLoginSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      // Login user
      const token = await Login({
        email: data.email,
        password: data.password,
      });
      if (!token) {
        throw new Error("Failed to login");
      }
      // Get use info and store in context
      const midwifeData = await GetProfile(token);
      if (!midwifeData) {
        throw new Error("Failed to get user data");
      }
      midwifeData.token = token;
      login(midwifeData);
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        action="#"
        onSubmit={form.handleSubmit(handleLoginSubmit)}
        className="space-y-8"
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>
              Enter your information to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState, formState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          type="email"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState, formState }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with GitHub
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="#"
                className="underline"
                onClick={() => setAuthType("signUp")}
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default LoginForm;
