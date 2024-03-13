import { companyInfo } from "../types";

export const getCompanyInfo = async (): Promise<companyInfo> => {
  const response = await fetch("http://localhost:4000/companyInfo");
  const companyInfo: companyInfo = await response.json();
  return companyInfo;
};
