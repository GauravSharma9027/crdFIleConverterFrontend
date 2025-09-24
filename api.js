import axios from "axios";


const API_URL = "http://localhost:5000/api/convert";

// Step 1: Create job
export const createJob = () => axios.post(`${API_URL}/create-job`);

// Step 2: Upload file
export const uploadFile = (file, uploadUrl, parameters) => {
    const formData = new FormData();
    Object.entries(parameters).forEach(([key, value]) => formData.append(key, value));
    formData.append("file", file);

    return axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Step 3: Check task status
export const checkTask = (taskId) => axios.get(`${API_URL}/check-task/${taskId}`);
