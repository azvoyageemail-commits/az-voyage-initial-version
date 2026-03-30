import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { CustomTripRequest } from "../shared/api";
import { processCustomTrip } from "../server/lib/custom-trip";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const body =
    typeof req.body === "string"
      ? (JSON.parse(req.body) as CustomTripRequest)
      : (req.body as CustomTripRequest);

  const result = await processCustomTrip(body);
  return res.status(result.status).json(result.body);
}