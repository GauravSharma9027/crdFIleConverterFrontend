const CLOUDCONVERT_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmViM2Y4NTE3NTZmZmQzOWVlNWZkNzA1ZDczYjViMjI1NTgzNTFjZTk4MjI1YzMzZTUxOGVjN2RkZGQ1NjhhYjk2OGFkMmFkMzE4Yjg2MTMiLCJpYXQiOjE3NDc4NDQ1MzIuMTQsIm5iZiI6MTc0Nzg0NDUzMi4xNDAwMDEsImV4cCI6NDkwMzUxODEzMi4xMzYwMjIsInN1YiI6IjcxMjkzMTE4Iiwic2NvcGVzIjpbXX0.QKkJsnR0zSYPIk16MADPol23HEnCDAatYHYBlnR1JFzcyBCtIpWgQGJeRWtNKp1lwIfuwUNZ778NazW46rC9-VXo89SgAcyCg_Q84BbVomwbHPnDmeJT72JFa94tJK9CSZkmdfuQocSGGBTDvJO4rz4-Sz4JKBv6ITEi5ITxyLUhtUX22E5Bb63pu8qO6MfoJko2GNvBdg-x-hs2g3AkMZjHLMJGHCbNurXkYnWsJxR12SPwTxfpiF_UZOLXpkRk0GUdMxRidqhtHVX_PTRoPn_giY3VINbqqL9y4p6AdfqDcBA20ut2uDPkIApYyB7Ug1ZXnRr93zqD_rWtbcXuXm-HTchbAKmeq4x9lKwLaERogAzjyxhct3GVj5NmWKh8FvHHQ8KX9pODZ7oIVFsaHSV5Z7gB4j45roiDrpZfktkj_-wU_MydVQeefttz2FX6f5ITGyeEm1GC_kK6HECyOs9lQ-RmzoJc1V8nJralhv3KBaMfRcO7q_SZhjyl_QGEHihDjsEKDWv6i6NmwRMqpTFcr_G-e9U3mZEvnm-qgxIy5mk1hqlblqEh09K4UbF9GEdm1wTdb1EAq9W4Evj-voTafinlPgPcU3GCoYoHc1Q6zqV6vEkfZGHHf7-BO5PD51jc-V4QXDO2JsFUHbZPD-pKJE5uMMGwzx8VC4NuQV-8";
const CLOUDCONVERT_API_URL = "https://api.cloudconvert.com/v2";

const corelDrawVersionMapping = {
  '13': 'X3', '14': 'X4', '15': 'X5', '16': 'X6',
  '17': 'X7', '18': 'X8', '19': '2017', '20': '2018',
  '21': '2019', '22': '2020', '23': '2021', '24': '2022',
  '25': '2023', '26': '2024', '27': '2025'
};

const getEngineVersion = (versionKey) => {
  return corelDrawVersionMapping[versionKey] || versionKey;
};

export const convertFile = async (file, outputFormat, targetVersionKey) => {
  const jobPayload = {
    tasks: {
      "import-file": {
        operation: "import/upload",
      },
      "convert-file": {
        operation: "convert",
        input: "import-file",
        output_format: outputFormat,
      },
      "export-file": {
        operation: "export/url",
        input: "convert-file",
        inline: false,
        archive_multiple_files: false,
      },
    },
  };

  if (outputFormat === "cdr") {
    jobPayload.tasks["convert-file"].engine = "coreldraw";
    const engineVersion = getEngineVersion(targetVersionKey);
    if (engineVersion) {
      jobPayload.tasks["convert-file"].engine_version = engineVersion;
    }
  } else {
  }


  try {
    const jobResponse = await fetch(`${CLOUDCONVERT_API_URL}/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobPayload),
    });

    if (!jobResponse.ok) {
      const errorData = await jobResponse.json();
      console.error("CloudConvert job creation failed:", JSON.stringify(errorData, null, 2));
      throw new Error(`Job creation failed: ${errorData.message || jobResponse.statusText} (Code: ${errorData.code})`);
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
      console.error("CloudConvert file upload failed. Status:", uploadResponse.status, "Response:", errorText);
      throw new Error(`File upload failed: ${uploadResponse.statusText} - ${errorText}`);
    }

    let currentJobData = jobData.data;
    let retries = 0;
    const maxRetries = 25; 
    const retryDelay = 6000; 

    while (currentJobData.status !== "finished" && currentJobData.status !== "error" && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, retryDelay)); 
      const statusResponse = await fetch(`${CLOUDCONVERT_API_URL}/jobs/${currentJobData.id}`, {
        headers: {
          Authorization: `Bearer ${CLOUDCONVERT_API_KEY}`,
        },
      });
      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        console.error("CloudConvert job status fetch failed:", JSON.stringify(errorData, null, 2));
        throw new Error(`Failed to get job status: ${errorData.message || statusResponse.statusText}`);
      }
      currentJobData = (await statusResponse.json()).data;
      retries++;
    }

    if (currentJobData.status === "error") {
      const errorTask = currentJobData.tasks.find(task => task.status === "error");
      const errorMessage = errorTask ? `${errorTask.message} (Code: ${errorTask.code}, Details: ${errorTask.result?.errors?.map(e => e.message).join(', ') || 'N/A'})` : 'Unknown CloudConvert error';
      console.error("CloudConvert task error details:", errorTask);
      throw new Error(`Conversion failed: ${errorMessage}`);
    }
    
    if (currentJobData.status !== "finished") {
        console.error("CloudConvert job timed out or did not finish:", currentJobData);
        throw new Error(`Conversion did not complete. Status: ${currentJobData.status}. Waited ${retries * retryDelay / 1000} seconds.`);
    }

    const exportTask = currentJobData.tasks.find(task => task.name === "export-file" && task.status === "finished");
    if (!exportTask || !exportTask.result || !exportTask.result.files || exportTask.result.files.length === 0) {
      console.error("CloudConvert export task issues or no files:", exportTask, "Full job data:", currentJobData);
      throw new Error("No converted file URL found, or export task failed.");
    }

    const downloadUrl = exportTask.result.files[0].url;
    const fileResponse = await fetch(downloadUrl);
    if (!fileResponse.ok) {
      const errorText = await fileResponse.text();
      console.error("Failed to download converted file. Status:", fileResponse.status, "Response:", errorText);
      throw new Error(`Failed to download converted file: ${fileResponse.statusText} - ${errorText}`);
    }
    
    const blob = await fileResponse.blob();
    return blob;

  } catch (error) {
    console.error("CloudConvert full process error:", error.message, error.stack);
    throw error; 
  }
};