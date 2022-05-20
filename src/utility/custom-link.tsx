import React from 'react'
import type { LinkProps } from 'react-router-dom'
import { useResolvedPath, useMatch, Link } from 'react-router-dom'



export default function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div className={(match ? "bg-gradient-to-tr from-light-blue-500 to-light-blue-700  text-white" : " ") + " rounded-md "}>
      <Link
        to={to} {...props} >

        {children}


      </Link>
      {match && ""}
    </div >
  );
}

