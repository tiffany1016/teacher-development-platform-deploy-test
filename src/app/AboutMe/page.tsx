import { ADMIN, INDIGO } from "@/lib/constants";
import { MdPerson } from "react-icons/md";
import UserAvatar from "../_components/UserAvatar";
import { auth } from "@/lib/auth";
import ChangePasswordDialog from "./_components/ChangePasswordDialog";
import AboutAdminInfo from "./_components/AboutAdminInfo";
import AboutMeInfo from "./_components/AboutMeInfo";
export default async function AboutMe(){
  const session = await auth();
  return(
    <div className="grid h-full p-16">
      <a className="mt-4 mb-8 inline-flex items-center text-sm font-medium font-semibold gap-1 text-gray-700 hover:opacity-80">
        {">"}<MdPerson />關於我
      </a>
      <div className="flex gap-4">
        <div className="w-1/4 flex flex-col gap-2 items-center">
          <UserAvatar size={200} userEmail={session?.user?.email ?? ""} />
          <div className="text-xl font-bold">
            {session?.user?.username}
          </div>
          <a href="/auth/signout"
            className="justify-self-center px-8 py-1 text-white text-sm rounded-full hover:opacity-80"
            style={{backgroundColor: INDIGO}}
          >
            登出
          </a>
          { session?.user?.authority === ADMIN && <ChangePasswordDialog /> }
        </div>
        { session?.user?.authority === ADMIN ? <AboutAdminInfo /> : <AboutMeInfo /> }
      </div>
    </div>
  );
}