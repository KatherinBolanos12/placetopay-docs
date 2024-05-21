import { makePage } from "@keystatic/next/ui/app";
import config from "../../../keystatic.config.mjs";

const Page = makePage(config);

Page.withoutMdx = true;

export default Page;
