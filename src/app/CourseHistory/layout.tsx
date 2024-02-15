import Header from "@/components/Header";
type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Header username={"Susan"}/>
      <div className="w-full h-full">
        {children}
      </div>
    </>
  );
}

export default Layout;