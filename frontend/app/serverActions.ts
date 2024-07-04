"use server";

import {
  AuthMidwifeLoginInput,
  AuthMidwifeOutput,
  AuthMidwifeSignUpInput,
  Midwife,
  Patient,
} from "@/lib/models";
import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function SignUp(
  signUpInput: AuthMidwifeSignUpInput
): Promise<AuthMidwifeOutput> {
  const url = `${process.env.BACKEND_URL}/api/auth/signup`;
  const res = await axios.post(url, signUpInput);
  if (res.status !== 201) {
    throw new Error(res.data.error);
  }
  cookies().set("token", res.data.token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
  });
  cookies().set("profileData", JSON.stringify(res.data.midwife as Midwife), {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
  });
  redirect("/dashboard");
  return res.data.midwife;
}

// TODO: Store token in server
export async function Login(
  loginInput: AuthMidwifeLoginInput
): Promise<string | undefined> {
  const url = `${process.env.BACKEND_URL}/api/auth/login`;
  const res = await axios.post(url, loginInput);
  if (res.status !== 200) {
    throw new Error(res.data.error);
  }
  cookies().set("token", res.data.token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
  });
  return res.data.token;
}

export async function GetProfile(token: string): Promise<Midwife> {
  const url = `${process.env.BACKEND_URL}/api/auth/profile`;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200) {
    throw new Error("Failed to fetch profile");
  }
  cookies().set("profileData", JSON.stringify(res.data.midwife as Midwife), {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
  });
  return res.data.midwife;
}

export async function getPatients(token: string): Promise<Patient[]> {
  const url = `${process.env.BACKEND_URL}/api/patients`;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200) {
    throw new Error(res.data.error);
  }
  const patients: Patient[] = await res.data.patients;
  return patients;
}