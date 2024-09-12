import Link from "next/link"

import { buttonVariants } from "@/components/ui/button";

export default function Component() {

  return (
    <div>
      <p class="text-3xl">Your information has been submitted successfully!</p>
      <div>
      <Link href="/" className={buttonVariants({ variant: "secondary" })}>Submit another</Link>
      </div>
    </div>
  )
}