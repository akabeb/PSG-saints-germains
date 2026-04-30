import { type SchemaTypeDefinition } from "sanity";

import { dish } from "./dish";
import { menuCategory } from "./menuCategory";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, menuCategory, dish];
