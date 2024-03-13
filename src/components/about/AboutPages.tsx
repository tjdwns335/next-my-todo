"use client";
import { getCompanyInfo } from "@/app/queryFunction";
import { companyInfo } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function AboutPages() {
  const {
    data: companyInfo,
    isLoading,
    isError,
  } = useQuery<companyInfo, Error>({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  return (
    <div>
      {companyInfo && (
        <>
          <h1>{companyInfo.name}</h1>
          <p>{companyInfo.description}</p>
          <img
            src={companyInfo.image}
            alt="회사이미지"
          />
        </>
      )}
    </div>
  );
}

export default AboutPages;
