import { BottomNavigation } from "@/components/BottomNavigation";
import { Header } from "@/components/Header";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header 
        title={"Pay Pi"} 
        showBackButton={false}
        rightContent={true}
      />
        {children}
      <BottomNavigation />
    </div>
  );
}
