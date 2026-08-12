import { defineMcp } from "@lovable.dev/mcp-js";
import listServices from "./tools/list-services";
import listPackages from "./tools/list-packages";
import listAiTools from "./tools/list-ai-tools";
import listNews from "./tools/list-news";

export default defineMcp({
  name: "abukayan-platform-mcp",
  title: "منصة ابوكيان الرقمية MCP",
  version: "0.1.0",
  instructions:
    "Public catalog of منصة ابوكيان الرقمية (Abukayan Digital Platform): marketing/advertising services, promotional packages, curated AI tools, and news ticker announcements. Use these read-only tools to answer questions about what the platform offers.",
  tools: [listServices, listPackages, listAiTools, listNews],
});