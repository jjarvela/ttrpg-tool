import axios, { AxiosResponse } from "axios";

export default function postUpload(
  file: File,
  callback: (response: AxiosResponse) => void,
) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    const base64Image = reader.result!.toString().split(",")[1];
    const response = await axios.post("/api/upload", { base64Image });
    callback(response);
  };
}
