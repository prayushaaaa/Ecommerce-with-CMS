
export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex items-center justify-center size-[100%]">
                {children}
            </div>
        </>

    )
}
