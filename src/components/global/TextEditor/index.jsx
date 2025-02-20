"use client";
import Tiptap from "./Tiptap";

const TextEditor = ({
  value,
  onChange
}) => {
  // The commented code is converted as well for reference
  // const [content, setContent] = useState("");
  // console.log(content);

  // const handleContentChange = (newContent) => {
  //   // console.log(newContent);
  //   setContent(newContent);
  // };

  return (
    <div>
      <Tiptap content={value} onChange={onChange} />
    </div>
  );
};

export default TextEditor; 