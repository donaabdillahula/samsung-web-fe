  export const GetImage = (rawURL) => {
    if (!rawURL.includes("/d/")) return rawURL; // jika bukan link Google Drive, return apa adanya
    const RAW_URL1 = rawURL.split("/d/");
    const RAW_URL2 = RAW_URL1[1].split("/view");
    const IMAGE_ID = RAW_URL2[0];
    // https://drive.google.com/uc?id=1rjWu8-ItW2lPpCATt2MzwMpH_pKuYtM- ini bisa deh
    // https://lh3.googleusercontent.com/d/[FILE ID]=s[xxx]?authuser=0
    // https://drive.usercontent.google.com/download?id=1rjWu8-ItW2lPpCATt2MzwMpH_pKuYtM-&amp;export=view&amp;authuser=0&amp;sz=w200-h200
    return `https://drive.google.com/file/d/${IMAGE_ID}/preview`;
  };