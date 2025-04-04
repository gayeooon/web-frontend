import { useEffect, useState } from 'react';
import { PUBLISHERS, MIN_SUBSCRIPTIONS } from '@/lib/constants';
import { ScrollArea, ScrollBar } from '@/components/ui/shadcn/scroll-area';
import { Button } from '@/components/ui/shadcn/button';
import { SpinnerIcon } from '@/components/ui/custom/Loading';
import useGetUserPublishers from '@/hooks/queries/user/useGetUserPublishers';

const PublisherSelect = ({ onNext, buttonText, buttonDisabled }) => {
  const [selectedPublishers, setselectedPublishers] = useState([]);
  const { data: userPublishers } = useGetUserPublishers();

  useEffect(() => {
    if (userPublishers) setselectedPublishers(userPublishers);
  }, [userPublishers]);

  const toggleSubscribe = (publisher) => {
    setselectedPublishers((prev) =>
      prev.includes(publisher)
        ? prev.filter((id) => id !== publisher)
        : [...prev, publisher]
    );
  };

  const isSelected = (publisher) => selectedPublishers.includes(publisher);

  return (
    <>
      {selectedPublishers.length < MIN_SUBSCRIPTIONS && (
        <h3 className="mb-2 text-xl font-bold underline underline-offset-8 decoration-1">
          {`최소 ${MIN_SUBSCRIPTIONS}개 언론사를 구독하세요.`}
        </h3>
      )}
      <ScrollArea className="min-h-[350px] mb-20">
        {PUBLISHERS.map((publisher) => (
          <div key={publisher.type}>
            <div className="sticky top-0 bg-background flex justify-between w-full p-3 rounded-md">
              <span className="block font-bold">{publisher.type}</span>
            </div>
            {publisher.list.map((it) => (
              <div key={it} className="flex justify-between w-full my-4 px-2">
                <div className="flex">
                  <span className="block mt-2 font-bold">{it}</span>
                </div>
                <button
                  className={`subs_button ${
                    isSelected(it) ? 'bg-my-purple text-white' : ''
                  }`}
                  onClick={() => toggleSubscribe(it)}
                >
                  {isSelected(it) ? '구독중' : '+ 구독'}
                </button>
              </div>
            ))}
          </div>
        ))}
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <Button
        className="absolute bottom-0"
        onClick={() => onNext(selectedPublishers)}
        disabled={
          selectedPublishers.length < MIN_SUBSCRIPTIONS || buttonDisabled
        }
      >
        {buttonDisabled ? <SpinnerIcon /> : buttonText}
      </Button>
    </>
  );
};

export default PublisherSelect;
