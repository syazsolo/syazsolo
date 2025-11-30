export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pb-16">{children}</div>;
}
