import { Post } from "@/atoms/postAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { Flex, Icon, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { it } from "node:test";
import React, { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import ImageUpload from "./PostForm/ImageUpload";
import TextInput from "./PostForm/TextInput";
import TabItems from "./TabItems";

type NewPostFormProps = {
  user: User;
  //   add on p6 2259
  communityImageURL?: string;
};

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const formTab = [
  {
    title: "文章",
    icon: IoDocumentText,
  },
  {
    title: "圖片",
    icon: IoImageOutline,
  },
];

const NewPostForm = ({ user, communityImageURL }: NewPostFormProps) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [selectedTab, setSelectedTab] = useState(formTab[0].title);
  const [textInputs, setTextInput] = useState({
    title: "",
    body: "",
  });

  //could be name of the string or the source of the img
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    // const newPost: Post = {}

    const { communityId } = router.query;
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      //! telling the compiler that the user is valid
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComment: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      //   add on p6 2229
      communityImageURL: communityImageURL || "",
    };

    try {
      setLoading(true);
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }

      //redireact to the homepage and see the post .  4 21256

      router.push(`/r/${communityId}`);
    } catch (error: any) {
      console.log("this is error", error.message);
      setError(true);
    }
    setLoading(false);
  };

  const onSelectImadge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    //add ? to aviod the undefined array
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = event;
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Flex direction="column" bg="gray.800" borderRadius={4} mt={2}>
        <Flex w="100%">
          {formTab.map((item) => (
            <>
              <TabItems
                key={item.title}
                item={item}
                selected={item.title === selectedTab}
                setSelectedTab={setSelectedTab}
              />
            </>
          ))}
        </Flex>
        {/* tabinput */}
        <Flex p={4}>
          {selectedTab === "文章" && (
            <TextInput
              textInput={textInputs}
              onChange={onTextChange}
              loading={loading}
              handleCreatePost={handleCreatePost}
            />
          )}
          {selectedTab === "圖片" && (
            <ImageUpload
              setSelectedFile={setSelectedFile}
              onSelectImadge={onSelectImadge}
              setSelectedTab={setSelectedTab}
              selectedFile={selectedFile}
            />
          )}
        </Flex>

        {error && (
          <Alert status="error" bg="red.500">
            <AlertIcon />
            <AlertDescription>Post Error</AlertDescription>
          </Alert>
        )}
      </Flex>
    </div>
  );
};

export default NewPostForm;
