import { NextApiRequest } from "next";
import { Session } from "@clerk/nextjs/api";

export type RequestWithSession = NextApiRequest & { session: Session };
