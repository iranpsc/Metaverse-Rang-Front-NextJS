declare module "html-truncate" {
  const htmlTruncate: (html: string, length: number, options?: {ellipsis?: string}) => string;
  export default htmlTruncate;
}
