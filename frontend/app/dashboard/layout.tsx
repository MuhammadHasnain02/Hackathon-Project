
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <h1>sidebar</h1>
        {children}
    </div>
  );
}
