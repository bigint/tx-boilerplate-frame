import { networkToggle } from "@/utils/networkToggle";
import { ImageResponse } from "next/og";

// The dynamically generated frame image
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const network = Number(searchParams.get("network"));
    const transaction = Boolean(searchParams.get("transaction"));
    const networkIndex = networkToggle.findIndex(
      (mapping) => mapping.chainId === network
    );
    console.log(`Rendering OG with network ${network}`);

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>
                  {transaction
                    ? "Transaction Successful!"
                    : "Try Open Frames Transactions"}
                </span>
                <span>
                  Selected Network: {networkToggle[networkIndex]?.network}
                </span>
              </h2>
            </div>
          </div>
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
