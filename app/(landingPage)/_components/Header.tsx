import Link from 'next/link'
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
      <Link href="/" className="flex items-center justify-center">
        <span className="font-bold text-2xl">ResuGen.ai</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        <LoginLink>
          <Button variant="ghost">Sign in</Button>
        </LoginLink>
        <RegisterLink>
          <Button>Sign up</Button>
        </RegisterLink>
      </nav>
    </header>
  )
}

