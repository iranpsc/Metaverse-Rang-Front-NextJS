'use server'
export async function getTransletion(lang) {
    const res = await fetch("https://admin.rgb.irpsc.com/api/translations", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    return data.data.find((item) => item.code === lang);
  }


 export async function getMainFile(langData) {
    const res = await fetch(langData.file_url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }