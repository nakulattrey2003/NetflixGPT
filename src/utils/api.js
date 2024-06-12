import axios from "axios";
import { toast } from "react-toastify";


const API_URL =
  "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

const fetchApiResponse = async (message) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  if (!apiKey) {
    toast.error("API key is missing");
    return;
  }

  try {
    const response = await axios.post(
      API_URL,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Error fetching response from Hugging Face API:", error);
    throw error;
  }
};

export default fetchApiResponse;
