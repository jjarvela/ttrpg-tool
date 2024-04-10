import axios from "axios";

export default function postUpload(file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    const base64Image = reader.result!.toString().split(",")[1];
    await axios.post("/api/upload", { base64Image });
  };
}
