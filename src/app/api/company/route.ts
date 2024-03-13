export type companyInfoType = {
  name: string;
  desctiption: string;
  image: string;
};
export async function GET(request: Request) {
  const response = await fetch("http://localhost:4000/companyInfo");
  const companyInfo = response.json();

  if (!companyInfo) {
    return new Response("CompanyInfo is Not Found", {
      status: 404,
    });
  }
  return Response.json({
    companyInfo,
  });
}
