"use client";
import AuthBtn from "@/components/Auth/AuthBtn";
import Input from "@/components/Input";
import { getBusinessById } from "@/redux/features/business/businessSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  // const btnLoader =
  const handleClick = () => {
    setLoader(true);
    console.log("clicked");
    dispatch(getBusinessById(1))
      .unwrap()
      .then((res) => {
        if (res) {
          console.log(res);
          window.localStorage.setItem(
            "serveup_business",
            JSON.stringify(res.data[0])
          );
          router.push("/business/1");
          setLoader(false);
        }
      });
  };

  useEffect(() => {
    if (email.trim() === "" || password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, password]);

  return (
    <div className="flex">
      <div
        className="md:w-[50%] lg:w-[60%]  h-screen hidden md:block"
        style={{
          backgroundImage: 'url("/images/sign-in-frame.png")',
          backgroundSize: "cover",
          backgroundPosition: "cover",
        }}
      ></div>
      <div className="flex flex-col px-[1em] lg:px-[3em] pt-[3em] md:pt-[5em] space-y-[3em] md:space-y-[6.2em] w-full md:w-[50%] lg:w-[40%]">
        <Image
          src="/images/sign-in-logo.svg"
          width={120}
          height={24}
          alt="logo"
        />

        <div className="flex flex-col space-y-[1.5em] w-full">
          <div className="flex flex-col space-y-[1em]">
            <h1 className="sodo600 font-[900] tracking-[-0.96px] leading-normal text-[24px] ">
              Sign in
            </h1>
            <h4 className="tracking-[-0.28px] sodo400  text-[0.875em]">
              New to Serveup?{" "}
              <Link href="/sign_up" className="text-[#072A85] sodo600">
                Sign up
              </Link>{" "}
            </h4>
          </div>

          <div className="flex flex-col space-y-[1em]">
            <Input
              text="Email address/phone number"
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(e.target.length);
              }}
            />
            <Input
              text="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-fit">
            <AuthBtn
              text="Sign in"
              loading={loader}
              padding="1.1em 2.5em"
              handleClick={handleClick}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
