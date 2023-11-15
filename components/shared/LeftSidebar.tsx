"use client";

import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 padding-x">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname == link.route;

          if (link.route === "/profile") {
            link.route = `${link.route}/${userId}`;
          }

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${isActive && "bg-primary-500"} leftsidebar_link`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="margin-top-1 padding-x-6"></div>
      <SignedIn>
        <SignOutButton signOutCallback={() => router.push("/")}>
          <div className="flex cursor-pointer gap-4 p-4">
            <Image
              src={"/assets/logout.svg"}
              alt="logout"
              width={24}
              height={24}
            />
            <div className="text-light-2 max-lg:hidden">Logout</div>
          </div>
        </SignOutButton>
      </SignedIn>
    </section>
  );
}

export default LeftSidebar;
