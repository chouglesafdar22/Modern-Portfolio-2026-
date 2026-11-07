import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

export default async function AdminDashboardPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <main className="min-h-screen bg-[#121212] px-5 py-10 text-[#F2F3FF]">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-semibold">
                    Admin Dashboard
                </h1>

                <p className="mt-2 text-[#F2F3FF]/60">
                    Welcome to your portfolio CMS.
                </p>
            </div>
        </main>
    );
}