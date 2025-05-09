import { useRouter } from 'next/router';
import { useToaster } from '@/contexts/ToasterProvider';
import BasicInformation from '@/components/user/BasicInformation';
import CategorySelect from '@/components/user/CategorySelect';
import PublisherSelect from '@/components/user/PublisherSelect';
import AccountDelete from '@/components/user/AccountDelete';
import Header from '@/components/ui/custom/Header';
import PageLayout from '@/components/ui/custom/PageLayout';
import usePutUserInfo from '@/hooks/queries/user/usePutUserInfo';
import usePutUserCategories from '@/hooks/queries/user/usePutUserCategories';
import usePutUserPublishers from '@/hooks/queries/user/usePutUserPublishers';

const Setting = () => {
  const router = useRouter();
  const toast = useToaster();

  const { mutate: putUserInfo, isPending: isPendingInfo } = usePutUserInfo();
  const { mutate: putUserCategories, isPending: isPendingCategories } =
    usePutUserCategories();
  const { mutate: putUserPublishers, isPending: isPendingPublishers } =
    usePutUserPublishers();

  const variantConfig = {
    info: { title: '회원정보 수정', fetchFunction: putUserInfo },
    category: { title: '선호 주제 변경', fetchFunction: putUserCategories },
    publisher: { title: '뉴스 구독 관리', fetchFunction: putUserPublishers },
    delete: { title: '회원 탈퇴' },
  };

  const handleNext = (data) => {
    variantConfig[router.query.variant].fetchFunction(data, {
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
            buttonDisabled={isPendingInfo}
          />
        );
      case 'category':
        return (
          <CategorySelect
            onNext={handleNext}
            buttonText="저장"
            buttonDisabled={isPendingCategories}
          />
        );
      case 'publisher':
        return (
          <PublisherSelect
            onNext={handleNext}
            buttonText="저장"
            buttonDisabled={isPendingPublishers}
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
