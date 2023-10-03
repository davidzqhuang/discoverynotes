import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

const components = {
  Image,
  h1: (props: any) => <h1 className="mt-6 mb-4 text-4xl font-bold" {...props} />,
  h2: (props: any) => <h2 className="mt-2 mb-2 text-3xl font-bold" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-bold" {...props} />,
  h5: (props: any) => <h5 className="text-lg font-bold" {...props} />,
  h6: (props: any) => <h6 className="text-md font-bold" {...props} />,
  a: (props: any) => <a className="text-blue-500 hover:underline" {...props} />,
  p: (props: any) => <p className="text-md mt-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside" {...props} />,
  li: (props: any) => <li className="text-md mt-2" {...props} />,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
