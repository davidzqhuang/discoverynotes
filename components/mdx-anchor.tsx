"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function absolute(pathname: string, href: string) {
    if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("/")
    ) {
        return href;
    }

    let stack = pathname.split("/");
    const parts = href.split("/");
    stack.pop();

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == ".") continue;
        if (parts[i] == "..") stack.pop();
        else stack.push(parts[i]);
    }

    // see if "notes" in stack
    const notesIndex = stack.indexOf("notes");
    if (notesIndex > -1) {
        stack = stack.filter((item, index) => item !== "notes" || index === notesIndex);
    }

    return stack.join("/");
}

export default function Anchor({
    href,
    children,
}: any) {
    const pathname = usePathname();
    return href !== undefined ? (
        <Link className="text-blue-500 hover:underline" href={absolute(pathname, href)} target="_blank" rel="noopener noreferrer">{children}</Link>
    ) : null;
}