import type { JsonObject } from '@/types/json-ld'

interface JsonLdProps {
  jsonLd: JsonObject
}

export default function JsonLd({ jsonLd }: JsonLdProps) {
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ 
        __html: JSON.stringify(jsonLd) 
      }} 
    />
  )
}