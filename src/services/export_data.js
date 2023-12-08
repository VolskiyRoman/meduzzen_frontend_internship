import axiosInstance from "@/api/api";

export const exportData = async (companyId, endpoint, fileNamePrefix, requestData = null) => {
    try {
        let response;

        const urlParams = companyId ? `/api/companies/${companyId}/${endpoint}/` : `/api/${endpoint}/`;

        if (requestData) {
            response = await axiosInstance.post(urlParams, requestData, {
                responseType: 'blob',
            });
        } else {
            response = await axiosInstance.get(urlParams, {
                responseType: 'blob',
            });
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const fileName = requestData ? `${fileNamePrefix}_${requestData.user_id}_export.csv` : `${fileNamePrefix}_export.csv`;

        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        if (requestData) {
        } else {
            console.error(`Error exporting data:`, error);
        }
    }
};
