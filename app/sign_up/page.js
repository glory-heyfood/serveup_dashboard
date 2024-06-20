"use client";
import AuthBtn from "@/components/Auth/AuthBtn";

import Input from "@/components/Input";
import { ID } from "@/data";
import { signupAsync } from "@/redux/features/business/businessSlice";
import { verifyEmployeeUrlAsync } from "@/redux/features/business/employeeSlice";
import { isPasswordStrong } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmail from "validator/lib/isEmail";

const Page = () => {
  const [email, setEmail] = useState("");
  const [ismail, setIsmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [number, setNumber] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [check, setCheck] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const businessLoading = useSelector((state) => state.business.loading);
  const employeeLoading = useSelector((state) => state.employee.loading);

  // Find a way to reqrite this, it isnt good here

  // this only works when you have a query
  const otp = searchParams.get("otp");
  const employeeId = searchParams.get("employeeId");
  const userEmail = searchParams.get("email");

  const btnLoading = userEmail ? employeeLoading : businessLoading;

  const handleClick = async () => {
    const data = {
      email: email,
      password: password,
      phone_number: number,
    };

    dispatch(signupAsync(data))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.data?.error === false) {
          router.push("/sign_up/verify-email");
        }
      });
  };

  // this is the function that is called when an employee tries to login
  const handleVerifyClick = async () => {
    const data = {
      email: userEmail,
      password: password,
      phone_number: number,
      employee_id: employeeId,
    };

    console.log(data);

    dispatch(verifyEmployeeUrlAsync(data))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.data?.error === false) {
          router.push(`/${ID}/`);
        }
      });
  };

  useEffect(() => {
    if (userEmail !== null) {
      setEmail(userEmail);
    }
  }, []);

  useEffect(() => {
    if (
      email.trim() === "" ||
      number.trim() === "" ||
      password === "" ||
      check === false
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, number, password, check]);
  return (
    <div className="flex">
      <div
        className="w-[50%] lg:w-[60%] h-screen hidden sm:block "
        style={{
          backgroundImage: 'url("/images/sign-in-frame.png")',
          backgroundSize: "cover",
          backgroundPosition: "cover",
        }}
      ></div>
      <div className="flex flex-col px-[1em] pt-[3em] lg:px-[3em] md:pt-[5em] space-y-[3.2em] w-full md:w-[50%] lg:w-[40%]">
        <Image
          src="/images/sign-in-logo.svg"
          width={120}
          height={24}
          alt="logo"
        />

        <div className="flex flex-col space-y-[1.5em] w-full">
          <div className="flex flex-col space-y-[1em]">
            <h1 className="sodo600 tracking-[-0.96px]">
              Let’s create your account
            </h1>
            <h4 className="tracking-[-0.28px] text-[0.875em] sodo400 ">
              Already have a Serveup account?
              <Link href="/" className="text-[#072A85] sodo600">
                {" "}
                Sign in
              </Link>{" "}
            </h4>
          </div>

          <div className="flex flex-col space-y-[1em]">
            <Input
              text="Enter your email"
              type="email"
              err={
                ismail === false && email.trim() !== ""
                  ? "Please input a valid email address"
                  : ""
              }
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={(e) => {
                console.log(isEmail(e.target.value));
                setIsmail(isEmail(e.target.value));
              }}
              value={userEmail && userEmail}
            />
            <Input
              text="Enter your phone number"
              onChange={(e) => setNumber(e.target.value)}
              onBlur={(e) => {}}
            />
            <Input
              text="Create your password"
              type="password"
              err={
                !isPassword &&
                password.trim() !== "" &&
                "Password must have at least 8 characters"
              }
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={(e) => {
                console.log(password);
                setIsPassword(isPasswordStrong(password));
                console.log(isPasswordStrong(password));
              }}
            />
          </div>

          <div className="flex space-x-[1em] items-center !mt-[2em]">
            <input
              type="checkbox"
              className="h-[16px] w-[16px]"
              onChange={(e) => {
                setCheck(e.target.checked);
                console.log(e.target.checked);
              }}
            />
            <p className="text-[0.82em] sodo400 tracking-[-0.52px]  ">
              I agree to Serveup’s{" "}
              <Link href="" className="text-[#072A85] sodo600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="" className="text-[#072A85] sodo600">
                Privacy Policy
              </Link>
            </p>
          </div>

          <div className="w-full !mt-[2em]">
            <AuthBtn
              disabled={disabled}
              loading={btnLoading}
              text="Continue"
              padding="16px 32px"
              handleClick={userEmail !== null ? handleVerifyClick : handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
