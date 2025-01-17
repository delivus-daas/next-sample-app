import Image from 'next/image'

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("auth layout");
    return (
        <div className="flex flex-col items-center h-screen p-6">
            <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <div className={"max-w-[375px] gap-[3px] w-full h-full"}>
                {children}
            </div>
        </div>
    );
}
