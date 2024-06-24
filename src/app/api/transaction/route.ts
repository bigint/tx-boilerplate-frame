import { NextRequest, NextResponse } from "next/server";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const { searchParams } = new URL(req.url);
  const network = Number(searchParams.get("network"));

  const txData: FrameTransactionResponse = {
    chainId: `eip155:${network}`,
    method: "eth_sendTransaction",
    params: {
      abi: [],
      to: "0x03Ba34f6Ea1496fa316873CF8350A3f7eaD317EF",
      value: "1111111",
    },
  };
  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
