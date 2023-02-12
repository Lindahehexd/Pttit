import { communityState } from "@/atoms/communitiesAtom";
import { defaultMenuItem, DirectoryMenuItem, directoryMenuState } from "@/atoms/directoryMenuAtom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";

const useDirectory = () => {
  const router = useRouter();
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);
  const communityStateValue = useRecoilValue(communityState);

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      //opposite state
      isOpen: !directoryState.isOpen,
    }));
  };

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router?.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  //重新整理後 menu欄位也要更新 方法 去抓當前看板的資訊 並把data塞進directory的state (因為目前跳頁後看板資訊已經存在)

  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    const { pathname } = router;

    try {
      if (currentCommunity) {
        setDirectoryState((prev) => ({
          ...prev,
          selectedMenuItem: {
            displayText: `r/${currentCommunity?.id}`,
            link: `r/${currentCommunity?.id}`,
            icon: FaReddit,
            iconColor: "blue.500",
            imageURL: currentCommunity?.imageURL,
          },
        }));
      } else {
        if (pathname === "/") {
          setDirectoryState((prev) => ({
            ...prev,
            selectedMenuItem: defaultMenuItem,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [communityStateValue.currentCommunity]);

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};

export default useDirectory;
