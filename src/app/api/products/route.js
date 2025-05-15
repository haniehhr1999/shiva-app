import { NextResponse } from "next/server";

const products = [
    {
      id: 1,
      title: "product 1",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
    },
    {
      id: 2,
      title: "product 2",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
    },
    {
      id: 3,
      title: "product 3",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 3200,
    },
    {
      id: 4,
      title: "product 4",
      body: "snc dsbcsnbn scbk jnsdmb cdsnb knsb ncsd sscjshjfsnjdnjsn skfbks sdbsb cscsnd l nlvnsmcnl kv ,fcnsjnfm v",
      price: 36900,
    },
  ];
export async function GET(request){
    // const {searchParams} = new URL(request.url)
    // const name = searchParams.get('name')
    // let data = {message: `this is product ${name}`}
    return NextResponse.json(products)
}