import axios, { AxiosResponse } from "axios";

/**
 * This helper function converts the file into base64 and sends it to the /api/upload route
 * The function itself returns void, in order to access the axios response, use callback param
 * @param file the file to be uploaded
 * @param callback (response) => void // the response.data object comes back either as {status: number, message: error message} or {status: number, filename: filename of the uploaded file}
 */

export default function postUpload(
  file: File,
  callback: (response: AxiosResponse) => void,
): void {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    const base64Image = reader.result!.toString().split(",")[1];
    const response = await axios.post("/api/upload", { base64Image });
    callback(response);
  };
}
