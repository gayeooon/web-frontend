import SettingsHeader from "./SettingsHeader";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const AccountDelete = () => {
  const handleDelete = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="h-screen min-h-[800px]">
      <SettingsHeader title="회원 탈퇴" />
      <div className="flex justify-center pt-6 h-5/6">
        <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
          <h2 className="text-3xl font-extrabold mt-7">회원 탈퇴시 주의사항</h2>
          <ul>
            <li>
              <span>회원 탈퇴는 취소할 수 없습니다.</span>
            </li>
            <li>
              <span>회원 탈퇴는 취소할 수 없습니다.</span>
            </li>
          </ul>
          <Drawer>
            <DrawerTrigger>
              <Button variant="destructive" className="absolute bottom-0">
                회원 탈퇴
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-xl">
                <DrawerHeader className="mt-4 ">
                  <DrawerTitle className="text-2xl font-bold mb-4">
                    회원 탈퇴를 하시겠습니까?
                  </DrawerTitle>
                  <DrawerDescription className="text-bt-cancel font-bold">
                    이 작업은 취소할 수 없습니다.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <div className="flex gap-6">
                    <Button
                      onClick={handleDelete}
                      variant="destructive"
                      className="w-1/2"
                    >
                      회원 탈퇴
                    </Button>
                    <DrawerClose className="w-1/2">
                      <Button>취소</Button>
                    </DrawerClose>
                  </div>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default AccountDelete;
