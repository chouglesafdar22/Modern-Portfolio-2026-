import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

export default async function AdminDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-[#121212] text-[#F2F3FF]">
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#121212] md:block">
                    <div className="sticky top-0 flex h-screen flex-col p-5">
                        {/* Logo */}
                        <div className="mb-8">
                            <Link
                                href="/admin/dashboard"
                                className="text-xl merriweather-semibold tracking-tight"
                            >
                                Safdar Chougle
                            </Link>

                            <p className="mt-1 merriweather-regular text-xs text-[#F2F3FF]/40">
                                Portfolio CMS
                            </p>
                        </div>

                        {/* Navigation */}
                        <nav className="space-y-1">
                            <Link
                                href="/admin/dashboard"
                                className="block rounded-lg merriweather-medium px-3 py-2.5 text-sm text-[#F2F3FF]/70 transition hover:bg-white/5 hover:text-[#F2F3FF]"
                            >
                                Overview
                            </Link>

                            <Link
                                href="/admin/dashboard/blogs"
                                className="block rounded-lg merriweather-medium px-3 py-2.5 text-sm text-[#F2F3FF]/70 transition hover:bg-white/5 hover:text-[#F2F3FF]"
                            >
                                Blog
                            </Link>

                            <Link
                                href="/admin/dashboard/comments"
                                className="block rounded-lg merriweather-medium px-3 py-2.5 text-sm text-[#F2F3FF]/70 transition hover:bg-white/5 hover:text-[#F2F3FF]"
                            >
                                Comment
                            </Link>

                            {/* <div className="mt-6 mb-2 merriweather-regular px-3 text-[11px] font-medium uppercase tracking-wider text-[#F2F3FF]/30">
                                Coming Soon
                            </div>

                            <div className="space-y-1 merriweather-regular">
                                <span className="block cursor-not-allowed rounded-lg px-3 py-2.5 text-sm text-[#F2F3FF]/25">
                                    Projects
                                </span>

                                <span className="block cursor-not-allowed rounded-lg px-3 py-2.5 text-sm text-[#F2F3FF]/25">
                                    Services
                                </span>

                                <span className="block cursor-not-allowed rounded-lg px-3 py-2.5 text-sm text-[#F2F3FF]/25">
                                    Experience
                                </span>

                                <span className="block cursor-not-allowed rounded-lg px-3 py-2.5 text-sm text-[#F2F3FF]/25">
                                    Skills
                                </span>
                            </div> */}
                        </nav>

                        {/* Bottom */}
                        {/* <div className="mt-auto border-t border-white/10 pt-4">
                            <p className="px-3 text-xs merriweather-medium text-[#F2F3FF]/40">
                                Admin Panel
                            </p>
                        </div> */}
                    </div>
                </aside>

                {/* Main */}
                <main className="min-w-0 flex-1">
                    {/* Mobile header */}
                    <header className="border-b border-white/10 px-5 py-4 md:hidden">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm merriweather-semibold">
                                    Safdar Chougle
                                </p>

                                <p className="text-xs text-[#F2F3FF]/40 merriweather-regular">
                                    Portfolio CMS
                                </p>
                            </div>

                            <Link
                                href="/admin/dashboard"
                                className="text-sm text-indigo-400 merriweather-regular"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </header>

                    <div className="p-5 sm:p-8 lg:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}