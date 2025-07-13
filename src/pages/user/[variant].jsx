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
import useUserData from '@/hooks/useUserData';
import { SETTING_TITLES, SETTING_VARIANTS } from '@/lib/constants';
import { PageSpinner } from '@/components/ui/custom/Loading';

const Setting = () => {
  const router = useRouter();
  const toast = useToaster();

  const { mutate: putUserInfo, isPending: isPendingInfo } = usePutUserInfo();
  const { mutate: putUserCategories, isPending: isPendingCategories } =
    usePutUserCategories();
  const { mutate: putUserPublishers, isPending: isPendingPublishers } =
    usePutUserPublishers();
  const { userData, isLoading, isError } = useUserData({ page: 'setting' });

  const variant = router.query.variant;

  if (
    isError ||
    !variant ||
    typeof variant !== 'string' ||
    !SETTING_VARIANTS.includes(variant)
  ) {
    toast('error', '오류가 발생했습니다.');
    router.push('/user');
    return null;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  const handleSubmit = (mutateFunction, data) => {
    mutateFunction(data, {
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

  return (
    <PageLayout page="setting">
      <Header
        title={SETTING_TITLES[variant]}
        onClickBack={() => router.push('/user')}
      />
      <div className="flex justify-center pt-6 h-5/6">
        <div className="flex flex-col relative gap-6 w-10/12 max-w-2xl h-full">
          {variant === 'info' && (
            <BasicInformation
              memberInfo={userData.memberInfo}
              onSubmit={(data) => handleSubmit(putUserInfo, data)}
              buttonText="저장"
              isLoading={isPendingInfo}
            />
          )}

          {variant === 'category' && (
            <CategorySelect
              userCategories={userData.categories}
              onSubmit={(data) => handleSubmit(putUserCategories, data)}
              buttonText="저장"
              isLoading={isPendingCategories}
            />
          )}

          {variant === 'publisher' && (
            <PublisherSelect
              userPublishers={userData.publishers}
              onSubmit={(data) => handleSubmit(putUserPublishers, data)}
              buttonText="저장"
              isLoading={isPendingPublishers}
            />
          )}

          {variant === 'delete' && <AccountDelete />}
        </div>
      </div>
    </PageLayout>
  );
};

export default Setting;
