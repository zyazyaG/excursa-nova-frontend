import ReactMarkdown from "react-markdown";
import styles from "./MarkdownOutput.module.css"; // optional CSS module

type Props = {
   markdown: string;
}
export default function MarkdownOutput({markdown}: Props) {
   return (
      <div className={styles.markdownContainer}>
         <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
   )
}
