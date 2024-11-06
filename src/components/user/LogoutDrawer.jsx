import { useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";

export default function LogoutDrawer() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Drawer>
      <DrawerTrigger className="w-full flex py-5 w-full font-bold hover:underline ">
        로그아웃
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader className="mt-4 ">
            <DrawerTitle className="text-2xl font-bold mb-4">
              로그아웃을 하시겠습니까?
            </DrawerTitle>
            <DrawerDescription>
              새로운 소식을 받을 수 없게 됩니다.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex gap-6">
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-1/2"
              >
                로그아웃
              </Button>
              <DrawerClose className="w-1/2" asChild>
                <Button>취소</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
