"use client"

import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [count , setCount] = useState()

  return (
    <div>
      <Link href={'/home'}>Home</Link>
      <br />
      hello
    </div>
  );


}
