import { generateJsonLd, serializeJsonLd } from "./registry";
import type { JsonLdSchemaId, JsonLdValues } from "./registry";

type JsonLdScriptProps = {
  schemaId: JsonLdSchemaId;
  values: JsonLdValues;
};

export default function JsonLdScript({ schemaId, values }: JsonLdScriptProps) {
  const schema = generateJsonLd(schemaId, values);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
}
