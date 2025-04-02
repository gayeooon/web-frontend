import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserProvider';
import { useToaster } from '@/contexts/ToasterProvider';
import BasicInformation from '@/components/user/BasicInformation';
import CategorySelect from '@/components/user/CategorySelect';
import PublisherSelect from '@/components/user/PublisherSelect';
import AccountDelete from '@/components/user/AccountDelete';
import Header from '@/components/ui/custom/Header';
import PageLayout from '@/components/ui/custom/PageLayout';

const Setting = () => {
  const router = useRouter();
  const toast = useToaster();
  const { updateUserProfile, updateUserCategories, updateUserPublishers } =
    useUser();

  const variantConfig = {
    info: { title: '회원정보 수정', fetchFunction: updateUserProfile },
    category: { title: '선호 주제 변경', fetchFunction: updateUserCategories },
    publisher: { title: '뉴스 구독 관리', fetchFunction: updateUserPublishers },
    delete: { title: '회원 탈퇴' },
  };

  const handleNext = (data) => {
    variantConfig[router.query.variant].fetchFunction.mutate(data, {
      onSuccess: () => {
        toast('info', '저장되었습니다.');
        router.push('/user');
      },
      onError: (error) => {
        console.error('Error:', error);
        toast('error', '저장 중 오류가 발생했습니다.');
      },
    });
  };

  const renderComponent = () => {
    switch (router.query.variant) {
      case 'info':
        return (
          <BasicInformation
            onNext={handleNext}
            buttonText="저장"
            buttonDisabled={updateUserProfile.isPending}
          />
        );
      case 'category':
        return (
          <CategorySelect
            onNext={handleNext}
            buttonText="저장"
            buttonDisabled={updateUserCategories.isPending}
          />
        );
      case 'publisher':
        return (
          <PublisherSelect
            onNext={handleNext}
            buttonText="저장"
            buttonDisabled={updateUserPublishers.isPending}
          />
        );
      case 'delete':
        return <AccountDelete />;
      default:
        return <></>;
    }
  };

  return (
    <PageLayout page="setting">
      <Header
        title={variantConfig[router.query.variant].title}
        handleBack={() => router.push('/user')}
      />
      <div className="flex justify-center pt-6 h-5/6">
        <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
          {renderComponent()}
        </div>
      </div>
    </PageLayout>
  );
};

export default Setting;
