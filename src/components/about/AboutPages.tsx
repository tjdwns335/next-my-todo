"use client";
import { getCompanyInfo } from "@/app/queryFunction";
import { aboutStyle } from "@/app/style";
import { companyInfo } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../todo/Loading";
import Error from "../todo/Error";

function AboutPages() {
  const {
    data: companyInfo,
    isLoading,
    isError,
  } = useQuery<companyInfo, Error>({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (isError)
    return (
      <>
        <Error />
      </>
    );
  return (
    <>
      {companyInfo && (
        <div className={aboutStyle.wrapStyle}>
          <div className={aboutStyle.contentStyle}>
            <h1 className={aboutStyle.titleStyle}>
              회사명 : {companyInfo.name}
            </h1>
            <p className={aboutStyle.infoStyle}>
              회사 소개 : {companyInfo.description}
            </p>
          </div>
          <div className={aboutStyle.imgWrap}>
            <img
              className={aboutStyle.imgStyle}
              src={companyInfo.image}
              alt="회사이미지"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AboutPages;
