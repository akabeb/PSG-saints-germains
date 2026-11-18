import { type SchemaTypeDefinition } from "sanity";

import { menuCategory } from "./menuCategory";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, menuCategory];
