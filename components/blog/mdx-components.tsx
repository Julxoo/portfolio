import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CodeBlock } from "@/components/blog/code-block";

export const MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 mt-8 first:mt-0"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl sm:text-2xl font-semibold mb-4 mt-8 border-b border-primary pb-2"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg sm:text-xl font-semibold mb-3 mt-6"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-muted-foreground text-xs sm:text-sm" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground text-xs sm:text-sm" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-muted-foreground text-xs sm:text-sm" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <Alert className="my-6 border-l-4 border-l-primary">
      <AlertDescription className="text-sm italic">
        {props.children}
      </AlertDescription>
    </Alert>
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code
    if (!className) {
      return (
        <code
          className="relative rounded bg-primary/5 px-[0.4em] py-[0.2em] font-mono text-xs sm:text-sm border border-primary/20"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Code block (handled by pre)
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>
      {children}
    </CodeBlock>
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <Table>{props.children}</Table>
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableHeader>{props.children}</TableHeader>
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <TableBody>{props.children}</TableBody>
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => {
    const isHeader = props.children &&
      React.Children.toArray(props.children).some((child: unknown) => (child as React.ReactElement)?.type === 'th');

    if (isHeader) {
      return (
        <TableRow className="border-b-2 border-border hover:bg-transparent">
          {props.children}
        </TableRow>
      );
    }

    return <TableRow {...props} />;
  },
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <TableHead className="font-semibold text-foreground">{props.children}</TableHead>
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <TableCell className="text-muted-foreground text-xs sm:text-sm">{props.children}</TableCell>
  ),
  hr: () => <Separator className="my-8" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-foreground underline hover:text-muted-foreground transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};
