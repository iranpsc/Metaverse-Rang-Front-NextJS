export function findByUniqueId(data, uniqueId) {
  // تبدیل به عدد برای مقایسه مطمئن
  const targetId = Number(uniqueId);

  if (isNaN(targetId)) {
    console.warn(`findByUniqueId: uniqueId نامعتبر است → ${uniqueId}`);
    return "Invalid ID";
  }

  // چک وجود data
  if (!data) {
    console.warn("findByUniqueId: data کاملاً undefined یا null است");
    return "Data missing";
  }

  if (!data.modals || !Array.isArray(data.modals)) {
    console.warn("findByUniqueId: data.modals وجود ندارد یا آرایه نیست", data?.modals);
    return "No modals";
  }

  for (const modal of data.modals) {
    if (!modal?.tabs || !Array.isArray(modal.tabs)) {
      console.warn("findByUniqueId: modal.tabs وجود ندارد یا آرایه نیست", modal?.name);
      continue;
    }

    for (const tab of modal.tabs) {
      if (!tab?.fields || !Array.isArray(tab.fields)) {
        console.warn("findByUniqueId: tab.fields وجود ندارد یا آرایه نیست", tab?.name);
        continue;
      }

      const foundField = tab.fields.find(field => {
        const fieldId = Number(field?.unique_id);
        return !isNaN(fieldId) && fieldId === targetId;
      });

      if (foundField) {
        if (foundField.translation) {
          return foundField.translation;
        } else {
          console.warn(`findByUniqueId: ترجمه برای ${uniqueId} پیدا شد اما translation خالی است`);
          return "[Translation empty]";
        }
      }
    }
  }

  console.warn(`findByUniqueId: ترجمه با unique_id ${uniqueId} در هیچ modal/tab/field پیدا نشد`);
  return undefined; // یا می‌تونی fallback string بذاری مثل "ترجمه موجود نیست"
}