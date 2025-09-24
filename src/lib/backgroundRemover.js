import { toast } from "@/components/ui/use-toast";

const REMOVE_BG_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjE0NjAzZTY3YmI4Y2Y4NDM2M2M4Y2IxY2VkZjUyMDMzNTE1MjRjYTYxZWIxYzcwMDdhMWI4MTAxZjdiYjQzMWY5Y2I2N2M2NTE2MGY5NzgiLCJpYXQiOjE3NDgxOTg2NDUuMDk3MzE0LCJuYmYiOjE3NDgxOTg2NDUuMDk3MzE5LCJleHAiOjQ4OTk3NTYyNDUuMDg3NTQ5LCJzdWIiOiI3MTE5ODg2NyIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.Y7Fq4dM-6X-kU9F4vU5HkXzGv63X0u6n3d10q_yK-vJj1Z1d4x9K5a1e2k1u6d2A7b2h3s5f9e2k5r5R8V6v3F9o9i3H6b7f3i7j8K5v2d8o4H8y3E7u3B9c3h8v9j5K1N3j3k2d6s5V9r3d8n8Z8B7i3u6v8B";
const CLOUDCONVERT_API_URL = "https://api.cloudconvert.com/v2";

export const removeBackground = async (file) => {
  const jobPayload = {
    tasks: {
      "import-file": {
        operation: "import/upload",
      },
      "remove-background-task": {
        operation: "modify/remove_background",
        input: "import-file",
        output_format: "png",
        engine: "remove.bg",
      },
      "export-file": {
        operation: "export/url",
        input: "remove-background-task",
        inline: false,
        archive_multiple_files: false,
      },
    },
  };

  try {
    const jobResponse = await fetch(`${CLOUDCONVERT_API_URL}/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REMOVE_BG_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobPayload),
    });

    if (!jobResponse.ok) {
      const errorData = await jobResponse.json();
      console.error("CloudConvert job creation failed:", errorData);
      throw new Error(`Job creation failed: ${errorData.message || jobResponse.statusText}`);
    }

    const jobData = await jobResponse.json();
    const uploadTask = jobData.data.tasks.find(task => task.name === "import-file");

    if (!uploadTask || !uploadTask.result || !uploadTask.result.form) {
      console.error("CloudConvert upload task details missing:", jobData);
      throw new Error("Could not get upload URL details from CloudConvert.");
    }

    const formData = new FormData();
    for (const key in uploadTask.result.form.parameters) {
      formData.append(key, uploadTask.result.form.parameters[key]);
    }
    formData.append("file", file);

    const uploadResponse = await fetch(uploadTask.result.form.url, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("CloudConvert file upload failed:", errorText);
      throw new Error(`File upload failed: ${uploadResponse.statusText}`);
    }

    let currentJobData = jobData.data;
    let retries = 0;
    const maxRetries = 25;
    const retryDelay = 2000;

    while (currentJobData.status !== "finished" && currentJobData.status !== "error" && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      const statusResponse = await fetch(`${CLOUDCONVERT_API_URL}/jobs/${currentJobData.id}`, {
        headers: {
          Authorization: `Bearer ${REMOVE_BG_API_KEY}`,
        },
      });
      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        throw new Error(`Failed to get job status: ${errorData.message || statusResponse.statusText}`);
      }
      currentJobData = (await statusResponse.json()).data;
      retries++;
    }

    if (currentJobData.status === "error") {
      const errorTask = currentJobData.tasks.find(task => task.status === "error");
      const errorMessage = errorTask ? `${errorTask.message}` : 'Unknown CloudConvert error';
      console.error("CloudConvert task error:", errorTask);
      throw new Error(`Background removal failed: ${errorMessage}`);
    }

    if (currentJobData.status !== "finished") {
      throw new Error("Background removal process timed out.");
    }

    const exportTask = currentJobData.tasks.find(task => task.name === "export-file" && task.status === "finished");
    if (!exportTask || !exportTask.result || !exportTask.result.files || exportTask.result.files.length === 0) {
      throw new Error("No processed file URL found.");
    }

    return exportTask.result.files[0].url;

  } catch (error) {
    console.error("Background removal process error:", error);
    toast({
      title: "Processing Error",
      description: error.message || "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};