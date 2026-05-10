declare module "pdf-parse" {
  interface PDFResult {
    text: string;
    info?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
    version?: string;
    numpages?: number;
  }

  function pdfParse(data: Buffer | Uint8Array): Promise<PDFResult>;
  export = pdfParse;
}
