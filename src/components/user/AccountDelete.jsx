import useDeleteUser from '@/hooks/queries/auth/useDeleteUser';
import { Button } from '@/components/ui/shadcn/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/shadcn/drawer';

const AccountDelete = () => {
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = () => {
    deleteUser();
    window.location.replace('/login');
  };
  return (
    <>
      <h2 className="text-3xl font-extrabold mt-7">회원 탈퇴시 주의사항</h2>
      <ul className="flex flex-col gap-4 font-bold ">
        <li>
          <span>
            그동안 설정하신 관심 키워드와 뉴스 구독 설정이 모두 삭제됩니다.
          </span>
        </li>
        <li>
          <span>
            탈퇴 후에는 맞춤형 뉴스 추천 서비스를 더 이상 이용할 수 없습니다.
          </span>
        </li>
      </ul>
      <Drawer>
        <DrawerTrigger asChild>
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
                <DrawerClose className="w-1/2" asChild>
                  <Button>취소</Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AccountDelete;
